"use client"
import React, { useEffect, useState } from 'react';
import { POST } from '@/api/User/createUser/route';
import { POST2 } from '@/api/User/signIn/route';
import { redirect } from 'next/dist/server/api-utils';
import Modal from '@/Utils/Modal';
import Header from '@/Components/header';

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(true);
    const [sEmail, setSEmail] = useState('');
    const [sPass, setSPass] = useState('');
    const [signUpButtonDisable, setSignUpButtonDisable] = useState(true);
    const [signInButtonDisable, setSignInButtonDisable] = useState(true);

    useEffect(() => {
        if (name && email && password.length > 8) {
            setSignUpButtonDisable(false);
        } else {
            setSignUpButtonDisable(true);
        }
    }, [name, email, password]);

    useEffect(() => {
        if (sEmail && sPass.length > 8) {
            setSignInButtonDisable(false);
        } else {
            setSignInButtonDisable(true);
        }
    }, [sEmail, sPass]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPassword('');

        if (!name || !email || !password) {
            alert('Please fill all the fields');
            return <Modal isOpen={true} onClose={() => redirect('/auth')} title='User Creation Failed' content='Please fill all the fields' />;
        }

        const user = {
            name,
            email,
            password
        };

        try {
            const res = await POST(user);
            if (!res.success) {
                alert(res.error);
            }
            if (res && (res.name || res.email || res.password)) {
                return alert('User created successfully');
            } else {
                return alert('Failed to create user');
            }
        } catch (err) {
            alert('Failed to create user');
            return;
        }

    };

    const handleSignin = async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        if (!sEmail || !sPass) {
            return alert('Please fill all the fields');
        }

        const user = {
            email: sEmail,
            password: sPass
        };

        try {
            const res = await POST2(user);
            if (res.success) {
                alert(res.data.message);
            }
            else {
                alert('Failed to sign in: ' + res.error);
            }
        } catch (err) {
            console.log('An error occured: ', err);
            return;
        }
    }

    return (
        <>
            <Header />
            <div className='h-screen flex flex-col items-center justify-center transition-all duration-300' style={{ backgroundImage: `url('/Auth-page-bg.png')` }}>
                {isSignup ?
                    <div className="flex flex-col space-y-4 gap-y-1 bg-white bg-opacity-[0.13] p-16 rounded-xl shadow-lg backdrop-blur-[3px] border-[#ffffff10] border-2">
                        <h1 className="text-3xl text-center">SIGN UP</h1>
                        <div className="flex flex-col space-y-4 sm:flex-col gap-y-1">
                            <div className='relative flex flex-col'>
                                <input
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md" id='auth-input1'
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition ${name ? 'forward' : ''} `} htmlFor='#auth-input1' style={{ margin: '0 ' }}>Username</label>
                            </div>
                            <div className='relative flex flex-col'>
                                <input
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    id='auth-input2'

                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition  ${email ? 'forward' : ''} `} htmlFor='#auth-input2' style={{ margin: '0 ' }}>Email</label>
                            </div>

                            <div className='relative flex flex-col'>
                                <input
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    id='auth-input3'
                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition  ${password ? 'forward' : ''}`} htmlFor='#auth-input3' style={{ margin: '0 ' }}>Password</label>
                            </div>
                            <button
                                className={`px-2 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 ${signUpButtonDisable ? 'cursor-not-allowed' : ''}`}
                                type="button"
                                onClick={handleSignup}
                                disabled={signUpButtonDisable}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-1/2 h-px bg-white"></div>
                            <p className=" mx-2 text-bold text-white">OR</p>
                            <div className="w-1/2 h-px bg-white"></div>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <button
                                className="w-full px-4 py-2 bg-black text-gray-200 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                                type="button"
                                onClick={() => setIsSignup(false)}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col space-y-4 gap-y-1 bg-white bg-opacity-[0.13] p-16 rounded-xl shadow-lg backdrop-blur-[3px] border-[#ffffff10] border-2">
                        <h1 className="text-3xl  text-center">SIGN IN</h1>
                        <div className="flex flex-col space-y-4 sm:flex-col gap-y-1">
                            <div className='relative flex flex-col'>
                                <input
                                    value={sEmail}
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md" id='auth-input4'
                                    type="email"
                                    onChange={e => setSEmail(e.target.value)}
                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition ${sEmail ? 'forward' : ''} `} htmlFor='#auth-input4' style={{ margin: '0 ' }}>Email</label>
                            </div>
                            <div className='relative flex flex-col'>
                                <input
                                    className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md"
                                    type="password"
                                    id='auth-input5'
                                    value={sPass}
                                    onChange={e => setSPass(e.target.value)}
                                />
                                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition ${sPass ? 'forward' : ''}`} htmlFor='#auth-input5' style={{ margin: '0 ' }}>Password</label>
                            </div>
                            <button
                                className={`w-full px-4 py-2 bg-black text-gray-200 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ${signInButtonDisable ? 'cursor-not-allowed' : ''}`}
                                type="button"
                                onClick={handleSignin}
                                disabled={signInButtonDisable}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-1/2 h-px bg-white"></div>
                            <p className=" mx-2 text-bold text-white">OR</p>
                            <div className="w-1/2 h-px bg-white"></div>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <button
                                className="px-4 py-2 w-full bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
                                type="button"
                                onClick={() => setIsSignup(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>

    );
};


export default Auth;