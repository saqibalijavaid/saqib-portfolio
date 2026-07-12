import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Code2,
} from 'lucide-react';
import { contactSchema, type ContactInput } from '../lib/contactSchema';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-50 dark:placeholder-gray-400';
const inputErrorClass =
  'mt-1 block w-full rounded-md border-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 p-3 bg-gray-50 dark:placeholder-gray-400';
const errorTextClass = 'mt-1 text-sm text-red-600 dark:text-red-400';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { user_name: '', user_email: '', message: '', honeypot: '' },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus('sending');
    setServerError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setServerError(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setServerError('Network error. Check your connection and try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Contact
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Let's talk.
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Whether it's a full-stack build or an automation you've been meaning to ship — send a
            message and I'll reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get in touch
            </h3>

            <div className="space-y-6">
              <a
                href="mailto:saqibalijavaid2@gmail.com"
                className="flex items-start hover:opacity-80 transition-opacity"
              >
                <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-400">saqibalijavaid2@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+923066778721"
                className="flex items-start hover:opacity-80 transition-opacity"
              >
                <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                  <p className="text-gray-600 dark:text-gray-400">+92 306 6778721</p>
                </div>
              </a>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">Based in</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Madina Colony, Walton Cantt, <br />
                    Lahore, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Elsewhere
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/saqibalijavaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saqib-ali-javaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://leetcode.com/u/saqibalijavaid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LeetCode"
                >
                  <Code2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="user_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  autoComplete="name"
                  aria-invalid={!!errors.user_name}
                  aria-describedby={errors.user_name ? 'user_name-error' : undefined}
                  className={errors.user_name ? inputErrorClass : inputClass}
                  placeholder="Your name"
                  {...register('user_name')}
                />
                {errors.user_name && (
                  <p id="user_name-error" className={errorTextClass}>
                    {errors.user_name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="user_email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  autoComplete="email"
                  aria-invalid={!!errors.user_email}
                  aria-describedby={errors.user_email ? 'user_email-error' : undefined}
                  className={errors.user_email ? inputErrorClass : inputClass}
                  placeholder="you@example.com"
                  {...register('user_email')}
                />
                {errors.user_email && (
                  <p id="user_email-error" className={errorTextClass}>
                    {errors.user_email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={errors.message ? inputErrorClass : inputClass}
                  placeholder="Tell me about what you're building..."
                  {...register('message')}
                />
                {errors.message && (
                  <p id="message-error" className={errorTextClass}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot — bots fill this, humans don't see it */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
                {...register('honeypot')}
              />

              {status === 'success' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-md border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 p-4 text-green-800 dark:text-green-200"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">
                    Thanks — your message is on its way. I'll reply within 24 hours.
                  </p>
                </div>
              )}

              {status === 'error' && serverError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 p-4 text-red-800 dark:text-red-200"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{serverError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`
                  w-full flex items-center justify-center px-8 py-3 border border-transparent
                  text-base font-bold rounded-md text-white transition-all duration-200
                  ${
                    status === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : status === 'error'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                  }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                {status === 'idle' && (
                  <>
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    Sending...{' '}
                    <div className="ml-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </>
                )}
                {status === 'success' && (
                  <>
                    Sent! Talk soon. <CheckCircle className="ml-2 h-5 w-5" />
                  </>
                )}
                {status === 'error' && (
                  <>
                    Failed. Try again. <AlertCircle className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
