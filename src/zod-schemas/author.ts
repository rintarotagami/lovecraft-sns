import * as z from 'zod';

export const AuthorSchema = z.object({
    id: z.string(),
    role: z.string(),
    name: z.string().optional(),
    userId: z.string().optional(),
    description: z.string().optional(),
    scenario: z.array(z.object({
        id: z.string(),
        authorId: z.string(),
        scenarioId: z.string(),
    })),
}).refine(data => data.name || data.userId, {
    message: "名前かユーザーIDのどちらかは必須です",
    path: ['name', 'userId'],
});

export const AuthorScenarioSchema = z.object({
    id: z.string(),
    authorId: z.string(),
    scenarioId: z.string(),
});
