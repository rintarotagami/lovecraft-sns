'use server'

import { ScenarioSchema } from "@/zod-schemas/scenario"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { uploadImg } from '@/lib/gcsImage';

export interface FormState {
    error: string
    messages: Record<string, string>;
}

export const createScenario = async (state: FormState, formData: FormData): Promise<FormState> => {
    // console.log('createScenarioが呼び出されました');
    // console.log('フォームデータ:', formData);

    const files = formData.getAll('uploadImages') as File[];
    console.log(files)
    files.forEach((file, index) => {
        console.log(`ファイル ${index + 1}:`);
        console.log(`名前: ${file.name}`);
        console.log(`サイズ: ${file.size} バイト`);
        console.log(`タイプ: ${file.type}`);
    });

    const tagsInput = formData.get('tags') as string;
    const tags = tagsInput ? tagsInput.split(',') : [];

    const authors = formData.getAll('summary.authors').map((author, index) => ({
        role: formData.get(`summary.authors.${index}.role`) as string,
        name: formData.get(`summary.authors.${index}.name`) as string,
        userId: formData.get(`summary.authors.${index}.userId`) as string,
        description: formData.get(`summary.authors.${index}.description`) as string,
    }));

    const updateHistory = JSON.parse(formData.get('updateHistory') as string);
    const videoUrls = JSON.parse(formData.get('videoUrls') as string);

    const newScenario: ScenarioSchema = {
        summary: {
            title: formData.get('summary.title') as string,
            overview: formData.get('summary.overview') as string,
            introduction: formData.get('summary.introduction') as string,
            tags: tags,
            isGMless: Boolean(formData.get('summary.isGMless')),
            expectedPlayers: Number(formData.get('summary.expectedPlayers')),
            expectedPlayTime: formData.get('summary.expectedPlayTime') as string,
            imageNames: [],
            authors: authors,
            gameSessions: [],
            scenarioDetailId: formData.get('summary.scenarioDetailId') as string,
        },
        detail: {
            description: formData.get('detail.description') as string,
            contents: formData.get('detail.contents') as string,
            url: formData.get('detail.url') as string,
            precaution: formData.get('detail.precaution') as string,
            prohibition: formData.get('detail.prohibition') as string,
            termsOfUse: formData.get('detail.termsOfUse') as string,
            commercialUse: formData.get('detail.commercialUse') as string,
            updateHistory: updateHistory,
            videoUrls: videoUrls,
        },
    }

    try {
        // トランザクションを開始
        await db.$transaction(async (prisma) => {
            // 画像のアップロード
            try {
                const uploadedImageNames = await Promise.all(files.map(file => uploadImg(file)));
                newScenario.summary.imageNames = uploadedImageNames;
            } catch (error) {
                state.error = '画像のアップロードに失敗しました';
                console.error(state.error, error);
                throw error;
            }

            // シナリオ概要の作成
            let scenario;
            try {
                scenario = await prisma.scenarioSummary.create({
                    data: {
                        title: newScenario.summary.title,
                        overview: newScenario.summary.overview,
                        introduction: newScenario.summary.introduction,
                        tags: newScenario.summary.tags,
                        isGMless: newScenario.summary.isGMless,
                        expectedPlayers: newScenario.summary.expectedPlayers,
                        expectedPlayTime: newScenario.summary.expectedPlayTime,
                        imageNames: newScenario.summary.imageNames,
                        gameSessions: { connect: [] },
                        scenarioDetail: {
                            create: {
                                description: newScenario.detail?.description ?? '',
                                contents: newScenario.detail.contents,
                                url: newScenario.detail.url,
                                precaution: newScenario.detail.precaution,
                                prohibition: newScenario.detail.prohibition,
                                termsOfUse: newScenario.detail.termsOfUse,
                                commercialUse: newScenario.detail.commercialUse,
                                updateHistory: {
                                    create: newScenario.detail.updateHistory.map(history => ({
                                        date: history.date,
                                        content: history.content,
                                    }))
                                },
                                videoUrls: newScenario.detail.videoUrls,
                            }
                        }
                    },
                });
            } catch (error) {
                state.error = 'シナリオ概要の作成に失敗しました';
                console.error(state.error, error);
                throw error;
            }

            // 著者情報を別テーブルに保存
            try {
                for (const author of newScenario.summary.authors) {
                    // Authorの作成
                    const createdAuthor = await prisma.author.create({
                        data: {
                            role: author.role,
                            name: author.name,
                            description: author.description,
                            user: author.userId ? { connect: { id: author.userId } } : undefined,
                        },
                    });

                    // AuthorとScenarioの中間テーブル作成
                    await prisma.authorScenario.create({
                        data: {
                            author: { connect: { id: createdAuthor.id }},
                            scenario: { connect: { id: scenario.id }} 
                        }
                    });
                }
            } catch (error) {
                state.error = '著者情報の保存に失敗しました';
                console.error(state.error, error);
                throw error;
            }

        });
    } catch (error) {
        console.error('トランザクション中にエラーが発生しました', error);
        return state;
    }

    redirect('/home/scenario')
}
