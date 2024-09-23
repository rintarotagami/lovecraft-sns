import React from 'react';
import { SignUpForm } from '@/components/SignUpForm/SignUpForm';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SignUpSocialButtons } from '@/components/SocialButtons/SignUpSocialButton';

import Link from 'next/link';


function SignUpPage() {
    return (
        <div>
            <SignUpForm />
            <Separator className='my-4' />
            <SignUpSocialButtons />
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