'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItemProps {
    label: string
    link: string
    icon: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({
    label, link, icon
}) => {
    const pathname = usePathname()

    return (
        <Link href={link} className={`flex flex-col p-4 items-center justify-center w-fit hover:bg-gray-700 font-medium 
        ${pathname === link ? 'block bg-gray-600 border-b-4 border-[#ffba52]' : ''}`}>
            {icon}
            <div className='block w-fit'>{label}</div>
        </Link>
    )
}

export default NavItem
