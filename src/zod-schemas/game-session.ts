import * as z from 'zod';

const gameSessionSummarySchema = z.object({
    title: z.string(),
    dueDate: z.date(),
    communicationType: z.enum(['CHAT', 'VC', 'IN_PERSON']),
    qualification: z.enum(['ANYONE', 'MUTUAL_FOLLOW', 'COMMUNITY_MEMBER']).default('ANYONE'),
    scenarioId: z.string(),
    gms: z.array(z.object({
        id: z.string(),
        gameSessionSummaryId: z.string().optional(),
        userId: z.string().optional(),
    })).min(1, { message: "少なくとも1人のGMが必要です" }),
    applicants: z.array(z.object({
        id: z.string(),
        gameSessionSummaryId: z.string().optional(),
        userId: z.string().optional(),
    })).optional().default([]),
    createdAt: z.date(),
    updatedAt: z.date(),
    detailId: z.string().optional(),
});

const gameSessionDetailSchema = z.object({
    gameSessionId: z.string(),
    description: z.string(),
    isMobileCompatible: z.boolean().default(false),
    isSpectator: z.enum(['ANYONE', 'MUTUAL_FOLLOW', 'COMMUNITY_MEMBER']).default('ANYONE'),
    ageLimit: z.number().optional().default(0),
    players: z.array(z.object({
        id: z.string(),
        gameSessionDetailId: z.string().optional(),
        userId: z.string().optional(),
    })).optional().default([]),
    spectators: z.array(z.object({
        id: z.string(),
        gameSessionDetailId: z.string().optional(),
        userId: z.string().optional(),
    })).optional().default([]),
});

export const gameSessionSchema = z.object({
    summary: gameSessionSummarySchema,
    detail: gameSessionDetailSchema,
});

export type GameSessionSummarySchema = z.infer<typeof gameSessionSummarySchema>;
export type GameSessionDetailSchema = z.infer<typeof gameSessionDetailSchema>;
export type GameSessionSchema = z.infer<typeof gameSessionSchema>;
