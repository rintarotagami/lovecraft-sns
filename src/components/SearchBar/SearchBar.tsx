'use client'

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchedNameResult } from './SearchResult/SearchedNameResult';
import { ScenarioResultToLink } from './SearchResult/ScenarioResultToLink';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (query) {
            if (query.startsWith('@')) {
                // ＠マークが頭についていたら、searchedNameを検索する            
                const fetchData = async () => {
                    const response = await fetch(`/api/searchedName/${query.slice(1)}`);
                    const data = await response.json();
                    setResults(data);
                };
                fetchData();
            } else if (query.startsWith('&')) {
                // &マークが頭についていたら、scenarioNameを検索する            
                const fetchData = async () => {
                    const response = await fetch(`/api/scenarioName/${query.slice(1)}`);
                    const data = await response.json();
                    setResults(data);
                };
                fetchData();
            } else {
                setResults([]);
            }
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className='relative w-full'>
            <div className='flex items-center border border-gray-300 py-2 rounded-full'>
                <FaSearch className='text-gray-400 mx-4' />
                <input
                    type='text'
                    className='appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-full'
                    placeholder='@ユーザーID / &シナリオ名で検索...'
                    // 投稿 / @ユーザーID / &シナリオ名 / #タグ で検索...
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            {query.startsWith('@') && <SearchedNameResult isFocused={isFocused} results={results} />}
            {query.startsWith('&') && <ScenarioResultToLink isFocused={isFocused} results={results} />}
        </div>
    );
};

export default SearchBar;

