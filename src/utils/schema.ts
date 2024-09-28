import { z } from 'zod';
import { Platform } from './models';

import dayjs from 'dayjs';

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2, 'Password is required')
});

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email(),
    password: z.string()
                .min(8, { message: "Password must be at least 8 characters long." })
                .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
                .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
                .regex(/[0-9]/, { message: "Password must include at least one digit." })
                .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must include at least one special character." }),
    confirm: z.string().min(1, 'Confirm password field is required')
}).refine((data) => data.password === data.confirm, { message: 'Passwords must match', path: ['confirm']});

export const postSchema = z.object({
    platform: z.enum([Platform.facebook, Platform.instagram, Platform.twitter]),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    scheduleTime: z.coerce.date().refine((datetime) => dayjs(datetime).isSame(dayjs()) || dayjs(datetime).isAfter(dayjs())),
    media: z.string().url(),
    useAI: z.boolean().default(false),
});

export type AuthData = z.infer<typeof authSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type PostData = z.infer<typeof postSchema>;