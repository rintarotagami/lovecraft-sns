import { db } from '@/lib/db';

let cache: any[] = [];
let lastFetchedId: string | null = null;

export const getScenarioSummary = async () => {
    try {
        if (cache.length === 0) {
            const scenarios = await db.scenarioSummary.findMany({
                where: lastFetchedId ? { id: { lt: lastFetchedId } } : {},
                orderBy: {
                    id: 'desc',
                },
                take: 50,
            });

            if (scenarios.length > 0) {
                lastFetchedId = scenarios[scenarios.length - 1].id;
                cache = scenarios;
            }
        }

        const result = cache.slice(0, 50);
        cache = cache.slice(50);

        return result;
    } catch {
        return [];
    }
};
