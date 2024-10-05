'use client';

import { signOut } from "next-auth/react";

const SignOutButton: React.FC = () => {
    return (
        <button onClick={() => signOut()} className="text-gray-600 hover:text-gray-900">
            ログアウト
        </button>
    );
};

export default SignOutButton;
