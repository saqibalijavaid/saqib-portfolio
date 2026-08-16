import { z } from 'zod';

export const contactSchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be 80 characters or fewer'),
  user_email: z
    .string()
    .trim()
    .email('Enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be 2000 characters or fewer'),
  /*
   * Accepts any string on purpose. Constraining this to .max(0) made zod reject
   * a filled honeypot during parsing, so api/contact.ts returned a 400 naming
   * the field and its own `if (honeypot)` check was unreachable. That told a bot
   * exactly which field caught it, and would have shown a real visitor an error
   * for a hidden field if autofill ever populated it. The handler inspects this
   * value itself and answers with a silent success instead.
   */
  honeypot: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
