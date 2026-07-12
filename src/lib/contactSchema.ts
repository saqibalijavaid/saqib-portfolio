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
  honeypot: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
