import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const signUpSchema = z.object({
    email: z.string().email({
        message: 'メールアドレスは必須です。',
    }),
    password: z.string()
        .min(10, {
            message: 'パスワードは10文字以上です。',
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/, {
            message: 'パスワードは英大文字、小文字、数字を含む10文字以上でなければなりません。',
        }),
    nickname: z.string().min(1, {
        message: 'ニックネームは必須です。',
    }),
});

export const signInSchema = z.object({
    email: z.string().email({
        message: 'メールアドレスは必須です。',
    }),
    password: z.string()
        .min(10, {
            message: 'パスワードは10文字以上です。',
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/, {
            message: 'パスワードは英大文字、小文字、数字を含む10文字以上でなければなりません。',
        }),
    code: z.optional(z.string()),
});

export const resetSchema = z.object({
    email: z.string().email({
        message: 'resetSchema',
    }),
});

export const newPasswordSchema = z.object({
    password: z.string()
        .min(10, {
            message: 'パスワードは10文字以上です。',
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/, {
            message: 'パスワードは英大文字、小文字、数字を含む10文字以上でなければなりません。',
        }),
});



export const editProfileSchema = z.object({
    name: z.string().min(1, {
        message: 'ニックネームは必須です。',
    }),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email({
        message: '有効なメールアドレスを入力してください。',
    })),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    searchedName:z.string()
    .min(5,{
        message:'ユーザーIDは5文字以上でなければなりません。',
    })
    .max(15,{
        message:'ユーザーIDは15文字以内でなければなりません。',
    })
    .regex(/^[a-zA-Z0-9_]+$/,{
        message:'ユーザーIDは英数字と_のみ使用できます。',
    })
});