import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });

        return user;
    } catch (e) {
        return null;
    }
};

export const getUserBySearchedId = async (searchedId: string) => {
    try {
        const searchedName = await db.searchedName.findUnique({
            where: { searchedName: searchedId },
            include: { user: true },
        });

        return searchedName?.user || null;
    } catch (e) {
        return null;
    }
};

