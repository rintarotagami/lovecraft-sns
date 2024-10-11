import React from "react";
import LoveCraft_logo from "@/assets/img/LoveCraft_logo.png";
import Image from "next/image";
import Link from "next/link";
import { auth } from '@/auth';
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { naishoMoji, limelight } from "@/utils/font"



import MenuRibbon from "@/components/MenuRibbon/MenuRibbon";

const Header: React.FC = async () => {
    const session = await auth();

    return (
        <header className="fixed z-50 top-0 w-full px-4 flex justify-between">
            <MenuRibbon />
            <div className="w-fit">
                <div className="relative z-10 text-right mx-auto mt-5 py-3" style={{ marginRight: '-50px' }}>
                    <Link href={"/sign-in"}>
                        <div className="absolute drop-shadow-lg top-0 bottom-0 left-0 right-0 transform -skew-x-12 z-0  border-b-[#8F6D4C] border-[#E3BF84] border rounded-lg bg-[linear-gradient(0deg,_#150c0E_15%,_#26181B_15%,_#26181B_25%,_#150c0E_25%,_#150c0E_40%,_#26181B_40%,_#26181B_50%,_#150c0E_50%,_#150c0E_65%,_#26181B_65%,_#26181B_75%,_#150c0E_75%,_#150c0E_90%,_#26181B_90%,_#26181B)] bg-[length:12px_12px]"></div>
                        <div className="absolute top-1 bottom-1 left-1 right-1 transform -skew-x-12 z-0 border border-[#b8b48fa2] rounded-md"></div>
                        <span className="relative z-10 text-lg text-[#FEE0B8] flex items-center justify-start pr-20">
                            <FaSignInAlt className="mx-2 font-bold" />
                            <span className={`${naishoMoji.className}`} style={{ background: 'linear-gradient(to top, #D6A169 50%, #FEE0B8 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                サインアップ / ログイン
                            </span>
                        </span>
                    </Link>
                </div>
                <div className="relative z-10 text-right mx-auto mt-5 py-3" style={{ marginRight: '-50px' }}>
                    <Link href={"/session"}>
                        <div className="absolute drop-shadow-lg top-0 bottom-0 left-0 right-0 transform -skew-x-12 z-0  border-b-[#8F6D4C] border-[#E3BF84] border rounded-lg bg-[linear-gradient(0deg,_#150c0E_15%,_#26181B_15%,_#26181B_25%,_#150c0E_25%,_#150c0E_40%,_#26181B_40%,_#26181B_50%,_#150c0E_50%,_#150c0E_65%,_#26181B_65%,_#26181B_75%,_#150c0E_75%,_#150c0E_90%,_#26181B_90%,_#26181B)] bg-[length:12px_12px]"></div>
                        <div className="absolute top-1 bottom-1 left-1 right-1 transform -skew-x-12 z-0 border border-[#b8b48fa2] rounded-md"></div>
                        <span className="relative z-10 text-lg text-[#FEE0B8] flex items-center justify-start pr-20">
                            <FaUser className="mx-2 font-bold" />
                            <span className={`${naishoMoji.className}`} style={{ background: 'linear-gradient(to top, #D6A169 50%, #FEE0B8 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                マイページ
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
