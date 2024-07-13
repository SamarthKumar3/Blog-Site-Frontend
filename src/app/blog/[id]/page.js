"use client"
import React, { useEffect, useState } from 'react'

import { GET } from '@/api/Blog/idBlog/route';
import { DELETE } from '@/api/Blog/deleteBlog/route';
import { postComment } from '@/api/Blog/postComment/route';
import { updateLikes } from '@/api/Blog/updateLikes/route';

import { notFound, redirect } from 'next/navigation'
import { useRouter } from 'next/router';

import { capitalize, formatDate } from '@/utils/Misc';
import Navbar from '@/Components/header';
import FavoriteIcon from '@mui/icons-material/Favorite';

const IdBlog = ({ params }) => {
  const [getblogId, setGetBlog] = useState();
  const [isBlog, setIsBlog] = useState(false);

  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const [likes, setLikes] = useState(0);
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


  const handleLikes = async (blogId) => {
    //send PATCH request to update likes
    const res = await updateLikes(blogId);
    // if (res.message) {
    //   alert("Liked successfully");
    // } else {
    //   alert('Error liking blog');
    // }
    if(res){
      setLikes(res.likes);
    }
    console.log(res);
  };

  const handlePostComment = async (e) => {
    //send POST request to post comment
    e.preventDefault();

    const res = await postComment({blogId, commentAuthor, commentContent});
    // if(res.message){
    //   alert("Posted comment successfully");
    // } else{
    //   alert('Error posting comment');
    // }
    console.log(res);
  };



  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await DELETE(blogId);
    alert(res.message);
    const router = useRouter();
    router.push('/');
    if (res.message) {
      redirect('/')
    }
  }

  {/* top part contains tags, h1 heading, Oprional- Sub-heading, Date, Image, Description */ }
  return (
    <>
      <Navbar />
      <div className='flex flex-col p-10 gap-y-12'>
        {!isBlog ?
          (<h1>Loading</h1>) :

          (
            getblogId ? (
              <div key={getblogId._id} className='flex flex-col justify-center gap-y-5'>
                {/* tags */}
                <div className='flex flex-row gap-x-4 mb-4 justify-center'>
                  {getblogId.categories.map((category, index) => (
                    <span key={index} className='border border-red-300 px-3 py-1 rounded-md'>{category}</span>
                  ))}
                </div>
                <div className=' px-32 flex flex-col gap-y-12 '>
                  <h1 className='text-left text-7xl'>{`${capitalize(getblogId.title)}`}</h1>

                  <div className='flex flex-row gap-x-2 relative'>
                    <div className='absolute bottom-0 right-0 flex flex-col items-center'>
                      <button onClick={() => handleLikes(getblogId._id)}>
                        <FavoriteIcon className='text-red-500' />
                      </button>
                      <p>{likes}</p>
                    </div>
                    <h3 className='text-md'>{`${formatDate(getblogId.createdAt)}`}</h3>
                  </div>
                </div>
                <div className='flex flex-col gap-y-4 w-full'>
                  <div>
                    <img src={getblogId.image} alt={getblogId.title} className='w-full h-full object-cover' />
                  </div>
                  <p className='text-justify text-lg'>{getblogId.content}</p>
                </div>
                <div className='flex flex-row gap-x-2 justify-start'>
                  {getblogId.tags.map((tag, index) => (
                    <span key={index} className='bg-gray-800 text-white px-4 py-2 rounded-3xl'>{tag}</span>
                  ))}
                </div>
                <div>
                  <footer className='text-sm' >By {getblogId.creator}</footer>
                </div>
                {/* <button className='border border-red-300 px-3 py-2 rounded-md' onClick={handleDelete}>Delete</button> */}
                <div className='flex flex-col gap-y-4'>
                  <h3 className='text-lg'>Comments</h3>
                  <div className='flex flex-col gap-y-4'>
                    {getblogId.comments.map((comment, index) => (
                      <div key={index} className='flex flex-col gap-y-2'>
                        <h3>{comment.name}</h3>
                        <p>{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                  <form className='flex flex-col gap-y-4 w-1/5' onSubmit={(e)=>handlePostComment(e)}>
                    <textarea
                      className='p-2 border rounded-xl resize-y'
                      placeholder='Leave a comment'
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <input
                      className='p-2 border rounded-xl '
                      placeholder='Your name'
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                    />
                    <button className='border w-1/2 border-red-300 px-3 py-2 rounded-md'>Post Comment</button>
                  </form>
                </div>
              </div>


            )
              :
              notFound()
          )
        }

      </div>
    </>

  )
}

export default IdBlog;