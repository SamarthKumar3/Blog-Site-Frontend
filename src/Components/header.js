'use client';
import Link from 'next/link';
import { GET } from '@/api/Blog/allBlogs/route';
import React, { useState, useEffect, useRef } from 'react';
import { capitalize, highlightText } from '@/Utils/Misc';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@/Utils/Button';

function Header() {

  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState('');

  const [isOpen, setIsOpen] = useState(false); 
  const ref = useRef();
  const searchRef = useRef();

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
    <div className='flex justify-around items-center p-4 sticky top-0 w-full z-10'>
      <div className='flex justify-center items-center gap-x-12'>
        <div><h1>BloggED</h1></div>
        <div className='relative flex items-center gap-x-4'>
          <SearchIcon className='absolute left-4' />
          <input
            className='pl-10 py-3 border rounded-3xl'
            type='text'
            placeholder='Search for a blog'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            ref={searchRef}
            onClick={() => setIsOpen(true)}
          />
          {search && (
            isOpen && (
              <div ref={ref} className='absolute top-14 w-72 h-72 bg-white shadow-lg rounded-xl overflow-y-auto'>
                {blogs?.filter((blog) => blog.title.includes(capitalize(search))).map((blog) => (
                  <div key={blog.id} className='p-4 border-b z-10'>
                    <Link href={`/blog/${blog.id}`}>
                      <p>{highlightText(blog.title, search)}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
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