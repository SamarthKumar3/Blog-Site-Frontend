"use client";
import React, { useState, useEffect, useRef } from 'react';

import { GET } from '@/api/Blog/allBlogs/route';
import Link from 'next/link';
import Header from '@/Components/header';

import SearchIcon from '@mui/icons-material/Search';
import Search from '@/Utils/Search';


const Page = () => {

  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState('');


  const ref = useRef();
  const searchRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && !searchRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <SearchIcon className='absolute left-4' />
            <Search search={search} setSearch={setSearch} isOpen={isOpen} setIsOpen={setIsOpen} ref={ref} searchRef={searchRef} blogs={blogs} />
          </div>
        </div>


        <div className='flex flex-row gap-x-12'>
          {blogs?.map((blog, index) => (
            <Link href={`/blog/${blog._id}`} key={blog._id}>
              <div className='flex border flex-col border-black p-5 gap-y-5 w-[200px] h-[200px] justify-between ' >
                <h1 className='text-center text-3xl'>{blog.title}</h1>
                <p className='text-justify line-clamp-3 overflow-hidden' >{blog.content}</p>
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
