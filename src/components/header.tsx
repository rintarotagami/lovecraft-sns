import React from "react";
import LoveCraft_logo from "@/assets/img/LoveCraft_logo.png";
import Image from "next/image";
import Link from "next/link";
import EditProfileSheet from "./EditProfileSheet/EditProfileSheet work";
import { auth } from '@/auth';
import SignOutButton from "@/components/auth/SignOutButton/SignOutButton"

const Header: React.FC = async () => {
    const session = await auth();

    return (
        <header className="fixed top-0 left-0 w-full px-4 py-3 flex items-center justify-between">
            <Image src={LoveCraft_logo} alt="LoveCraftロゴ" className="w-24 h-auto" />
            <nav className="flex items-center space-x-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link rel="stylesheet" href="/session" className="text-gray-600 hover:text-gray-900">
                            マイページ
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            コース
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            お問い合わせ
                        </a>
                    </li>
                </ul>
                <div className="flex space-x-4">
                    {session ? (
                        <>
                            <SignOutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-up" className="text-gray-600 hover:text-gray-900">
                                会員登録
                            </Link>
                            <Link href="/sign-in" className="text-gray-600 hover:text-gray-900">
                                ログイン
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
