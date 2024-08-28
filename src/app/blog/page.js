"use client";
import React, { useState, useEffect, useRef } from 'react';

import Header from '@/Components/header';
import { GET } from '@/api/Blog/allBlogs/route';
import { normalizeImageUpload } from '@/Utils/Misc';
import Link from 'next/link';
import Search from '@/Utils/Search';

import SearchIcon from '@mui/icons-material/Search';

const Page = () => {
  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await GET();
      setBlogs(response);
    }
    fetchBlogs();
  }, [search]);

  return (
    <>
      <Header />
      <div className='flex flex-col p-10 gap-y-12' >
        <div className='flex items-center'>
          <h1 className='text-7xl mx-auto'>Blogs</h1>
          <div className='relative flex items-center gap-x-4 '>
            <SearchIcon className='icon' />
            <Search search={search} setSearch={setSearch} blogs={blogs} className={``} />
          </div>
        </div>

        <div className='w-full flex-row gap-x-4 gap-y-5 flex'>
          {blogs?.map((blog, index) => (
            <Link href={`/blog/${blog.id}`} key={blog.id} className=''>
              <div className='flex border flex-col border-black p-5 justify-between  gap-y-2' >
                <img src={`http://localhost:5000${normalizeImageUpload(blog.image)}`} alt={blog.title} className='w-full h-full' />
                <h1 className='text-xl font-[600] text-left'>{blog.title}</h1>
              </div>
              <footer className='text-sm' >By {blog.creatorName}</footer>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Page
