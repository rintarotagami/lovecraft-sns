'use server'

import * as z from 'zod';

import { gameSessionSchema } from "@/zod-schemas/game-session"
import { db } from "@/lib/db"
import { auth } from '@/auth';
import { ActionsResultWithData } from '@/types/ActionsResult';
import { revalidatePath } from 'next/cache';

export interface FormState {
    error: string
}

export const createGameSession = async (
    values: z.infer<typeof gameSessionSchema>
): Promise<ActionsResultWithData<boolean>> => {
    const user = await auth().then((session) => session?.user);

    if (!user || !user.id) {
        return {
            isSuccess: false,
            error: {
                message: '認証情報を取得できませんでした。',
            },
        };
    }

    try {
        const createdSession = await db.gameSession.create({
            data: {
                scenario: {
                    connect: { id: values.scenarioId }
                },
                description: values.description,
                playDate: values.playDate,
                startTime: values.startTime,
                qualification: values.qualification,
                isMobileCompatible: values.isMobileCompatible,
                isSpectator: values.isSpectator,
                maxPlayers: values.maxPlayers,
                currentPlayers: values.scenario?.isGMless ? 1 : 0
            }
        });

        if (values.scenario?.isGMless) {
            await db.gameSessionPlayer.create({
                data: {
                    gameSessionId: createdSession.id,
                    userId: user.id,
                }
            });
        } else {
            await db.gameSessionGM.create({
                data: {
                    gameSessionId: createdSession.id,
                    userId: user.id,
                }
            });
        }

        revalidatePath('/session')

        return {
            isSuccess: true,
            message: 'セッションの作成に成功しました',
            data: {
                isOpenSheet: false,
            },
        };

    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'セッションの作成に失敗しました',
            },
        };
    }
}

export async function deleteGameSession(sessionId: string) {
    try {
        await db.gameSession.delete({
            where: { id: sessionId },
        });

        return {
            isSuccess: true,
            message: 'セッションを削除しました。',
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'セッションの削除に失敗しました',
            },
        };
    }
}


