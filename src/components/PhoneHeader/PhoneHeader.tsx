import React from 'react';
import EditProfileSheet from '../EditProfileSheet/EditProfileSheet'
import Image from 'next/image'
import Link from 'next/link'

const PhoneHeader: React.FC = () => {
    return (
        <header className='z-50 stretch flex justify-between items-center w-full px-4 py-2 bg-[#252525] text-white'>
            <Link href='/'>
                    <Image
                        src="/assets/img/LoveCraft_logo.png"
                        alt="LoveCraft タイトル"
                        width={70}
                        height={200}
                        className="drop-shadow-2xl"
                    />
            </Link>
            <EditProfileSheet />
        </header>
    );
};

export default PhoneHeader;
