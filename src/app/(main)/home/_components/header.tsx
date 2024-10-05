import React from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';

const Header: React.FC = () => {
    return (
        <header className='flex justify-center items-center p-4 bg-gray-600 text-white px-60'>
            <SearchBar />
        </header>
    );
};

export default Header;
