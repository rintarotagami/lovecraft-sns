import React from 'react';
import Link from 'next/link';
import ScenarioImage from '@/app/(main)/home/_components/Scenario/ScenarioImage/ScenarioImage';

interface ScenarioResultToLinkProps {
    isFocused: boolean;
    results: { id: string; title: string; expectedPlayers: number; imageNames: Array<string>; isGMless: Boolean, expectedPlayTime: string, }[]
}

export const ScenarioResultToLink: React.FC<ScenarioResultToLinkProps> = ({ isFocused, results }) => {
    return (
        <>
            {isFocused && results.length > 0 && (
                <div
                    className='z-50 absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg search-result overflow-hidden'
                    onMouseDown={(e) => e.preventDefault()} // クリック時にフォーカスが外れないようにする
                >
                    <ul>
                        {results.map((result, index) => (
                            <li key={index} className='w-full p-4 hover:bg-gray-100 flex items-center space-x-4'>
                                <ScenarioImage imageName={result.imageNames[0]} altText={result.title} className="w-16 h-16 rounded-lg" />
                                <div className='flex flex-col'>
                                    <Link href={`/home/scenario/${result.id}`} className='text-blue-600 text-lg font-semibold hover:underline'>
                                        {result.title}
                                    </Link>
                                    <span className='text-gray-500 text-sm'>プレイ人数: {result.expectedPlayers}人</span>
                                    <span className='text-gray-500 text-sm'>想定プレイ時間: {result.expectedPlayTime}</span>
                                    <span className='text-gray-500 text-sm'>{result.isGMless ? 'ゲームマスターが不要' : 'ゲームマスターが必要'}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};
