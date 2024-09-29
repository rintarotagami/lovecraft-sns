'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const EmailSentSuccess = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">{email}に認証メールを送信しました</h1>
            <p className="mt-4 text-center">
                メールボックスを確認し、認証リンクをクリックしてください。
                <br />
                メールが届かない場合は、迷惑メールフォルダを確認してください。
            </p>
            <Link href="/sign-up" className="mt-4 text-blue-500 hover:underline">
                サインアップ画面へ戻る
            </Link>
        </div>
    );
};

export default EmailSentSuccess;
