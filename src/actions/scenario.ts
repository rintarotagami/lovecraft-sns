'use server'

import { UploadScenarioSchema } from "@/zod-schemas/scenario"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { uploadImg } from '@/lib/UploadImage';
import { ActionsResult } from '@/types/ActionsResult';

export const createScenario = async (
    formData: FormData,
): Promise<ActionsResult> => {
    try {
        // formDataをUploadScenarioSchemaに変換
        const data: UploadScenarioSchema = {
            summary: {
                title: formData.get('title') as string,
                overview: formData.get('overview') as string,
                introduction: formData.get('introduction') as string,
                tags: (formData.getAll('tags') as string[]),
                isGMless: formData.get('isGMless') === 'true',
                expectedPlayers: parseInt(formData.get('expectedPlayers') as string, 10),
                expectedPlayTime: formData.get('expectedPlayTime') as string,
                imageNames: [], // 画像名は後で設定
                authors: JSON.parse(formData.get('authors') as string),
            },
            detail: {
                description: formData.get('description') as string,
                contents: formData.get('contents') as string,
                url: formData.get('url') as string,
                precaution: formData.get('precaution') as string,
                prohibition: formData.get('prohibition') as string,
                termsOfUse: formData.get('termsOfUse') as string,
                commercialUse: formData.get('commercialUse') as string,
                updateHistory: JSON.parse(formData.get('updateHistory') as string),
                videoUrls: JSON.parse(formData.get('videoUrls') as string),
            },
            uploadImages: formData.getAll('uploadImages') as File[],
        };

        // トランザクションを開始
        await db.$transaction(async (prisma) => {

            // 画像のアップロード
            try {
                const uploadedImageNames = await Promise.all(data.uploadImages.map(file => uploadImg(file)));
                data.summary.imageNames = uploadedImageNames;
            } catch (error) {
                return {
                    isSuccess: false,
                    error: {
                        message: '画像のアップロードに失敗しました'
                    }
                }
            }


            try {
                const scenario = await prisma.scenarioSummary.create({
                    data: {
                        title: data.summary.title,
                        overview: data.summary.overview,
                        introduction: data.summary.introduction,
                        tags: data.summary.tags,
                        isGMless: data.summary.isGMless,
                        expectedPlayers: data.summary.expectedPlayers,
                        expectedPlayTime: data.summary.expectedPlayTime,
                        imageNames: data.summary.imageNames,
                        gameSessions: { connect: [] },
                        scenarioDetail: {
                            create: {
                                description: data.detail?.description ?? '',
                                contents: data.detail.contents,
                                url: data.detail.url,
                                precaution: data.detail.precaution,
                                prohibition: data.detail.prohibition,
                                termsOfUse: data.detail.termsOfUse,
                                commercialUse: data.detail.commercialUse,
                                updateHistory: {
                                    create: data.detail.updateHistory?.map(history => ({
                                        date: history.date,
                                        content: history.content,
                                    }))
                                },
                                videoUrls: data.detail.videoUrls,
                            }
                        }
                    },
                });

                if (!scenario) {
                    return {
                        isSuccess: false,
                        error: {
                            message: 'シナリオ概要の作成に失敗しました'
                        }
                    }
                }

                // 著者情報を別テーブルに保存
                for (const author of data.summary.authors) {
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
                            author: { connect: { id: createdAuthor.id } },
                            scenario: { connect: { id: scenario.id } }
                        }
                    });
                }
            } catch (error) {
                return {
                    isSuccess: false,
                    error: {
                        message: '著者情報の保存に失敗しました'
                    }
                }
            }

            return {
                isSuccess: true,
                message: 'セッションの作成に成功しました',
                data: {
                    isOpenSheet: false,
                },
            };

        });
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'シナリオの作成に失敗しました'
            }
        }
    }

    redirect('/home/scenario')
}
