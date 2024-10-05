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

export const documentSchema = z.object({
    url: z.string().url(),
    type: z.literal('pdf'),
    documentNumber: z.string().min(3, 'Document number must be at least 3 characters'),
    name: z.string().min(3, 'File name must be at least 3 characters'),
    tags: z.array(z.string().min(1)).min(1)
});

export const documentQuestionSchema = z.object({
    question: z.string().min(5, 'Question must be at least 5 characters'),
});

export type AuthData = z.infer<typeof authSchema>;
export type DocumentData = z.infer<typeof documentSchema>;
export type DocumentQuestionData = z.infer<typeof documentQuestionSchema>;
export type PostData = z.infer<typeof postSchema>;
export type RegisterData = z.infer<typeof registerSchema>;