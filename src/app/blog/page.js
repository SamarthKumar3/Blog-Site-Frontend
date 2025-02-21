import React from 'react';
import Header from '@/Components/header';
import { normalizeImageUpload, formatDate } from '@/Utils/Misc';
import Link from 'next/link';
import Search from '@/Utils/Search';
import Image from 'next/image';

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/blog/all-blogs`, {
    next: {
      revalidate: 3600,
    }
  })
  const data = await res.json();
  return data.blogs
}

export default async function Page() {
  const data = await getBlogs();

  return (
    <>
      <Header />
      <div className='flex flex-col p-10 gap-y-12'>
        <div className='flex items-start justify-between'>
          <div className='mb-8'>
            <h1 className='text-6xl font-bold mb-6'>Blogs</h1>
            <h3>Discover what others are talking about</h3>
          </div>
          <div className='relative flex items-center gap-x-2'>
            <Search blogs={data} />
          </div>
        </div>


        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
          {data?.map((blog) => (
            <div key={blog.id} className='block'>
              <Link href={`/blog/${blog.id}`} className='p-4 transition transform group-hover:scale-105 group-hover:shadow-xl w-80'>
                <div>
                  <div className='aspect-w-16 aspect-h-9'>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_backend_url}${normalizeImageUpload(blog.image)}`}
                      alt={blog.title}
                      className='w-full h-full object-cover  mb-4'
                      height={500}
                      width={500}
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
