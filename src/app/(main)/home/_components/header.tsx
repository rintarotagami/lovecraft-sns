import React from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';

const Header: React.FC = () => {
    return (
        <header className='flex justify-center items-center md:p-4 p-2 bg-[#727272] text-white md:px-60 px-10'>
            <SearchBar />
        </header>
    );
};

export default Header;
