import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { contactSchema } from '../src/lib/contactSchema.js';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim()) ||
    req.socket.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Try again shortly.' });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid submission',
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const { user_name, user_email, message, honeypot } = parsed.data;
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error('Contact form: missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL');
    return res.status(500).json({ ok: false, error: 'Server email is not configured' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: user_email,
      subject: `New contact from ${user_name}`,
      text: `From: ${user_name} <${user_email}>\n\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ ok: false, error: 'Failed to send message' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ ok: false, error: 'Unexpected server error' });
  }
}
