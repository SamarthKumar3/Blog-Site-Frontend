"use client";
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '@/context/auth-context';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';

import Modal from '@/Components/Modal';

import { updateLikes } from '@/api/Blog/updateLikes/route';

const Likes = ({ id, creator, likes }) => {
    const [userLike, setUserLikes] = useState(likes);
    const auth = useContext(AuthContext);
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

        const res = await updateLikes({ id, userId: auth.userId, token: auth.token });
        if (res.success) {
            setUserLikes(res.success);
            setModalContent({
                header: 'Info',
                type: 'success',
                children: "Successfully liked the post.",
                footer: <button onClick={() => setShowModal(false)}>Close</button>,
            });
            setShowModal(true);
        }
        else if(res.likedMessage) {
            setModalContent({
                header: 'Info',
                type: 'success',
                children: res.likedMessage,
                footer: <button onClick={() => setShowModal(false)}>Close</button>,
            });
            setShowModal(true);
        }
        else {
            setModalContent({
                header: 'Error Occurred',
                type: 'error',
                children: 'Sorry an error occurred while liking the post.',
                footer: <button onClick={() => setShowModal(false)}>Close</button>,
            });
            setShowModal(true);
        }

    };

    return (
        <>
            <div className='absolute bottom-0 right-0 flex flex-col items-center'>
                <button onClick={() => handleLikes(id, creator)}>
                    <FavoriteIcon className='text-red-500' />
                </button>
                <p>{userLike}</p>
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

export default Likes