import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ message: 'Invalid email format' })),
  password: z
    .string({ message: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
});

export type LoginDto = z.infer<typeof LoginSchema>;
