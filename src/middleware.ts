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

    if (isApiAuthRoute) {
        return undefined; // nullからundefinedに変更
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined; // nullからundefinedに変更
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/sign-up', nextUrl));
    }

    return undefined; // nullからundefinedに変更
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};