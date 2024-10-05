"use client"

import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser, checkIsFollowing } from '@/actions/follow-user';

interface FollowButtonProps {
    followedUserId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ followedUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkFollowStatus = async () => {
            const result = await checkIsFollowing(followedUserId);
            if (result.isSuccess) {
                setIsFollowing(result.data.success);
            } else {
                setError(result.error?.message || 'フォロー状態の確認に失敗しました。');
            }
        };

        checkFollowStatus();
    }, [followedUserId]);

    const handleFollow = async () => {
        const result = await followUser(followedUserId);
        if (result.isSuccess) {
            setIsFollowing(true);
        } else {
            setError(result.error?.message || 'フォローに失敗しました。');
        }
    };

    const handleUnfollow = async () => {
        const result = await unfollowUser(followedUserId);
        if (result.isSuccess) {
            setIsFollowing(false);
        } else {
            setError(result.error?.message || 'フォロー解除に失敗しました。');
        }
    };

    return (
        <div>
            {isFollowing ? (
                <button onClick={handleUnfollow} className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300">
                    フォロー中
                </button>
            ) : (
                <button onClick={handleFollow} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                    フォロー
                </button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FollowButton;
