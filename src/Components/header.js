"use client";
import Link from 'next/link';
import React, { useContext } from 'react';
import Button from '@/Utils/Button';
import { AuthContext } from '@/context/auth-context';

function Header() {

  const auth = useContext(AuthContext);

  return (
    <div className='flex justify-around items-center p-4 sticky top-0 w-full z-10 font-[600]'>
      <div className='flex justify-center items-center gap-x-12'>
        <div><h1>BloggED</h1></div>
      </div>
      <div className='flex justify-center items-center gap-x-12 '>
        <div>
          <Link href='/'>Home</Link>
        </div>
        <Link href='/blog' >Posts</Link>
        {auth.isLoggedIn && <>
          <Link href='/new-blog'>Write</Link>
          <Link href='/profile'>Profile</Link>
        </>
        }
        <div className='border-r-2 border-lightGray h-6'></div>
        {!auth.isLoggedIn && <Button href='/auth' padding='4' borderColor='lightGray' bgColor='black' color='white' text="Login" round='3xl' />}
        {auth.isLoggedIn && <button className='flex justify-center w-full text-black px-6 py-2 border rounded-3xl'
        onClick={auth.logout}>Logout</button>}
      </div>
    </div>
  )
}

export default Header;