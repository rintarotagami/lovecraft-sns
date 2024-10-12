import React from 'react'
import NavList from '@/components/SideMenu/NavList/NavList'
import Link from 'next/link'
import EditProfileSheet from '../EditProfileSheet/EditProfileSheet'
import Image from 'next/image'

const SideMenu = () => {
  return (
    <div className='bg-[#020101] border-r-2 border-[#D6A169] text-white w-56 h-full pt-8'>
      <Link href='/'>
        <div className='pl-4'>
          <Image
            src="/assets/img/LoveCraft_logo.png"
            alt="LoveCraft タイトル"
            width={110}
            height={200}
            className="drop-shadow-2xl"
          />
        </div>
      </Link>
      <NavList />
      <EditProfileSheet />
    </div>
  )
}

export default SideMenu
