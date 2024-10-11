"use client"
import { naishoMoji, limelight } from "@/utils/font"

import React from 'react';
import { useAtom } from 'jotai';
import { menuOpenedAtom } from "@/components/MenuRibbon/MenuRibbon";

const NavMenu = () => {
    const [opened] = useAtom(menuOpenedAtom);

    if (!opened) return null;

    return (
        <div className='fixed top-0 w-full h-screen z-50 bg-[#150c0E]/90 flex justify-center items-center'>
            <div className="overflow-hidden w-5/6 h-5/6">
                <div className="relative w-full h-full border-2 border-yellow-600  text-yellow-600 font-semibold text-center bg-[#3F0C1B]">
                    <div className="absolute top-[-12px] left-[-12px] w-5 h-5 bg-black border-2 border-yellow-600 rounded-full"></div>
                    <div className="absolute top-[-12px] right-[-12px] w-5 h-5 bg-black border-2 border-yellow-600 rounded-full"></div>

                    <div className="absolute bottom-[-12px] left-[-12px] w-5 h-5 bg-black border-2 border-yellow-600 rounded-full"></div>
                    <div className="absolute bottom-[-12px] right-[-12px] w-5 h-5 bg-black border-2 border-yellow-600 rounded-full"></div>

                    {/* ここからナビゲーション */}
                    <nav className="flex flex-col space-y-4 mt-8">
                        <a href="#" className="hover:text-yellow-400 border-t border-b border-yellow-600 bg-black/30 py-2">ホーム</a>
                        <a href="#aboutUs" className="hover:text-yellow-400 border-t border-b border-yellow-600 bg-black/30 py-2">LoveCraftとは？</a>
                        <a href="#murderMystery" className="hover:text-yellow-400 border-t border-b border-yellow-600 bg-black/30 py-2">マーダーミステリーとは？</a>
                    </nav>
                    {/* ここまでナビゲーション */}
                </div>
            </div>
        </div>
    );
};

export default NavMenu;

