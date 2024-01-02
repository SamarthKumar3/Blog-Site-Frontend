import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex flex-row justify-center items-center gap-x-5 p-4 fixed top-0 w-full bg-white z-10'>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <input placeholder='Search for a blog' className='p-2 border rounded-2xl' />
      <Link href='/blog' >Posts</Link>
      <button>Sign Up/Login</button>
      <Link href='/new-blog'>Write</Link>
    </div>
  )
}

export default Header