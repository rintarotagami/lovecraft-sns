'use client';

import { signOut } from "next-auth/react";

const SignOutButton: React.FC = () => {
    return (
        <button onClick={() => signOut()} className="text-gray-300 hover:text-gray-50">
            ログアウト
        </button>
    );
};

export default SignOutButton;
