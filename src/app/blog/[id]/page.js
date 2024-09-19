// "use client"
// import React, { useEffect, useState, useContext } from 'react'

// import { GET } from '@/api/Blog/idBlog/route';
// import { DELETE } from '@/api/Blog/deleteBlog/route';
// import { postComment } from '@/api/Blog/postComment/route';
// import { updateLikes } from '@/api/Blog/updateLikes/route';
// import { DeleteComment } from '@/api/Blog/deleteComment/route';
// import { AuthContext } from '@/context/auth-context';

// import { notFound, useRouter } from 'next/navigation'

// import { capitalize, formatDate, normalizeImageUpload } from '@/utils/Misc';
// import Navbar from '@/Components/header';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { cardo } from '@/fonts/fonts';
// import Image from 'next/image';

// const IdBlog = ({ params }) => {
//   const auth = useContext(AuthContext);
//   const router = useRouter();

//   const loggedIn = auth.isLoggedIn;

//   const [getblogId, setGetBlog] = useState();

//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   const [likes, setLikes] = useState(0);
//   const blogId = params.id;

//   useEffect(() => {
//     const getBlog = async () => {
//       try {
//         const blog = await GET(blogId);
//         setGetBlog(blog);
//         setComments(blog.comments);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         notFound();
//       }
//     };
//     getBlog();
//   }, [blogId]);

//   const handleLikes = async (blogId, userId) => {
//     if (!loggedIn) {
//       alert('Please login to like a post');
//       router.push('/auth');
//       return;
//     }
//     const res = await updateLikes({ blogId, userId, token: auth.token });
//     if (res) {
//       setLikes(res.likes);
//     }
//     if (res.likedMessage) {
//       //add user interaction for indicating already liked post 
//       setLikes(res.likes);
//       alert(res.likedMessage);
//     }
//   };

//   const handlePostComment = async (e) => {
//     if (!loggedIn) {
//       alert('Please login to comment');
//       router.push('/auth');
//       return;
//     }
//     if (newComment.comment === '') {
//       alert('Please fill in all fields');
//       return;
//     }

//     e.preventDefault();
//     const user = auth.userId;
//     const res = await postComment({ blogId, user, newComment });
//     setComments(res.comments);
//     setNewComment('');
//     console.log(res);
//   };

// const handleCommentDeletion = async (commentId) => {
//   if (getblogId) {
//     const res = await DeleteComment({ commentId, blogId });
//     if (res) {
//       setComments(comments.filter(comment => comment._id !== commentId));
//       alert(res.Success);
//     } else {
//       console.log('Error deleting comment');
//     }
//   }
// }

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     const res = await DELETE(blogId);
//     alert(res.message);
//     const router = useRouter();
//     router.push('/');
//     if (res.message) {
//       redirect('/')
//     }
//   }

//   return (
// <>
//   <Navbar />
//   <div className='flex flex-col p-10 px-16 gap-y-12'>
//     {getblogId ?
//       <div className='flex flex-col justify-center gap-y-5'>

//         {/* tags */}
//         <div className='flex flex-row gap-x-4 mb-4 justify-center'>
//           {getblogId.categories.map((category, index) => (
//             <span key={index} className='border border-red-300 px-3 py-1 rounded-md'>{category}</span>
//           ))}
//         </div>

//         <div className=' px-32 flex flex-col gap-y-8 mb-6'>
//           <h1 className={`text-left text-7xl font-[600]`}>{`${capitalize(getblogId.title)}`}</h1>
//           <div className='flex flex-row gap-x-2 relative'>
//             <div className='absolute bottom-0 right-0 flex flex-col items-center'>
//               <button onClick={() => handleLikes(getblogId._id, getblogId.creator)}>
//                 <FavoriteIcon className='text-red-500' />
//               </button>
//               <p>{getblogId?.likes}</p>
//             </div>
//             <div className='flex flex-col gap-y-1'>
//               <h3 className='text-md italic'>{`Published  ${formatDate(getblogId.createdAt)}`}</h3>
//               <h3 className='text-md italic'>{`Updated ${formatDate(getblogId.updatedAt)}`}</h3>
//             </div>
//           </div>
//           <div>
//             <footer className='text-sm font-[600]' >{getblogId.creatorName.toUpperCase()}</footer>
//           </div>
//         </div>

