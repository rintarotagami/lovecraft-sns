"use client"

import React, { useState, useEffect } from 'react';
import { checkIsFollowed } from '@/actions/follow-user';
import { UserCheck, UserX } from 'lucide-react'; // reactIconをインポート

interface CheckIsFollowIconProps {
    followerUserId: string;
}

const CheckIsFollowIcon: React.FC<CheckIsFollowIconProps> = ({ followerUserId }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkFollowStatus = async () => {
            const result = await checkIsFollowed(followerUserId);
            if (result.isSuccess) {
                setIsFollowed(result.data.success);
            } else {
                setError(result.error?.message || 'フォロー状態の確認に失敗しました。');
            }
        };

        checkFollowStatus();
    }, [followerUserId]);

    return (
        <div className="flex items-center space-x-2">
            {isFollowed ? (
                <div className="flex items-center space-x-1 text-green-500">
                    <UserCheck className="w-5 h-5" />
                    <p>自分のフォロワー</p>
                </div>
            ) : (
                <div className="flex items-center space-x-1 text-red-500">
                    <UserX className="w-5 h-5" />
                    <p>フォローされていません</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CheckIsFollowIcon;
