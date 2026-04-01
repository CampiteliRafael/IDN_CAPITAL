import { z } from 'zod';
import { Role } from '../../domain/entities/User';

export const CreateUserSchema = z.object({
    email: z.string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ message: 'Invalid email format' })),
    password: z.string().min(6, 'Password must be at least 6 characters long')
      .max(100, 'Password must be at most 100 characters long'),
    name: z.string().min(2, 'Name must be at least 2 characters long')
      .max(100, 'Name must be at most 100 characters long').transform((val) => val.trim()),
    role: z.enum(Role, {
        message: 'Role must be USER or ADMIN',
    }).optional()
      .default(Role.USER),
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>;