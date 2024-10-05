import * as z from 'zod';

export const gameSessionSchema = z.object({
    playDate: z.string().min(1, { message: "プレイ日を入力してください。" }).refine(date => new Date(date) >= new Date(), {
        message: "入力された日付は無効です。今日以降の日付を入力して下さい",
    }),
    startTime: z.string().min(1, { message: "開始時間を入力してください。" }),
    qualification: z.enum(['ANYONE', 'MUTUAL_FOLLOW', 'COMMUNITY_MEMBER']).default('ANYONE'),
    scenarioId: z.string().optional(),
    gms: z.array(z.object({
        id: z.string(),
        gameSessionId: z.string().optional(),
        userId: z.string().optional(),
    })).optional().default([]),
    description: z.string().min(5, { message: "招待文は少なくとも5文字以上でなければなりません。" }).max(150, { message: "招待文は150文字以下でなければなりません。" }),
    isMobileCompatible: z.boolean().default(false),
    isSpectator: z.enum(['NONE', 'ANYONE', 'MUTUAL_FOLLOW', 'COMMUNITY_MEMBER']).default('NONE'),
    players: z.array(z.object({
        gameSessionId: z.string().optional(),
        userId: z.string().optional(),
    })).optional().default([]),
    spectators: z.array(z.object({
        gameSessionId: z.string().optional(),
        userId: z.string().optional(),
    })).optional().default([]),
});