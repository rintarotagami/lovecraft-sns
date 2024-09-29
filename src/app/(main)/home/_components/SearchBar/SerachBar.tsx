'use client'

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (query) {
            // ここで検索処理を行う
            const fetchData = async () => {
                // 例として、fetchを使ってデータを取得する
                const response = await fetch(`/api/search?q=${query}`);
                const data = await response.json();
                setResults(data);
            };
            fetchData();
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
                    placeholder='検索...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            {isFocused && results.length > 0 && (
                <div className='absolute bg-white border border-gray-300 mt-1 w-full rounded-lg'>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index} className='p-2 hover:bg-gray-200'>
                                {/* {result.name} */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

