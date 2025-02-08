"use client";
import React, { useEffect, useState, useContext } from 'react';
import { GET } from '@/api/User/idUser/route';
import { AuthContext } from '@/context/auth-context';
import Header from '@/Components/header';
import { notFound } from 'next/navigation';
import Image from 'next/image';


const getTop5 = (items) => {
    if (!items || items.length === 0) return [];

    const countMap = items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) => key);
};


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!auth.userId || !auth.token) {
                    setLoading(false);
                    return;
                }
                const response = await GET(auth.userId);
                if (response) {
                    setUser(response);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to load user data");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (auth.isLoggedIn && auth.userId) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [auth.userId, auth.token, auth.isLoggedIn]);

    if (loading || !user) {
        return <p>Loading...</p>;
    }

    if (!auth.isLoggedIn && !user) {
        notFound();
    }
    const topTags = getTop5(user.tags);
    const topCategories = getTop5(user.categories);
    return (
        user && 
        <>
            <Header />
            <div className="w-full max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-gray-100 p-6 relative">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Image
                                className="w-24 h-24 rounded-full border-2 border-gray-300"
                                src="/user_pfp.jpg"
                                alt="Profile"
                                height={150}
                                width={150}
                            />
                            <div>
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-sm text-gray-500">
                                    {user.bio || "No bio provided"}
                                </p>
                                <p className="text-sm text-gray-400">{user.joiningDate}</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center space-x-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Follow</button>
                            <button className="bg-gray-100 border px-4 py-2 rounded-md">Resume</button>
                        </div> */}
                    </div>
                    {/* <div className="flex space-x-4 mt-6">
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">{user.totalBlogs}</p>
                            <p className="text-gray-500">Followers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">3492</p>
                            <p className="text-gray-500">Following</p>
                        </div>
                    </div> */}
                </div>

                {/* Navigation (Profile, Threads, Shows, etc.) */}
                {/* <div className="border-b p-4 flex space-x-6">
                    <button className="text-black border-b-2 border-black pb-2">Profile</button>
                    <button className="text-gray-500">Threads</button>
                    <button className="text-gray-500">Shows</button>
                    <button className="text-gray-500">Series</button>
                    <button className="text-gray-500">Guestbook</button>
                </div> */}

                <div className="p-6 flex space-x-6">
                    {/* Left Content */}
                    <div className="w-3/5">
                        {/* About Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Talks About</h2>
                            {/* add categories to user schema */}
                            {user.categories.length === 0 ? "User has not posted anything yet" : topCategories.map((category) =>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">{category}</span>
                            )}
                        </div>

                        {/* Expertise Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Frequently used tags</h2>
                            <div className="flex space-x-4 flex-wrap">
                                {user.tags.length === 0 ? "User has not posted anything yet" : topTags.map((tag) =>
                                    <span className="bg-gray-200 py-2 px-4 rounded-full">{tag}</span>
                                )}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        {/* <div>
                            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
                            <div className="flex space-x-4 flex-wrap">
                                <span className="bg-blue-100 py-2 px-4 rounded-full">Web Development</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">UI/UX Design</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">Open Source</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">App Development</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">Mentorship</span>
                            </div>
                        </div> */}
                    </div>

                    {/* Right Content (Stats and Badges) */}
                    <div className="w-2/5">
                        {/* Front Page */}
                        <div className="bg-white p-4 border rounded-lg mb-6">
                            <h3 className="font-bold">Reach out to the user</h3>
                            <a className="text-blue-500" href={`mailto:${user.email}`}>{user.email}</a>
                        </div>

                        {/* Community Karma */}
                        <div className="bg-white p-4 border rounded-lg mb-6 overflow-y-scroll max-h-40">
                            <h3 className="font-bold mb-4">Recent posts:</h3>
                            {user.blogTitles.length === 0 ? "User has not posted anything yet" : user.blogTitles.map((blog) =>
                                <p className='line-clamp-3 overflow-hidden font-semibold underline hover:text-blue-500 transition-all duration-300'>{blog.title}</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
