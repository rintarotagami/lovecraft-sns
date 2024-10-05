import React from 'react';
import ScenarioImage from '@/app/(main)/home/_components/Scenario/ScenarioImage/ScenarioImage';

interface ScenarioResultToScenarioProps {
    isFocused: boolean;
    results: { id: string; title: string; expectedPlayers: number; imageNames: Array<string>; isGMless: Boolean, expectedPlayTime: string, }[],
    setSelectedScenario: (scenario: { id: string; title: string; expectedPlayers: number; imageNames: Array<string>; isGMless: Boolean, expectedPlayTime: string, } | null) => void; // 親にシナリオを渡すための関数
}

export const ScenarioResultToScenario: React.FC<ScenarioResultToScenarioProps> = ({ isFocused, results, setSelectedScenario }) => {
    return (
        <>
            {isFocused && results.length > 0 && (
                <div
                    className='z-50 absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg search-result overflow-hidden'
                    onMouseDown={(e) => e.preventDefault()} // クリック時にフォーカスが外れないようにする
                >
                    <ul>
                        {results.map((result, index) => (
                            <li 
                                key={index} 
                                className='w-full p-4 hover:bg-gray-100 flex items-center space-x-4'
                                onClick={() => setSelectedScenario(result)} // クリック時にシナリオを親に渡す
                            >
                                <ScenarioImage imageName={result.imageNames[0]} altText={result.title} className="w-16 h-16 rounded-lg" />
                                <div className='flex flex-col'>
                                    <span className='text-gray-500 text-lg font-semibold'>{result.title}</span>
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
