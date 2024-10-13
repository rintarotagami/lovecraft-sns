"use client"

import React, { useState, useEffect } from 'react';
import { registerPlayerToSession, registerSpectatorToSession,unregisterPlayerFromSession, unregisterSpectatorFromSession, checkIsRegistered } from '@/actions/session';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface SessionEntryButtonProps {
    sessionId: string;
}

const SessionEntryButton: React.FC<SessionEntryButtonProps> = ({ sessionId }) => {
    const [isRegistered, setIsRegistered] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkFollowStatus = async () => {
            const result = await checkIsRegistered(sessionId);
            if (result.isSuccess) {
                setIsRegistered(result.data.isRegistered);
            } else {
                setError(result.error?.message || 'フォロー状態の確認に失敗しました。');
            }
        };

        checkFollowStatus();
    }, [isRegistered]);

    const handleRegisterPlayer = async () => {
        const result = await registerPlayerToSession(sessionId);
        if (result.isSuccess) {
            setIsRegistered("player");
            toast.success(result.message);
        } else {
            setError(result.error?.message || 'プレイヤー登録に失敗しました。');
            console.error(error);
            toast.error(result.error.message);
        }
    };

    const handleUnregisterPlayer = async () => {
        const result = await unregisterPlayerFromSession(sessionId);
        if (result.isSuccess) {
            setIsRegistered("none");
            toast.success(result.message);
        } else {
            setError(result.error?.message || 'プレイヤー登録解除に失敗しました。');
            console.error(error);
            toast.error(result.error.message);
        }
    };

    const handleRegisterSpectator = async () => {
        const result = await registerSpectatorToSession(sessionId);
        if (result.isSuccess) {
            setIsRegistered("spectator");
        } else {
            setError(result.error?.message || '観戦者登録に失敗しました。');
        }
    };

    const handleUnregisterSpectator = async () => {
        const result = await unregisterSpectatorFromSession(sessionId);
        if (result.isSuccess) {
            setIsRegistered("none");
            toast.success(result.message);
        } else {
            setError(result.error?.message || '観戦者登録解除に失敗しました。');
            console.error(error);
            toast.error(result.error.message);
        }
    };

    return (
        <div>
            {isRegistered === "none" ? (
                <div className='flex w-fit gap-4'>
                    <Button onClick={handleRegisterPlayer} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                        このゲームに参加する
                    </Button>
                    <Button onClick={handleRegisterSpectator} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                        このゲームを観戦する
                    </Button>
                </div>
            ) : isRegistered === "player" ? (
                <div>
                    <p>プレイヤーとして参加しています</p>
                    <Button onClick={handleUnregisterPlayer} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                        ゲームの参加をキャンセル
                    </Button>
                </div>
            ) : isRegistered === "spectator" ? (
                <div>
                    <p>観戦者として参加しています</p>
                    <Button onClick={handleUnregisterSpectator} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                        ゲームの観戦をキャンセル
                    </Button>
                </div>
            ) : (
                <div></div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SessionEntryButton;
