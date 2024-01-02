"use client"
import Link from 'next/link';
import React, { useState } from 'react';

import { POST } from '@/app/api/writeBlog/route';
import { redirect } from 'next/navigation';

const NewBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  })

  const [isField1Incomplete, setField1Incomplete] = useState();
  const [isField2Incomplete, setField2Incomplete] = useState();
  const [isField3Incomplete, setField3Incomplete] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleIncompleteValue = (e) => {
    if (e.target.name === 'title' && e.target.value === '') {
      setField1Incomplete(true);
    }
    else if (e.target.name === 'content' && e.target.value === '') {
      setField2Incomplete(true);
    }
    else if (e.target.name === 'author' && e.target.value === '') {
      setField3Incomplete(true);
    }
  }

  const handleComeback = (e) => {
    if (e.target.name === 'title') {
      setField1Incomplete(false);
    } else if (e.target.name === 'content') {
      setField2Incomplete(false);
    } else if (e.target.name === 'author') {
      setField3Incomplete(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await POST({
      title: formData.title,
      content: formData.content,
      author: formData.author,
    });

    if (res.title || res.creator || res.content) {
      alert("Created!");
      redirect('/');
    }
  }

  return (
    <div className='flex flex-col  items-center'>
      <div className='flex flex-col justify-center gap-y-12 py-10 '>
        <h1 className='text-7xl'>Whats on your mind?</h1>
        <div>
          <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
              value={formData.title}
              className='border border-black rounded-md px-3 py-2'
              placeholder='Title of Blog'
              onBlur={handleIncompleteValue}
              onFocus={handleComeback}
            />
            {isField1Incomplete ? <p className='text-red-500'>Please enter some value</p> : ''}

            <br />

            <textarea name="content"
              onChange={handleInputChange}
              value={formData.content}
              rows={5}
              cols={50}
              className='p-5 border border-black rounded-md w-full'
              placeholder='Write something...'
              onBlur={handleIncompleteValue}
              onFocus={handleComeback}
            >
            </textarea>
            {isField2Incomplete ? <p className='text-red-500'>Please enter some value</p> : ''}

            <br />

            <input
              type='text'
              name='author'
              onChange={handleInputChange}
              value={formData.author}
              className='px-3 py-2 border border-black rounded-md'
              placeholder='Your name'
              onBlur={handleIncompleteValue}
              onFocus={handleComeback}
            />
            {isField3Incomplete ? <p className='text-red-500'>Please enter some value</p> : ''}

            <br />
            <button type="submit" className='px-5 py-2 border border-black rounded-2xl'>Submit</button>
          </form>
        </div>
        <div>
          <Link href='/' className='px-5 py-2 border border-black rounded-2xl m-auto'>Go back home</Link>
        </div>
      </div>
    </div>
  )
}

export default NewBlog