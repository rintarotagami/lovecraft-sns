import NextAuth from 'next-auth';
import { FirestoreAdapter, initFirestore } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import authConfig from '@/auth.config';

const db = initFirestore({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
});

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: FirestoreAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});