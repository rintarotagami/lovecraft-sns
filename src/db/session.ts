import { db } from '@/lib/db';

let cache: any[] = [];
let lastFetchedId: string | null = null;

export const getGameSession = async () => {
    try {
        if (cache.length === 0) {
            const gameSessions = await db.gameSession.findMany({
                where: lastFetchedId ? { id: { lt: lastFetchedId } } : {},
                orderBy: {
                    id: 'desc',
                },
                take: 50,
                include: {
                    scenario: true, 
                    gms: true,
                    players:true,
                },
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

export const getgameSessionById = async (gameSessionId: string) => {
    try {
        const gameSession = await db.gameSession.findUnique({
            where: { id: gameSessionId },
            include: {
                scenario: true,
                gms: true,
                players: true,
            },
        });

        if (gameSession) {
            return gameSession;
        } else {
            return null;
        }
    } catch (error) {
        console.error('ゲームセッションの取得時にエラーが発生しました:', error);
        return null;
    }
};
