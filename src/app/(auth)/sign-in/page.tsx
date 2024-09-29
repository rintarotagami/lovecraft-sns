import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { SignInForm } from '@/components/auth/SignInForm/SignInForm';
import { SocialButtons } from '@/components/auth/SocialButtons/SocialButtons';
import { Separator } from '@/components/ui/separator';

function SignInPage() {
    return (
        <div>
            <SignInForm />
            <Separator className='my-4' />
            <SocialButtons />
            <Link
                className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'mt-4',
                })}
                href={'/sign-up'}
            >
                新規登録はこちら
            </Link>
        </div>
    );
}

export default SignInPage;