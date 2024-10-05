'use server';

import { signUpSchema } from '@/zod-schemas';
import { ActionsResult } from '@/types/ActionsResult';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/db/user';
import { db } from '@/lib/db';
import { handleError } from '@/lib/utils';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { ulid } from 'ulid';

export const signUp = async (
    values: z.infer<typeof signUpSchema>
): Promise<ActionsResult> => {
    const validatedFields = signUpSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            isSuccess: false,
            error: {
                message: validatedFields.error.message,
            },
        };
    }

    const { email, password, nickname } = validatedFields.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return {
                isSuccess: false,
                error: {
                    message: 'このメールアドレスは既に登録されています。',
                },
            };
        }

        const randomName = ulid();
        // ユーザーを作成
        //newUserはawait db.user.createの結果を受け取る
        const newUser = await db.user.create({
            data: {
                name: nickname,
                email,
                image: "noImage.png",
                password: hashedPassword,
                searchedName: {
                    create: {
                        searchedName: randomName,
                    },
                }
            },
            include: {
                searchedName: true,
            },
            
        });

        const verificationToken = await generateVerificationToken(email);
        console.log("Verification token generated:", verificationToken);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        console.log("Verification email sent");

        return {
            isSuccess: true,
            message: '確認メールを送信しました。',
        };
    } catch (error) {
        console.error("Error in signUp:", error);
        handleError(error);

        return {
            isSuccess: false,
            error: {
                message: 'サインアップに失敗しました。',
            },
        };
    }
};