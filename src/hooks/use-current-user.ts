import { useSession } from 'next-auth/react';
import { db } from '@/lib/db';

export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
};