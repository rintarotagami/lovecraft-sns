"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface UserIconProps {
    imageName: string;
    altText: string;
    className?: string; 
}

const fetchImage = async (imageName: string) => {
    const response = await fetch(`/api/gcsImage/getIconImage/${imageName}`);
    const data = await response.json();
    console.log('取得したデータ:', response);
    return data.url;
};

const UserIcon: React.FC<UserIconProps> = ({ imageName, altText, className }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const loadImage = async () => {
            if (imageName.startsWith('http')) {
                setImageUrl(imageName);
            } else {
                const url = await fetchImage(imageName);
                setImageUrl(url);
            }
        };

        loadImage();
    }, [imageName]);

    return <Image src={imageUrl} alt={altText} className={`rounded-full ${className}`} />;
};

export default UserIcon;

