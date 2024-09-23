import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { SignInForm } from '@/components/SignInForm/SignInForm';
import { SignInSocialButtons } from '@/components/SocialButtons/SignInSocialButtons';
import { Separator } from '@/components/ui/separator';

function SignInPage() {
    return (
        <div>
            <SignInForm />
            <Separator className='my-4' />
            <SignInSocialButtons />
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