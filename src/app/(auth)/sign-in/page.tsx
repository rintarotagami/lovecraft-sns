import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { SignInForm } from '@/components/SignInForm/SignInForm';

function SignInPage() {
    return (
        <div>
            <SignInForm />
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