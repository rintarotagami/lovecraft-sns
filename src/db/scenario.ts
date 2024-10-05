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

export const getScenarioById = async (DetailId: string) => {
    try {
        const scenario = await db.scenarioSummary.findUnique({
            where: { id: DetailId },
            include: { scenarioDetail: true },
        });

        if (scenario) {
            return scenario;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export const getScenariosByPartialMatch = async (partialName: string) => {
    try {
        const results = await db.scenarioSummary.findMany({
            where: {
                title: {
                    contains: partialName,
                },
            },
        });

        return results;
    } catch (error) {
        console.error('部分一致するシナリオの取得時にエラーが発生しました:', error);
        return [];
    }
};
