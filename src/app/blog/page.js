"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/Components/header';
import { GET } from '@/api/Blog/allBlogs/route';
import { normalizeImageUpload, formatDate } from '@/Utils/Misc';
import Link from 'next/link';
import Search from '@/Utils/Search';

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await GET();
      setBlogs(response);
    };
    fetchBlogs();
  }, [search]);

  return (
    <>
      <Header />
      <div className='flex flex-col p-10 gap-y-12'>
        <div className='flex items-start justify-between'>
          <h1 className='text-6xl font-bold mb-8'>Blogs</h1>
          <div className='relative flex items-center gap-x-2'>
            
            <Search search={search} setSearch={setSearch} blogs={blogs} />
          </div>
        </div>


        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
          {blogs?.map((blog) => (
            <div key={blog.id} className='block'>
              <Link href={`/blog/${blog.id}`} className='p-4 transition transform group-hover:scale-105 group-hover:shadow-xl w-80'>
                <div>
                  <div className='aspect-w-16 aspect-h-9'>
                    <img
                      src={`http://localhost:5000${normalizeImageUpload(blog.image)}`}
                      alt={blog.title}
                      className='w-full h-full object-cover  mb-4'
                    />
                  </div>
                  <h1 className='text-lg font-semibold mb-2  transition-colors'>
                    {blog.title}
                  </h1>
                </div>
                <footer className='text-sm text-gray-500 '>
                  {formatDate(blog.createdAt)} |  {blog.creatorName}
                </footer>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
