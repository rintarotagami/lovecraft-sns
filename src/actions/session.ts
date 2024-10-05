'use server'

import * as z from 'zod';

import { gameSessionSchema } from "@/zod-schemas/game-session"
import { db } from "@/lib/db"
import { auth } from '@/auth';
import { ActionsResultWithData } from '@/types/ActionsResult';

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
                gms: {
                    create: values.gms.map(gm => ({
                        user: { connect: { id: user.id } }
                    }))
                },
                players: {
                    create: []
                },
                spectators: {
                    create: []
                },
                scenario: {
                    connect: { id: values.scenarioId }
                },
                description: values.description,
                playDate: values.playDate,
                startTime: values.startTime,
                qualification: values.qualification,
                isMobileCompatible: values.isMobileCompatible,
                isSpectator: values.isSpectator,
            }
        });

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


