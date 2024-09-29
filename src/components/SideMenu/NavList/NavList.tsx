import React from 'react'
import { FaHome, FaBell } from 'react-icons/fa'
import { FaEnvelope } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import NavItem from './NavItem/NavItem'

interface NavItemType {
    id: number
    label: string
    link: string
    icon: React.ReactNode
}

const NavList = () => {
    const navList: NavItemType[] = [
        { id: 1, label: 'セッション', link: '/session', icon: <FaEnvelope className='size-5' /> },
        { id: 2, label: 'ホーム', link: '/home', icon: <FaHome className='size-5' /> },
        { id: 3, label: 'コミュニティ', link: '/community', icon: <HiUserGroup className='size-5' /> },
        { id: 4, label: 'チャット', link: '/chat', icon: <IoChatbubbleEllipsesSharp className='size-5' /> },
        { id: 5, label: '通知', link: '/notification', icon: <FaBell className='size-5' /> },
    ]
    return (
        <div className='mt-24'>
            {navList.map((item) => (
                <NavItem key={item.id} label={item.label} link={item.link} icon={item.icon} />
            ))}
        </div>
    )
}

export default NavList
