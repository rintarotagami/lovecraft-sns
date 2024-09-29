import { db } from '@/lib/db';

let cache: any[] = [];
let lastFetchedId: string | null = null;

export const getGameSessionSummary = async () => {
    try {
        if (cache.length === 0) {
            const gameSessions = await db.gameSessionSummary.findMany({
                where: lastFetchedId ? { id: { lt: lastFetchedId } } : {},
                orderBy: {
                    id: 'desc',
                },
                take: 50,
            });

            if (gameSessions.length > 0) {
                lastFetchedId = gameSessions[gameSessions.length - 1].id;
                cache = gameSessions;
            }
        }

        const result = cache.slice(0, 50);
        cache = cache.slice(50);

        return result;
    } catch {
        return [];
    }
};
