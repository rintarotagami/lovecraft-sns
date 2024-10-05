'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/auth/new-verification';
import { Spinner } from '@/components/Spinner/Spinner';
import { FormError } from '@/components/FormError/FormError';
import { FormSuccess } from '@/components/FormSuccess/FormSuccess';

export const NewVerificationClient = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const verifyToken = useCallback(async () => {
        if (success || error) return;

        if (!token) {
            setError('トークンの取得に失敗しました。');
            return;
        }

        const result = await newVerification(token);

        if (!result.isSuccess) {
            setError(result.error.message);
            return;
        }

        setSuccess(result.message);

        setTimeout(() => {
            router.push('/sign-in');
        }, 3000);
    }, [success, error, token, router]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    return (
        <div className='flex items-center w-full justify-center mt-4'>
            {!success && !error && <Spinner size={'lg'} />}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
        </div>
    );
};