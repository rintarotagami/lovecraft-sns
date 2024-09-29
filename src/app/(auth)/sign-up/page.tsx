import React from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm/SignUpForm';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SocialButtons } from '@/components/auth/SocialButtons/SocialButtons';

import Link from 'next/link';


function SignUpPage() {
    return (
        <div>
            <SignUpForm />
            <Separator className='my-4' />
            <SocialButtons />
            <Link
                className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'mt-4',
                })}
                href={'/sign-in'}
            >
                ログインはこちら
            </Link>
        </div>
    );
}

export default SignUpPage;