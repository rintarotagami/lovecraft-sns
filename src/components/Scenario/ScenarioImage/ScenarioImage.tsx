"use client"

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Loading from './loading/loading';

interface ScenarioImageProps {
    imageName: string;
    altText: string;
    className?: string;
}

const fetchImage = async (imageName: string) => {
    try {
        const response = await fetch(`/api/gcsImage/getScenarioImage/${imageName}`);
        if (!response.ok) {
            throw new Error('画像の取得に失敗しました');
        }
        const data = await response.json();
        // console.log('取得したデータ:', data);
        return data.url;
    } catch (error) {
        // console.error('エラー:', error);
        return '';
    }
};

const ScenarioImage: React.FC<ScenarioImageProps> = ({ imageName, altText, className }) => {
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

    return (
        <Suspense fallback={<Loading />}>
            <div className={`relative overflow-hidden ${className}`}>
                <Image src={imageUrl} alt={altText} fill style={{ objectFit: 'cover' }}/>
            </div>
        </Suspense>
    )
};

export default ScenarioImage;
