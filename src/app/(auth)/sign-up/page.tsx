import React from 'react';
import { SignUpForm } from '@/components/SignUpForm/SignUpForm';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

function SignUpPage() {
    return (
        <div>
            <SignUpForm />
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