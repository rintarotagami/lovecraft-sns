import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { UserRole } from '@prisma/client';
import { getUserById } from '@/db/user';
import { getTwoFactorConfirmationByUserId } from '@/db/two-factor-confirmation';
import { getAccountByUserId } from '@/db/account';
import { ulid } from 'ulid';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/sign-in',

    },
    events: {
        async linkAccount({ user }) {
            const hashedName = ulid();
            await db.user.update({
                where: { id: user.id },
                data: { 
                    emailVerified: new Date(),
                    image: "noImage",
                    searchedName: {
                        create: {
                            searchedName: hashedName,
                        },
                    },
                },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // OAuthの場合、メール認証なしでログインを許可する
            if (account?.provider !== 'credentials') return true;

            if (!user.id) return false;
            const existingUser = await getUserById(user.id);

            // メール認証なしでのサインインを防止する
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
                    existingUser.id
                );

                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }

            // メール認証なしでのサインインを防止する
            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({ token, session }) {
            // トークンとセッションの情報を同期させる
            if (token.sub && session.user) {
                // ーザーIDをトークンのsubフィールドから設定
                session.user.id = token.sub;
            }
            if (session.user) {
                // ユーザー名、メールアドレス、OAuth認証の有無を設定
                session.user.name = token.name ?? '';
                session.user.email = token.email ?? '';
                session.user.isOAuth = token.isOAuth as boolean;
            }
            if (token.role && session.user) {
                // ユーザーロールを設定
                session.user.role = token.role as UserRole;
            }
            if (session.user) {
                // 二段階認証の有効/無効状態を設定
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }
            // 更新されたセッション情報を返す
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});