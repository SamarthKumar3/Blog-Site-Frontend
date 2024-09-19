"use client"
import React, { useEffect, useState, useContext } from 'react';
import { POST } from '@/api/User/createUser/route';
import { POST2 } from '@/api/User/signIn/route';
import Modal from '@/Components/Modal';
import Header from '@/Components/header';
import Input from '@/Utils/Input';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation'

const Auth = () => {
    const auth = useContext(AuthContext);
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bio: ''
    });

    const [isSignup, setIsSignup] = useState(true);
    const [buttonDisable, setButtonDisable] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    if (isSignup) {
        useEffect(() => {
            if (formData.name && formData.email && formData.password.length > 8) {
                setButtonDisable(false);
            } else {
                setButtonDisable(true);
            }
        }, [formData.name, formData.email, formData.password]);
    } else {
        useEffect(() => {
            if (formData.email && formData.password.length > 8) {
                setButtonDisable(false);
            } else {
                setButtonDisable(true);
            }
        }, [formData.email, formData.password]);
    }

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        if (isSignup) {
            if (!formData.name || !formData.email || !formData.password) {
                alert('Please fill all the fields');
                return;
            }

            const sendData = new FormData();
            sendData.append('name', formData.name);
            sendData.append('email', formData.email);
            sendData.append('password', formData.password);

            try {
                const res = await POST(sendData);
                if (res.success) {
                    setModalContent({
                        header: 'Info',
                        type: 'success',
                        children: <p>User created successfully</p>,
                        footer: <button onClick={() => setShowModal(false)}>Close</button>,
                    });
                    setShowModal(true);
                    auth.login(res.data.userId, res.data.token);
                    router.push('/');
                } else {
                    setModalContent({
                        header: 'Error',
                        type: 'error',
                        children: <p>An Error occured: {res.error}</p>,
                        footer: <button onClick={() => setShowModal(false)}>Close</button>,
                    });
                    setShowModal(true);
                }
            } catch (err) {
                setModalContent({
                    header: 'Error',
                    type: 'error',
                    children: <p>An unknown error occured</p>,
                    footer: <button onClick={() => setShowModal(false)}>Close</button>,
                });
                setShowModal(true);
            }

        } else {
            if (!formData.email || !formData.password) {
                setModalContent({
                    header: 'Error',
                    type: 'error',
                    children: <p>Please fill all the fields</p>,
                    footer: <button onClick={() => setShowModal(false)}>Close</button>,
                });
                setShowModal(true);
                return;
            }

            const user = {
                email: formData.email,
                password: formData.password
            };

            try {
                const res = await POST2(user);
                if (res.success) {
                    setModalContent({
                        header: 'Info',
                        type: 'success',
                        children: <p>User signed in successfully</p>,
                        footer: <button onClick={() => setShowModal(false)}>Close</button>,
                    });
                    setShowModal(true);
                    auth.login(res.data.userId, res.data.token);
                    setTimeout(() => { router.push('/')}, 1000);
                   
                } else {
                    setModalContent({
                        header: 'Error',
                        type: 'error',
                        children: <p>Failed to sign in: {res.error}</p>,
                        footer: <button onClick={() => setShowModal(false)}>Close</button>,
                    });
                    setShowModal(true);
                }
            } catch (err) {
                setModalContent({
                    header: 'Error',
                    type: 'error',
                    children: <p>An error occured: {err}</p>,
                    footer: <button onClick={() => setShowModal(false)}>Close</button>,
                });
                setShowModal(true);
                return;
            }
        }
    }

    return (
        <>
            <Header />
            <div className='h-screen flex flex-col items-center justify-center transition-all duration-300' style={{ backgroundImage: `url('/Auth-page-bg.png')` }}>
                <div className="flex flex-col space-y-4 gap-y-1 bg-white bg-opacity-[0.13] p-16 rounded-xl shadow-lg backdrop-blur-[3px] border-[#ffffff10] border-2">
                    <h1 className="text-3xl text-center">{isSignup ? 'SIGN UP' : 'SIGN IN'}</h1>
                    <form onSubmit={authSubmitHandler}>
                        <div className="flex flex-col space-y-4 sm:flex-col gap-y-1">
                            {isSignup && <>
                                <div className='relative flex flex-col'>
                                    <Input type="text" value={formData.name} handleInputChange={handleInputChange} id='auth-input1' inputName='name' label='Name' />
                                </div>
                                <div className='relative flex flex-col'>
                                    <Input type="text" value={formData.bio} handleInputChange={handleInputChange} id='auth-input4' inputName='bio' label='Bio' />
                                </div>

                            </>}

                            <div className='relative flex flex-col'>
                                <Input type="text" value={formData.email} handleInputChange={handleInputChange} id='auth-input2' inputName='email' label='Email' />
                            </div>

                            <div className='relative flex flex-col'>
                                <Input type="password" value={formData.password} handleInputChange={handleInputChange} id='auth-input3' inputName='password' label='Password' />
                            </div>

                            <button
                                className={`px-2 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 ${buttonDisable ? 'cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={buttonDisable}
                            >
                                {isSignup ? 'Sign Up' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center">
                        <div className="w-1/2 h-px bg-white"></div>
                        <p className=" mx-2 text-bold text-white">OR</p>
                        <div className="w-1/2 h-px bg-white"></div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <button
                            className="w-full px-4 py-2 bg-black text-gray-200 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                            type="button"
                            onClick={() => setIsSignup(prevValue => !prevValue)}
                        >
                            {isSignup ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onCancel={() => setShowModal(false)} // Close modal on backdrop or cross button click
                header={modalContent.header}
                type={modalContent.type}
                footer={modalContent.footer}
            >
                {modalContent.children}
            </Modal>
        </>
    );
};

export default Auth;