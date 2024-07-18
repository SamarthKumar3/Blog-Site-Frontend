import Link from 'next/link';
import React from 'react';
import Button from '@/Utils/Button';
function Header() {

  return (
    <div className='flex justify-around items-center p-4 sticky top-0 w-full z-10'>
      <div className='flex justify-center items-center gap-x-12'>
        <div><h1>BloggED</h1></div>
        
      </div>
      <div className='flex justify-center items-center gap-x-12'>
        <div>
          <Link href='/'>Home</Link>
        </div>
        <Link href='/blog' >Posts</Link>
        <Link href='/new-blog'>Write</Link>
        <div className='border-r-2 border-lightGray h-6'></div>
        <Button href='/auth' padding='4' borderColor='lightGray' bgColor='black' color='white' text='Login' round='3xl' />
      </div>
    </div>
  )
}

export default Header;