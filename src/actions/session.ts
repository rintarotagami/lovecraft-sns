'use server'

import { GameSessionSchema } from "@/zod-schemas/game-session"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { SpectatorType, CommunicationType, Qualification } from '@prisma/client'; 

export interface FormState {
    error: string
}

export const createGameSession = async (state: FormState, formData: FormData) => {
    const newSession: GameSessionSchema = {
        summary: {
            title: formData.get('title') as string,
            scenarioId: formData.get('scenarioId') as string, 
            dueDate: new Date(formData.get('dueDate') as string),
            communicationType: formData.get('communicationType') as CommunicationType,
            qualification: formData.get('qualification') as Qualification,
            gms: (formData.get('gms') as string).split(',').map(id => ({ id })),
            applicants: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            detailId: '',
        },
        detail: {
            gameSessionId: '',
            description: formData.get('description') as string,
            isMobileCompatible: Boolean(formData.get('isMobileCompatible')),
            isSpectator: formData.get('isSpectator') as SpectatorType,
            ageLimit: Number(formData.get('ageLimit')),
            players: [],
            spectators: [],
        },
    }

    try {
        const createdSummary = await db.gameSessionSummary.create({
            data: {
                ...newSession.summary,
                gms: {
                    create: newSession.summary.gms.map(gm => ({
                        user: { connect: { id: gm.id } }
                    }))
                },
                applicants: {
                    create: newSession.summary.applicants.map(applicant => ({
                        userId: applicant.userId
                    }))
                }
            }
        });
        
        newSession.detail.gameSessionId = createdSummary.id

        const createdDetail = await db.gameSessionDetail.create({
            data: {
                ...newSession.detail,
                players: {
                    create: newSession.detail.players.map(player => ({
                        user: { connect: { id: player.id } }
                    }))
                },
                spectators: {
                    create: newSession.detail.spectators.map(spectator => ({
                        user: { connect: { id: spectator.id } }
                    }))
                }
            }
        });
        await db.gameSessionSummary.update({
            where: { id: createdSummary.id },
            data: { detailId: createdDetail.id }
        })
    } catch (error) {
        state.error = 'セッションの作成に失敗しました'
        return state
    }

    redirect('/session')
}

export const updateGameSession = async (id: string, state: FormState, formData: FormData) => {
    const updatedSession: GameSessionSchema = {
        summary: {
            title: formData.get('title') as string,
            dueDate: new Date(formData.get('dueDate') as string),
            communicationType: formData.get('communicationType') as CommunicationType,
            qualification: formData.get('qualification') as Qualification,
            scenarioId: formData.get('scenarioId') as string,
            gms: [],
            applicants: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        detail: {
            gameSessionId: formData.get('summaryId') as string,
            description: formData.get('description') as string,
            isMobileCompatible: Boolean(formData.get('isMobileCompatible')),
            isSpectator: formData.get('isSpectator') as SpectatorType,
            ageLimit: Number(formData.get('ageLimit')),
            players: [],
            spectators: [],
        },
    }

    try {
        await db.gameSessionSummary.update({
            where: { id },
            data: {
                ...updatedSession.summary,
                gms: {
                    deleteMany: {},
                    create: (formData.getAll('gms') as string[]).map(userId => ({
                        user: { connect: { id: userId } }
                    }))
                },
                applicants: {
                    deleteMany: {},
                    create: updatedSession.summary.applicants.map(applicant => ({
                        userId: applicant.userId
                    }))
                }
            }
        });
        
        await db.gameSessionDetail.update({
            where: { gameSessionId: id },
            data: {
                ...updatedSession.detail,
                players: {
                    deleteMany: {},
                    create: updatedSession.detail.players.map(player => ({
                        user: { connect: { id: player.id } }
                    }))
                },
                spectators: {
                    deleteMany: {},
                    create: updatedSession.detail.spectators.map(spectator => ({
                        user: { connect: { id: spectator.id } }
                    }))
                }
            }
        });
    } catch (error) {
        state.error = 'セッションの更新に失敗しました'
        return state
    }

    redirect('/session')
}

export const deleteGameSession = async (id: string, state: FormState) => {
    try {
        await db.gameSessionSummary.delete({ where: { id } })
    } catch (error) {
        state.error = 'セッションの削除に失敗しました'
        return state
    }

    redirect('/session')
}