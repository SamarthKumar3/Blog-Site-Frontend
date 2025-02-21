"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';
import Link from 'next/link';

import Modal from '@/Components/Modal';

import { postComment } from '@/api/Blog/postComment/route';
import { DeleteComment } from '@/api/Blog/deleteComment/route';


const Comments = ({ blogComments, blogId, blogUser }) => {
    const [comments, setComments] = useState(blogComments);
    const [newComment, setNewComment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        header: '',
        type: '',
        children: '',
        footer: '',
    });

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.keyCode === 27) setShowModal(false);
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const auth = useContext(AuthContext);
    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!auth.isLoggedIn) {
            setModalContent({
                header: 'Please Login',
                type: 'error',
                children: 'You need to log in to post a comment.',
                footer: <Link href='/auth'>Login</Link>,
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

        const res = await postComment({ blogId, user, comment: newComment, token: auth.token });
        if (res.Success) {
            setComments((prevComments) => [...prevComments.slice(), res.data.comments]);
            setNewComment('');
            setModalContent({
                header: 'Success',
                type: 'success',
                children: 'Comment has been posted!',
                footer: <button onClick={() => setShowModal(false)}>Close</button>,
            });
            setShowModal(true);
        } else if (!res.Success) {
            setModalContent({
                header: 'Error',
                type: 'error',
                children: `An error occurred while posting your comment: ${res.data.error}`,
                footer: <button onClick={() => setShowModal(false)}>Close</button>,
            });
            setShowModal(true);
        }
    };
    useEffect(() => {
        console.log("Updated comments:", comments);
    }, [comments]);

    const handleCommentDeletion = async (commentId) => {
        if (blogId) {
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
    return (
        <>
            <div className='flex flex-col gap-y-4'>
                <h3 className='text-lg'>Comments</h3>
                <div className='flex flex-col gap-y-4 border rounded-lg p-2'>
                    {comments?.length === 0 ? <p>No comments yet</p> :
                        comments.map((comment) => (
                            <div key={comment._id} className='flex flex-col gap-y-2'>
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
    )
}

export default Comments