//         <div className='flex flex-col gap-y-12 w-full'>
//           <div>
//             <Image src={`http://localhost:5000${normalizeImageUpload(getblogId.image)}`} alt={getblogId.title} height={500} width={500} className='w-full h-full object-cover' />
//           </div>
//           <p className={`text-lg leading-9 ${cardo.className} leading-loose`}>{getblogId.content}</p>
//         </div>

//         <div className='flex flex-row gap-x-2 justify-start pt-4'>
//           {getblogId.tags.map((tag, index) => (
//             <span key={index} className='bg-gray-800 text-white px-4 py-2 rounded-3xl'>{tag}</span>
//           ))}
//         </div>


//         {/* <button className='border border-red-300 px-3 py-2 rounded-md' onClick={handleDelete}>Delete</button> */}

//         {/* comments */}
//         <div className='flex flex-col gap-y-4'>
//           <h3 className='text-lg'>Comments</h3>
//           <div className='flex flex-col gap-y-4 border rounded-lg p-2'>
//             {comments?.length === 0 ? <p>No comments yet</p> :

//               comments.map((comment, index) => (
//                 <div key={index} className='flex flex-col gap-y-2'>
//                   <h5 className='text-sm italic'>{comment.name}</h5>
//                   <p className=''>{comment.comment}</p>
//                   <button className='w-fit flex p-2 border border-red-300 rounded-lg' onClick={() => handleCommentDeletion(comment._id)}>Delete</button>
//                 </div>
//               ))}
//           </div>
//           <form className='flex flex-col gap-y-4 w-1/5 mt-8' onSubmit={(e) => handlePostComment(e)}>
//             <textarea
//               className='p-2 border rounded-xl resize-y bg-gray-100'
//               placeholder='Leave a comment'
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               name='comment'
//             />

//             <button className='border w-1/2 border-red-300 px-3 py-2 rounded-md' type='submit'>Post Comment</button>
//           </form>
//         </div>
//       </div>
//       :
//       <h1>Loading...</h1>
//     }

//   </div>
// </>

//   )
// }

// export default IdBlog;

"use client";
import React, { useEffect, useState, useContext } from 'react';
import { GET } from '@/api/Blog/idBlog/route';
import { DELETE } from '@/api/Blog/deleteBlog/route';
import { postComment } from '@/api/Blog/postComment/route';
import { updateLikes } from '@/api/Blog/updateLikes/route';
import { DeleteComment } from '@/api/Blog/deleteComment/route';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { capitalize, formatDate, normalizeImageUpload } from '@/utils/Misc';
import Navbar from '@/Components/header';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import Modal from '@/Components/Modal';
import { cardo } from '@/fonts/fonts';

