'use server'

import * as z from 'zod';

import { gameSessionSchema } from "@/zod-schemas/game-session"
import { db } from "@/lib/db"
import { auth } from '@/auth';
import { ActionsResult } from '@/types/ActionsResult';
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

export const registerPlayerToSession = async (sessionId: string): Promise<ActionsResult> => {
    try {
        const user = await auth().then((session) => session?.user);

        if (!user || !user.id) {
            return {
                isSuccess: false,
                error: {
                    message: '認証情報を取得できませんでした。',
                },
            };
        }

        const userId = user.id;

        const gameSession = await db.gameSession.findUnique({
            where: { id: sessionId },
        });

        if (!gameSession) {
            return {
                isSuccess: false,
                error: {
                    message: 'セッションが見つかりませんでした。',
                },
            };
        }

        if (gameSession.currentPlayers >= gameSession.maxPlayers) {
            return {
                isSuccess: false,
                error: {
                    message: 'セッションのプレイヤー数が上限に達しています。',
                },
            };
        }
        
        console.log(gameSession.currentPlayers);
        
        await db.gameSession.update({
            where: { id: sessionId },
            data: { currentPlayers: gameSession.currentPlayers + 1 },
        });

        await db.gameSessionPlayer.create({
            data: {
                gameSessionId: sessionId,
                userId: userId,
            },
        });

        return {
            isSuccess: true,
            message: 'プレイヤーとしてセッションに登録しました。',
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'プレイヤーの登録に失敗しました。',
            },
        };
    }
}

export const unregisterPlayerFromSession = async (sessionId: string): Promise<ActionsResult> => {
    try {
        const user = await auth().then((session) => session?.user);

        if (!user || !user.id) {
            return {
                isSuccess: false,
                error: {
                    message: '認証情報を取得できませんでした。',
                },
            };
        }

        const userId = user.id;

        const gameSession = await db.gameSession.findUnique({
            where: { id: sessionId },
        });

        if (!gameSession) {
            return {
                isSuccess: false,
                error: {
                    message: 'セッションが見つかりませんでした。',
                },
            };
        }

        await db.gameSession.update({
            where: { id: sessionId },
            data: { currentPlayers: gameSession.currentPlayers - 1 },
        });

        await db.gameSessionPlayer.deleteMany({
            where: {
                gameSessionId: sessionId,
                userId: userId,
            },
        });

        return {
            isSuccess: true,
            message: 'プレイヤーの登録を解除しました。',
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'プレイヤーの登録解除に失敗しました。',
            },
        };
    }
}

export const unregisterSpectatorFromSession = async (sessionId: string): Promise<ActionsResult> => {
    try {
        const user = await auth().then((session) => session?.user);

        if (!user || !user.id) {
            return {
                isSuccess: false,
                error: {
                    message: '認証情報を取得できませんでした。',
                },
            };
        }

        const userId = user.id;

        const gameSession = await db.gameSession.findUnique({
            where: { id: sessionId },
        });

        if (!gameSession) {
            return {
                isSuccess: false,
                error: {
                    message: 'セッションが見つかりませんでした。',
                },
            };
        }

        await db.gameSessionSpectator.deleteMany({
            where: {
                gameSessionId: sessionId,
                userId: userId,
            },
        });

        return {
            isSuccess: true,
            message: '観戦者の登録を解除しました。',
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: '観戦者の登録解除に失敗しました。',
            },
        };
    }
}


export const registerSpectatorToSession = async (sessionId: string): Promise<ActionsResult> => {
    try {
        const user = await auth().then((session) => session?.user);

        if (!user || !user.id) {
            return {
                isSuccess: false,
                error: {
                    message: '認証情報を取得できませんでした。',
                },
            };
        }

        const userId = user.id;

        const gameSession = await db.gameSession.findUnique({
            where: { id: sessionId },
        });

        if (!gameSession) {
            return {
                isSuccess: false,
                error: {
                    message: 'セッションが見つかりませんでした。',
                },
            };
        }

        await db.gameSessionSpectator.create({
            data: {
                gameSessionId: sessionId,
                userId: userId,
            },
        });

        return {
            isSuccess: true,
            message: '観戦者としてセッションに登録しました。',
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: '観戦者の登録に失敗しました。',
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

export const checkIsRegistered = async (
    sessionId: string
): Promise<ActionsResultWithData<string>> => {
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
        const existingPlayerRegistration = await db.gameSessionPlayer.findUnique({
            where: {
                gameSessionId_userId: {
                    gameSessionId: sessionId,
                    userId: user.id,
                },
            },
        });

        const existingSpectatorRegistration = await db.gameSessionSpectator.findUnique({
            where: {
                gameSessionId_userId: {
                    gameSessionId: sessionId,
                    userId: user.id,
                },
            },
        });

        if (existingPlayerRegistration) {
            return {
                isSuccess: true,
                message: "プレイヤーとして登録済みです。",
                data: {isRegistered: "player"},
            };
        } else if (existingSpectatorRegistration) {
            return {
                isSuccess: true,
                message: "gameSessionSpectatorとして登録済みです。",
                data: {isRegistered: "spectator"},
            };
        } else {
            return {
                isSuccess: true,
                message: "まだセッションに登録されていません。",
                data:{isRegistered: "none"} ,
            };
        }
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'セッション登録状態のチェックに失敗しました。',
            },
        };
    }
}


