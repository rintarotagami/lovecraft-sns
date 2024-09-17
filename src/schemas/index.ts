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
});

export const resetSchema = z.object({
    email: z.string().email({
        message: 'メールアドレスは必須です。',
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