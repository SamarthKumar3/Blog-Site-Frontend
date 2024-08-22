"use client"
import React, { useEffect, useState } from 'react'

import { GET } from '@/api/Blog/idBlog/route';
import { DELETE } from '@/api/Blog/deleteBlog/route';
import { postComment } from '@/api/Blog/postComment/route';
import { updateLikes } from '@/api/Blog/updateLikes/route';
import { DeleteComment } from '@/api/Blog/deleteComment/route';

import { notFound, redirect } from 'next/navigation'
import { useRouter } from 'next/router';

import { capitalize, formatDate } from '@/utils/Misc';
import Navbar from '@/Components/header';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { cardo } from '@/fonts/fonts';
import Image from 'next/image';

const IdBlog = ({ params }) => {
  const [getblogId, setGetBlog] = useState();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    authorName: '',
    comment: ''
  });

  const [likes, setLikes] = useState(0);
  const blogId = params.id;

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await GET(blogId);
        setGetBlog(blog);
        setComments(blog.comments);
      } catch (error) {
        console.error('Error fetching blog:', error);
        notFound();
      }
    };

    getBlog();
  }, [blogId]);

  const handleLikes = async (blogId, userId) => {
    const res = await updateLikes({ blogId, userId });
    if (res) {
      setLikes(res.likes);
    }
    if (res.likedMessage) {
      //add user interaction for indicating already liked post 
      setLikes(res.likes);
      alert(res.likedMessage);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    const { authorName: commentAuthor, comment: commentContent } = newComment;
    const res = await postComment({ blogId, commentAuthor, commentContent });
    setComments(res.comments);
    setNewComment({
      authorName: '',
      comment: ''
    });
    console.log(res);
  };

  const handleCommentDeletion = async (commentId) => {
    if (getblogId) {
      const res = await DeleteComment({ commentId, blogId });
      if (res) {
        setComments(comments.filter(comment => comment._id !== commentId));
        alert(res.Success);
      } else {
        console.log('Error deleting comment');
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prevState => ({
      ...prevState,
      [name]: value
    }));
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

  return (
    <>
      <Navbar />
      <div className='flex flex-col p-10 px-16 gap-y-12'>
        {!getblogId ?
          (<h1>Loading</h1>) :
          <div className='flex flex-col justify-center gap-y-5'>

            {/* tags */}
            <div className='flex flex-row gap-x-4 mb-4 justify-center'>
              {getblogId.categories.map((category, index) => (
                <span key={index} className='border border-red-300 px-3 py-1 rounded-md'>{category}</span>
              ))}
            </div>

            <div className=' px-32 flex flex-col gap-y-8 mb-6'>
              <h1 className={`text-left text-7xl font-[600]`}>{`${capitalize(getblogId.title)}`}</h1>
              <div className='flex flex-row gap-x-2 relative'>
                <div className='absolute bottom-0 right-0 flex flex-col items-center'>
                  <button onClick={() => handleLikes(getblogId._id, getblogId.creator)}>
                    <FavoriteIcon className='text-red-500' />
                  </button>
                  <p>{getblogId?.likes}</p>
                </div>
                <h3 className='text-md italic'>{`${formatDate(getblogId.createdAt)}`}</h3>
              </div>
            </div>

            <div className='flex flex-col gap-y-12 w-full'>
              <div>
                <Image src={`${getblogId.image}`} alt={getblogId.title} height={500} width={500} className='w-full h-full object-cover' />
              </div>
              <p className={`text-lg leading-9 ${cardo.className} leading-loose`}>{getblogId.content}</p>
            </div>

            <div className='flex flex-row gap-x-2 justify-start pt-4'>
              {getblogId.tags.map((tag, index) => (
                <span key={index} className='bg-gray-800 text-white px-4 py-2 rounded-3xl'>{tag}</span>
              ))}
            </div>

            <div>
              <footer className='text-sm italic' >By {getblogId.creator}</footer>
            </div>
            {/* <button className='border border-red-300 px-3 py-2 rounded-md' onClick={handleDelete}>Delete</button> */}

            {/* comments */}
            <div className='flex flex-col gap-y-4'>
              <h3 className='text-lg'>Comments</h3>
              <div className='flex flex-col gap-y-4 border rounded-lg p-2'>
                {comments?.length === 0 ? <p>No comments yet</p> :

                  comments.map((comment, index) => (
                    <div key={index} className='flex flex-col gap-y-2'>
                      <h5 className='text-sm italic'>{comment.name}</h5>
                      <p className=''>{comment.comment}</p>
                      <button className='w-fit flex p-2 border border-red-300 rounded-lg' onClick={() => handleCommentDeletion(comment._id)}>Delete</button>
                    </div>
                  ))}
              </div>
              <form className='flex flex-col gap-y-4 w-1/5 mt-8' onSubmit={(e) => handlePostComment(e)}>
                <textarea
                  className='p-2 border rounded-xl resize-y bg-gray-100'
                  placeholder='Leave a comment'
                  value={newComment.comment}
                  onChange={handleInputChange}
                  name='comment'
                />
                <input
                  className='p-2 border rounded-xl bg-gray-100'
                  placeholder='Your name'
                  value={newComment.authorName}
                  onChange={handleInputChange}
                  name='authorName'
                />
                <button className='border w-1/2 border-red-300 px-3 py-2 rounded-md' type='submit'>Post Comment</button>
              </form>
            </div>
          </div>
        }

      </div>
    </>

  )
}

export default IdBlog;