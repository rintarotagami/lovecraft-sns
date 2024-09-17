import PasswordResetEmail from '@/components/emails/password-reset-email';
import VerificationEmail from '@/components/emails/verification-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'メールアドレスの確認',
            react: VerificationEmail({ email, confirmLink }),
            headers: {
                'X-Entity-Ref-ID': new Date().getTime() + '',
            },
        });
        console.log("Email sent successfully:", result);
        console.log("Generated confirmation link:", confirmLink);
        console.log("Sent email content:", result);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'パスワードのリセット',
        react: PasswordResetEmail({ email, resetLink }),
        headers: {
            'X-Entity-Ref-ID': new Date().getTime() + '',
        },
    });
};

//「X-Entity-Ref-ID」ヘッダーは、Gmail でのスレッディングを防ぐために使用します。
//詳細な説明は以下の Resend のAPI ドキュメントをご確認ください。