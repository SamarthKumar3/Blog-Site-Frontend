import React from 'react';

import { GET } from '@/app/api/allBlogs/route';
import Link from 'next/link';


const Page = async () => {
  const data = await GET();


  return (
    <div className='flex flex-col p-10 gap-y-12'>
      <h1 className='text-7xl text-center'>Blogs</h1>
      <div className='flex flex-row gap-x-12'>
        {data.map((blog, index) => (
          <Link href={`/blog/${blog._id}`} key={blog._id}>
            <div className='flex border flex-col border-black p-5 gap-y-5 w-[200px] h-[200px] justify-between ' >
              <h1 className='text-center text-3xl'>{blog.title}</h1>
              <p className='text-justify line-clamp-3 overflow-hidden' >{blog.content}</p>
            </div>
              <footer className='text-sm' >By {blog.creator}</footer>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page
