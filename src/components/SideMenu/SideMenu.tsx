import React from 'react'
import NavList from '@/components/SideMenu/NavList/NavList'
import Link from 'next/link'
import EditProfileSheet from '../EditProfileSheet/EditProfileSheet'

const SideMenu = () => {
  return (
    <div className='bg-gray-800 text-white w-56 pt-8'>
      <Link href='/'>
        <h1 className='text-2xl font-bold px-4'>LoveCraftSNS</h1>
      </Link>
      <NavList />
      <EditProfileSheet/>
    </div>
  )
}

export default SideMenu