const IdBlog = ({ params }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [getblogId, setGetBlog] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [blogUser, setBlogUser] = useState();
  const blogId = params.id;

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await GET(blogId);
        setGetBlog(blog);
        setComments(blog.comments);
        setLikes(blog.likes);
        setBlogUser(blog.creator);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    getBlog();
  }, [blogId]);

  const handleLikes = async () => {
    if (!auth.isLoggedIn) {
      setModalContent({
        header: 'Please Login',
        type: 'error',
        children: 'You need to log in to like the post.',
        footer: <Link href='/auth'>Login</Link>,
      });
      setShowModal(true);
      return;
    }

    const res = await updateLikes({ blogId, userId: auth.userId, token: auth.token });
    if (res) {
      setLikes(res.likes);
      if (res.likedMessage) {
        setModalContent({
          header: 'Info',
          type: 'success',
          children: res.likedMessage,
          footer: <button onClick={() => setShowModal(false)}>Close</button>,
        });
        setShowModal(true);
      }
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!auth.isLoggedIn) {
      setModalContent({
        header: 'Please Login',
        type: 'error',
        children: 'You need to log in to post a comment.',
        footer: <button onClick={() => router.push('/auth')}>Login</button>,
      });
      setShowModal(true);
      return;
    }

    if (!newComment) {
      setModalContent({
        header: 'Error',
        type: 'error',
        children: 'Comment cannot be empty.',
        footer: <button onClick={() => setShowModal(false)}>Close</button>,
      });
      setShowModal(true);
      return;
    }

    const user = auth.userId;
    console.log(user);

    const res = await postComment({ blogId, user, comment: newComment, token: auth.token });
    if (res) {
      setComments(res.comments);
      setNewComment('');
      setModalContent({
        header: 'Success',
        type: 'success',
        children: 'Comment has been posted!',
        footer: <button onClick={() => setShowModal(false)}>Close</button>,
      });
      setShowModal(true);
    } else {
      setModalContent({
        header: 'Error',
        type: 'error',
        children: 'An error occurred while posting your comment.',
        footer: <button onClick={() => setShowModal(false)}>Close</button>,
      });
      setShowModal(true);
    }
  };

  const handleCommentDeletion = async (commentId) => {
    if (getblogId) {
      const res = await DeleteComment({ commentId, blogId, token: auth.token });
      if (res) {
        setComments(comments.filter(comment => comment._id !== commentId));
        setModalContent({
          header: 'Success',
          type: 'success',
          children: 'Successfully deleted comment',
          footer: <button onClick={() => setShowModal(false)}>Close</button>,
        });
        setShowModal(true);
      } else {
        setModalContent({
          header: 'Error',
          type: 'error',
          children: 'Error deleting comment',
          footer: <button onClick={() => setShowModal(false)}>Close</button>,
        });
        setShowModal(true);
      }
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) setShowModal(false);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className='flex flex-col p-10 px-16 gap-y-12'>
        {getblogId ?
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
                <div className='flex flex-col gap-y-1'>
                  <h3 className='text-md italic'>{`Published  ${formatDate(getblogId.createdAt)}`}</h3>
                  <h3 className='text-md italic'>{`Updated ${formatDate(getblogId.updatedAt)}`}</h3>
                </div>
              </div>
              <div>
                <footer className='text-sm font-[600]' >{getblogId.creatorName.toUpperCase()}</footer>
              </div>
            </div>

            <div className='flex flex-col gap-y-12 w-full'>
              <div>
                <Image src={`http://localhost:5000${normalizeImageUpload(getblogId.image)}`} alt={getblogId.title} height={500} width={500} className='w-full h-full object-cover' />
              </div>
              <p className={`text-lg leading-9 ${cardo.className} leading-loose`}>{getblogId.content}</p>
            </div>

            <div className='flex flex-row gap-x-2 justify-start pt-4'>
              {getblogId.tags.map((tag, index) => (
                <span key={index} className='bg-gray-800 text-white px-4 py-2 rounded-3xl'>{tag}</span>
              ))}
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
                      {(blogUser === auth.userId) &&
                        <button className='w-fit flex p-2 border border-red-300 rounded-lg' onClick={() => handleCommentDeletion(comment._id)}>Delete</button>}
                    </div>
                  ))}
              </div>
              <form className='flex flex-col gap-y-4 w-1/5 mt-8' onSubmit={(e) => handlePostComment(e)}>
                <input
                  className='p-2 border rounded-xl resize-y bg-gray-100'
                  placeholder='Leave a comment'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  name='comment'
                />

                <button className='border w-1/2 border-red-300 px-3 py-2 rounded-md' type='submit'>Post Comment</button>
              </form>
            </div>
          </div>
          :
          <h1>Loading...</h1>
        }

      </div>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        header={modalContent.header}
        type={modalContent.type}
        footer={modalContent.footer}
      >
        {modalContent.children}
      </Modal>

    </>
  );
};

export default IdBlog;
