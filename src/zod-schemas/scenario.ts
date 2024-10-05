import * as z from 'zod';

export const scenarioSummarySchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "タイトルは必須です。" }),
    overview: z.string().min(1, { message: "概要は必須です。" }),
    introduction: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    isGMless: z.boolean().default(false),
    expectedPlayers: z.number().min(1, { message: "プレイヤー数は1人以上でなければなりません。" }),
    expectedPlayTime: z.string().min(1, { message: "予想プレイ時間は必須です。" }),
    imageNames: z.array(z.string()).optional().default([]),
    authors: z.array(z.object({
        role: z.string().min(1, { message: "役割は必須です。" }),
        name: z.string().optional(),
        userId: z.string().optional(),
        description: z.string().optional(),
    }).refine(data => data.name || data.userId, {
        message: "nameとuserIdどちらか必須です。",
    })),
    scenarioDetailId: z.string().optional(),
});

export const scenarioDetailSchema = z.object({
    description: z.string().optional(),
    contents: z.string().min(1, { message: "内容物は必須です。" }), 
    url: z.string().url().optional().refine(value => value === undefined || value !== '', { message: "有効なURLを入力してください。" }),
    precaution: z.string().optional(),
    prohibition: z.string().optional(),
    termsOfUse: z.string().min(1, { message: "利用規約は必須です。" }),
    commercialUse: z.string().min(1, { message: "商業利用の可否は必須です。" }),
    updateHistory: z.array(z.object({
        date: z.date({ message: "有効な日付を入力してください。" }),
        content: z.string().min(1, { message: "更新内容は必須です。" }),
    })).optional().default([]),
    videoUrls: z.array(z.string().url({ message: "有効なURLを入力してください。" })).optional().default([]),
});

export const scenarioSchema = z.object({
    summary: scenarioSummarySchema,
    detail: scenarioDetailSchema,
});

export type ScenarioSummarySchema = z.infer<typeof scenarioSummarySchema>;
export type ScenarioDetailSchema = z.infer<typeof scenarioDetailSchema>;
export type ScenarioSchema = z.infer<typeof scenarioSchema>;


export const uploadScenarioSchema = scenarioSchema.extend({
    uploadImages: z.array(z.string(), { message: "有効なファイル名をアップロードしてください。" }).optional().default([]),
});

export type UploadScenarioSchema = z.infer<typeof uploadScenarioSchema>;

