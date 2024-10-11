"use client"

import React, { useState } from 'react';
import { limelight } from "@/utils/font"
import '@/style/MenuRibbon.scss';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';

// 開閉状態を管理するatomを作成
export const menuOpenedAtom = atom<boolean>(false);

const MenuRibbon = () => {
    const [opened, setOpened] = useAtom(menuOpenedAtom);

    return (
        <div className="Ribbon h-20">
            <span className="Ribbon-inner">
                <div className='flex flex-col items-center justify-center'>
                    <div
                        className={classNames(`tham tham-e-squeeze tham-w-9`, { 'tham-active': opened })}
                        onClick={() => setOpened(!opened)}
                    >
                        <div className="tham-box">
                            <div className="bg-[#E3BF84] tham-inner" />
                        </div>
                    </div>
                    <p className={`mt-2 ${limelight.className}`}>MENU</p>
                </div>
            </span>
        </div>
    );
};

export default MenuRibbon;
