import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req, ctx) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    //1.isApiAuthRouteの場合、何もせずに次の処理へ。
    if (isApiAuthRoute) {
        return undefined; 
    }
    //2.isAuthRouteの場合、ログイン済みならリダイレクト、未ログインなら何もせず次の処理へ。
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined; 
    }
    //3.. ログインしていないかつ公開ルートでない場合、/sign-inにリダイレクト。
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/sign-in', nextUrl));
    }

    return undefined; 
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};