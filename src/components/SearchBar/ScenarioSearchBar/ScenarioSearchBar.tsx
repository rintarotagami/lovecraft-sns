'use client'

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ScenarioResultToScenario } from '@/components/SearchBar/SearchResult/ScenarioResultToScenario';

interface ScenarioSearchBarProps {
    setSelectedScenario: React.Dispatch<React.SetStateAction<{ id: string; title: string; expectedPlayers: number; imageNames: string[]; isGMless: Boolean; expectedPlayTime: string; } | null>>;
}

const ScenarioSearchBar: React.FC<ScenarioSearchBarProps> = ({ setSelectedScenario }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (query.trim() === '') return; // クエリが空の場合はリクエストを送信しない
            try {
                const response = await fetch(`/api/scenarioName/${query}`); // クエリの最初の文字を削除しない
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Fetch error:', error);
                // 必要に応じてユーザーにエラーを通知する処理を追加
            }
        };
        fetchData();
    }, [query]);

    return (
        <div className='relative w-full'>
            <div className='flex items-center border border-gray-300 py-2 rounded-full'>
                <FaSearch className='text-gray-400 mx-4' />
                <input
                    type='text'
                    className='appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-full'
                    placeholder='シナリオ名で検索'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            <ScenarioResultToScenario isFocused={isFocused} results={results} setSelectedScenario={setSelectedScenario} />
        </div>
    );
};

export default ScenarioSearchBar;

