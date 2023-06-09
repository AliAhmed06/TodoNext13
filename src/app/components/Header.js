import Link from 'next/link'
import React from 'react'
import { LogoutButton } from './Clients'

function Header() {
  return (
    <div className='flex items-center justify-between px-10 bg-black text-white'>
        <h2 className='font-bold text-xl'>Todo</h2>
        <div>
            <Link href="/" className='uppercase py-3 px-5 inline-block hover:bg-white hover:text-black'>Home</Link>
            <Link href="/about" className='uppercase py-3 px-5 inline-block hover:bg-white hover:text-black'>About</Link>            
            <LogoutButton />
        </div>
    </div>
  )
}

export default Header