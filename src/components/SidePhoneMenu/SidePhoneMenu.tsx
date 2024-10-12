import React from 'react'
import NavList from './NavList/NavList'
import Link from 'next/link'
import EditProfileSheet from '../EditProfileSheet/EditProfileSheet'
import Image from 'next/image'

const SidePhoneMenu = () => {
  return (
    <div className='flex bg-[#020101] border-t-2 border-[#D6A169] text-white w-full h-full px-4 pb-10'>
      <NavList />
    </div>
  )
}

export default SidePhoneMenu
