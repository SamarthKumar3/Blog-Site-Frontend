"use client"
import React, { useState, useContext } from 'react';

import { POST3 } from '@/api/Blog/writeBlog/route';
import { useRouter } from 'next/navigation'
import Button from '@/Utils/Button';
import CancelIcon from '@mui/icons-material/Cancel';
// import ImageUpload from '@/Utils/ImageUpload';
import { AuthContext } from '@/context/auth-context';

const NewBlog = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [file, setFile] = useState(null);

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isField1Incomplete, setField1Incomplete] = useState();
  const [isField2Incomplete, setField2Incomplete] = useState();


  const [tagsInput, setTagsInput] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');

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

  }

  const handleComeback = (e) => {
    if (e.target.name === 'title') {
      setField1Incomplete(false);
    } else if (e.target.name === 'content') {
      setField2Incomplete(false);
    }
  }

  const handleCategory = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newCategories = e.target.value.split(',').map(item => item.trim());
      setCategories((prevCategories) => [...prevCategories, newCategories]);
      setCategoriesInput('');
    }
  }

  const handleRemoveCategory = (index) => {
    setCategories(prevCategories => {
      const updatedCategories = prevCategories.filter((_, idx) => idx !== index);
      return updatedCategories;
    });
  }

  const handleTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newCategories = e.target.value.split(',').map(item => item.trim());
      setTags((prevCategories) => [...prevCategories, newCategories]);
      setTagsInput('');
    }
  }

  const handleRemoveTag = (index) => {
    setTags(prevCategories => {
      const updatedCategories = prevCategories.filter((_, idx) => idx !== index);
      return updatedCategories;
    });
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = new FormData();
    sendData.append('title', formData.title);
    sendData.append('content', formData.content);
    sendData.append('tags', JSON.stringify(tags.flat()));
    sendData.append('categories', JSON.stringify(categories.flat()));
    sendData.append('image', file);

    const res = await POST3(sendData, auth.token);

    if (res.blog) {
      alert("Created!");
      router.push('/blog');
    }
    else {
      alert("Error");
    }
  }


  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col justify-center gap-y-12 py-10 '>
        <h1 className='text-7xl'>Whats on your mind?</h1>
        <div className=''>
          <form onSubmit={(e) => handleSubmit(e)} className='flex justify-center items-center flex-col gap-y-8'>
            <div className='w-full flex flex-col p-8 border-2 border-steel rounded-2xl bg-bgGray'>
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
              <div>
                {/* add tags */}
                <input
                  type='text'
                  className='px-3 py-2 border border-black rounded-md'
                  placeholder='Add tags'
                  onChange={(e) => setTagsInput(e.target.value)}
                  value={tagsInput}
                  onKeyDown={(e) => { handleTag(e) }}
                />
                <div className='flex flex-wrap gap-x-4 mt-2 gap-y-2'>
                  {tags?.map((tag, index) => (
                    <span key={index} index={index} className='px-4 py-2 border border-black text-white bg-darkGray rounded-3xl flex justify-between gap-x-2 items-center'>{tag} <CancelIcon onClick={() => handleRemoveTag(index)} /></span>
                  ))}
                </div>
              </div>
              <br />
              <div>
                {/* add category */}
                <input
                  type='text'
                  className='px-3 py-2 border border-black rounded-md'
                  placeholder='Add categories'
                  onKeyDown={(e) => { handleCategory(e) }}
                  value={categoriesInput}
                  onChange={(e) => setCategoriesInput(e.target.value)}
                />
                <div className='flex flex-wrap gap-x-4 mt-2 gap-y-2'>
                  {categories?.map((category, index) => (
                    <span key={index} index={index} className='px-4 py-2 border border-black text-white bg-darkGray rounded-3xl flex justify-between gap-x-2 items-center'>{category} <CancelIcon onClick={() => handleRemoveCategory(index)} /></span>
                  ))}
                </div>
              </div>
              <br />

              {/* <ImageUpload onInput={inputHandler} /> */}
              <div>
                {/* add image */}
                <input type='file' accept=".jpg,.png,.jpeg" className='px-3 py-2 border border-black rounded-md' onChange={handleFileChange}
                />
              </div>

              <br />
            </div>
            <button type="submit" className='px-5 py-2 border border-black rounded-2xl'>Publish</button>
          </form>
        </div>
        <div>
          <Button href='/' borderColor='black' bgColor='black' color='white' text='Go back home' round='2xl' />
        </div>
      </div>
    </div>
  )
}

export default NewBlog;