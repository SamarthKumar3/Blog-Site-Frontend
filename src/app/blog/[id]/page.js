import React from 'react';
import { capitalize, formatDate, normalizeImageUpload } from '@/Utils/Misc';
import Navbar from '@/Components/header';
import Image from 'next/image';
import { cardo } from '@/fonts/fonts';
import Likes from '@/Utils/Likes';
import Comments from '@/Components/Comments';

export const revalidate = 60; 
export const dynamicParams = true;
export async function generateStaticParams() {
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/blog/all-blogs`).then((res) =>
    res.json()
  )
  return blogs.blogs.map((blog) => ({
    id: String(blog.id),
  }))
}


export default async function IdBlog({ params }) {
  const { id } = await params
  const blog = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/blog/all-blogs/${id}`).then((res) =>
    res.json()
  )

  return (
    <>
      <Navbar />
      <div className='flex flex-col p-10 px-16 gap-y-12'>

        <div className='flex flex-col justify-center gap-y-5'>

          <div className='flex flex-row gap-x-4 mb-4 justify-center'>
            {blog.categories.map((category, index) => (
              <span key={index} className='border border-red-300 px-3 py-1 rounded-md'>{category}</span>
            ))}
          </div>

          <div className=' px-32 flex flex-col gap-y-8 mb-6'>
            <h1 className={`text-left text-7xl font-[600]`}>{`${capitalize(blog.title)}`}</h1>
            <div className='flex flex-row gap-x-2 relative'>
              <Likes id={blog._id} creator={blog.creator} likes={blog.likes} />
              <div className='flex flex-col gap-y-1'>
                <h3 className='text-sm italic'>{`Published  ${formatDate(blog.createdAt)}`}</h3>
                <h3 className='text-sm italic'>{`Updated ${formatDate(blog.updatedAt)}`}</h3>
              </div>
            </div>
            <div>
              <footer className='text-sm font-[600]' >{blog.creatorName.toUpperCase()}</footer>
            </div>
          </div>

          <div className='flex flex-col gap-y-12 w-full'>
            <div>
              <Image src={`${process.env.NEXT_PUBLIC_backend_url}${normalizeImageUpload(blog.image)}`} alt={blog.title} height={500} width={500} className='w-full h-full object-cover' />
            </div>
            <p className={`text-lg leading-9 ${cardo.className} leading-loose`}>{blog.content}</p>
          </div>

          <div className='flex flex-row gap-x-2 justify-start pt-4'>
            {blog.tags.map((tag, index) => (
              <span key={index} className='bg-gray-800 text-white px-4 py-2 rounded-3xl'>{tag}</span>
            ))}
          </div>


          {/* <button className='border border-red-300 px-3 py-2 rounded-md' onClick={handleDelete}>Delete</button> */}
          <Comments blogComments={blog.comments} blogId={blog._id} blogUser={blog.creator}/>
        </div>
      </div>
    </>
  );
};
