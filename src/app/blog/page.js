"use client";
import React, { useState, useEffect, useRef } from 'react';

import { GET } from '@/api/Blog/allBlogs/route';
import Link from 'next/link';
import Header from '@/Components/header';

import SearchIcon from '@mui/icons-material/Search';
import Search from '@/Utils/Search';

import { cardo } from '@/fonts/fonts';

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
      <div className='flex flex-col p-10 gap-y-12'>
        <div className='flex items-center'>
          <h1 className='text-7xl mx-auto'>Blogs</h1>
          <div className='relative flex items-center gap-x-4'>
            <SearchIcon className='absolute left-4 z-10' />
            <Search search={search} setSearch={setSearch} blogs={blogs} />
          </div>
        </div>

        <div className='flex flex-row gap-x-12'>
          {blogs?.map((blog, index) => (
            <Link href={`/blog/${blog._id}`} key={blog._id}>
              <div className='flex border flex-col border-black p-5 gap-y-5 w-[200px] h-[200px] justify-between ' >
                <h1 className='text-center text-3xl'>{blog.title}</h1>
                <p className={`text-justify line-clamp-3 overflow-hidden ${cardo.className}`} >{blog.content}</p>
              </div>
              {/* <footer className='text-sm' >By {blog.creator}</footer> */}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Page
