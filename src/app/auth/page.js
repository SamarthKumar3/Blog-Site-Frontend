"use client"
import React, { useEffect, useState } from 'react';
import { POST } from '@/api/User/createUser/route';
import { POST2 } from '@/api/User/signIn/route';
// import { redirect } from 'next/dist/server/api-utils';
// import Modal from '@/Utils/Modal';
import Header from '@/Components/header';

const Auth = () => {

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
            }

            const sendData = new FormData();
            sendData.append('name', formData.name);
            sendData.append('email', formData.email);
            sendData.append('password', formData.password);

            try {
                const res = await POST(sendData);
                if (res.success) {
                    return alert('User created successfully');
                } else {
                    return alert(`Failed to create user: ${res.error}`);
                }
            } catch (err) {
                alert('Failed to create user');
                return;
            }
        } else {
            if (!formData.email || !formData.password) {
                return alert('Please fill all the fields');
            }

            const user = {
                email: formData.email,
                password: formData.password
            };

            try {
                const res = await POST2(user);
                if (res.success) {
                    alert("Signed in successfully");
                } else {
                    alert('Failed to sign in: ' + res.error);
                }
            } catch (err) {
                console.log('An error occured: ' + err);
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
                            {/* i1 */}
                            {isSignup && <>
                                <div className='relative flex flex-col'>
                                    <input
                                        className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md" id='auth-input1'
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        name='name'
                                    />
                                    <label className={`absolute px-4 py-2 text-md -z-10 inputTransition ${formData.name ? 'forward' : ''} `} htmlFor='#auth-input1' style={{ margin: '0 ' }}>Username</label>
                                </div>
                                <div className='relative flex flex-col'>
                                    <input
                                        className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md" id='auth-input1'
                                        type="text"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        name='bio'
                                    />
                                    <label className={`absolute px-4 py-2 text-md -z-10 inputTransition ${formData.bio ? 'forward' : ''} `} htmlFor='#auth-input1' style={{ margin: '0 ' }}>Bio</label>
                                </div>

                            </>}

                            {/* i2 */}
                            <div className='relative flex flex-col'>
                                <input
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    id='auth-input2'
                                    name='email'
                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition  ${formData.email ? 'forward' : ''} `} htmlFor='#auth-input2' style={{ margin: '0 ' }}>Email</label>
                            </div>


                            {/* i3 */}
                            <div className='relative flex flex-col'>
                                <input
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    id='auth-input3'
                                    name='password'
                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition  ${formData.password ? 'forward' : ''}`} htmlFor='#auth-input3' style={{ margin: '0 ' }}>Password</label>
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
        </>
    );
};

export default Auth;