"use client"
import React, { useEffect, useState } from 'react'

import { GET } from '@/app/api/idBlog/route';
import { DELETE } from '@/app/api/deleteBlog/route';
import { notFound, redirect } from 'next/navigation'

const IdBlog = ({ params }) => {
  const [getblogId, setGetBlog] = useState();
  const [isBlog, setIsBlog] = useState(false);

  const blogId = params.id;

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await GET(blogId);
        setGetBlog(blog);
        setIsBlog(true);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setIsBlog(true);
      }
    };

    getBlog();
  }, [blogId]);



  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await DELETE(blogId);
    alert(res.message);
    if (res.message) {
      redirect('/')
    }
  }


  return (
    <div className='flex flex-col p-10 gap-y-12'>
      {!isBlog ?
        (<h1>Loading</h1>) :
        (
          getblogId ? (
            <div key={getblogId._id} className='flex flex-col justify-center items-center gap-y-5'>
              <div className='py-20 px-40 flex flex-col gap-y-12 bg-slate-200 border border-slate-700 rounded-xl'>
                <h1 className='text-center text-3xl'>{getblogId.title}</h1>
                <p className='text-justify'>{getblogId.content}</p>
                <footer className='text-sm'>By {getblogId.creator}</footer>
              </div>
              <button className='border border-red-300 px-3 py-2 rounded-md' onClick={handleDelete}>Delete</button>
            </div>
          )
            :
            notFound()
        )
      }

    </div>
  )
}

export default IdBlog;