'use server';

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { ActionsResultWithData } from '@/types/ActionsResult';

export const followUser = async (
    followedUserId: string
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
        await db.follow.create({
            data: {
                followerId: user.id,
                followingId: followedUserId,
            },
        });

        return {
            isSuccess: true,
            message: "フォロー関係の保存に成功しました。",
            data: { success: true },
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'フォロー関係の保存に失敗しました。',
            },
        };
    }
};

export const checkIsFollowing = async (
    followedUserId: string
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
        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: followedUserId,
                },
            },
        });

        if (existingFollow) {
            return {
                isSuccess: true,
                message: "既にフォローしています。",
                data: { success: true },
            };
        } else {
            return {
                isSuccess: true,
                message: "まだフォローしていません。",
                data: { success: false },
            };
        }
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'フォロー状態のチェックに失敗しました。',
            },
        };
    }
};

export const checkIsFollowed = async (
    followerUserId: string
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
        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: followerUserId,
                    followingId: user.id,
                },
            },
        });

        if (existingFollow) {
            return {
                isSuccess: true,
                message: "フォローされています。",
                data: { success: true },
            };
        } else {
            return {
                isSuccess: true,
                message: "フォローされていません。",
                data: { success: false },
            };
        }
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'フォロー状態のチェックに失敗しました。',
            },
        };
    }
};


export const unfollowUser = async (
    followedUserId: string
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
        await db.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: followedUserId,
                },
            },
        });

        return {
            isSuccess: true,
            message: "フォローを解除しました。",
            data: { success: true },
        };
    } catch (error) {
        return {
            isSuccess: false,
            error: {
                message: 'フォロー解除に失敗しました。',
            },
        };
    }
};



