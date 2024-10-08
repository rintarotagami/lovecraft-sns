'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa'; // Assuming this import is needed for FaTwitter

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

type SocialProvider = 'google' | 'github' | 'twitter';

interface SocialButtonsProps {
    onClick: (provider: SocialProvider) => void;
}

export const SocialButtons = () => {
    const onClick = (provider: SocialProvider) => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                onClick={() => onClick('google')}
            >
                <FcGoogle className='h-5 w-5' />
                <span className='ml-2'>Google</span>
            </Button>
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                onClick={() => onClick('github')}
            >
                <FaGithub className='h-5 w-5' />
                <span className='ml-2'>GitHub</span>
            </Button>
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                onClick={() => onClick('twitter')}
            >
                <FaTwitter className='h-5 w-5' />
                <span className='ml-2'>Twitter</span>
            </Button>
        </div>
    );
};