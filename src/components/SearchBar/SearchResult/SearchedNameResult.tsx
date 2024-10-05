import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import UserIcon from '@/components/userProfile/UserIcon/UserIcon';

interface SearchedNameResultProps {
    isFocused: boolean;
    results: { name: string; image: string; searchedName: string; }[];
}

export const SearchedNameResult: React.FC<SearchedNameResultProps> = ({ isFocused, results }) => {
    return (
        <>
            {isFocused && results.length > 0 && (
                <div
                    className='z-50 absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg search-result overflow-hidden'
                    onMouseDown={(e) => e.preventDefault()} // クリック時にフォーカスが外れないようにする
                >
                    <ul>
                        {results.map((result, index) => (
                            <li key={index} className='w-full p-2 hover:bg-gray-100'>
                                <Link href={`/user/${result.searchedName}`} className='w-full flex items-center'>
                                    <UserIcon imageName={result.image} altText={result.name} className='w-8 h-8 rounded-full mr-2' />
                                    <div className='flex flex-col'>
                                        <span className='text-gray-800 text-sm'>{result.name}</span>
                                        <span className='text-gray-500 text-sm'>@{result.searchedName}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

//user/${result.searchedName}
