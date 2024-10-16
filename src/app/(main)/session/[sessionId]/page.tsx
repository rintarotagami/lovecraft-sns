import React, { useState, useTransition } from 'react';
import { getgameSessionById } from '@/db/session';
import { getUserById } from '@/db/user';
import { ReadonlyURLSearchParams } from 'next/navigation';

import SessionEntryButton from '@/components/SessionEntryButton/SessionEntryButton'
import ScenarioImage from '@/components/Scenario/ScenarioImage/ScenarioImage';
import { FaUsers, FaClock, FaExclamationTriangle, FaBan, FaFileAlt, FaVideo, FaInfoCircle } from 'react-icons/fa';
import UserIcon from '@/components/userProfile/UserIcon/UserIcon';

type Props = {
    params: { sessionId: string };
};

export default async function gameSessionSummaryPage({ params }: Props) {

    const gameSession = await getgameSessionById(params.sessionId)

    if (!gameSession) {
        return <div>セッションが見つかりませんでした。</div>;
    }

    return (
        <div className="p-8">
            <header className="mb-4">
                <h1 className="text-2xl font-bold">{gameSession.scenario?.title}</h1>
            </header>
            <div className="mb-4">
                <ScenarioImage imageName={gameSession.scenario?.imageNames[0] || ''} altText={gameSession.scenario?.title || ''} className="w-full h-64 rounded-lg mb-4" />
                <p className="text-sm">{gameSession.description}</p>
            </div>
            <div className="mb-4">
                <p className="text-xs flex items-center"><FaClock className="mr-1" />プレイ日: {new Date(gameSession.playDate).toLocaleDateString()}</p>
                <p className="text-xs flex items-center"><FaClock className="mr-1" />開始時間: {gameSession.startTime}</p>
                <p className="text-xs flex items-center"><FaClock className="mr-1" />予想プレイ時間: {gameSession.scenario?.expectedPlayTime}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">ゲームマスター</h2>
                <ul>
                    {await Promise.all(gameSession.gms.map(async (gm: { id: string; userId: string | null }) => {
                        if (gm.userId) { 
                            const user = await getUserById(gm.userId);
                            return (
                                <li key={gm.id} className="text-sm flex items-center">
                                    <UserIcon imageName={user?.image || ''} altText={user?.name || gm.userId} className="w-8 h-8 rounded-full mr-2" />
                                    {user?.name || gm.userId}
                                </li>
                            );
                        }
                        return null; // userIdがnullの場合の処理
                    }))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">プレイヤー</h2>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">観客</h2>

            </div>
            <SessionEntryButton sessionId={gameSession.id} />
        </div>
    );
}
