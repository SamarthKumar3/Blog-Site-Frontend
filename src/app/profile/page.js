"use client";
import React, { useEffect, useState, useContext } from 'react';
import { GET } from '@/api/User/idUser/route';
import { AuthContext } from '@/context/auth-context';
import Header from '@/Components/header';
import { notFound } from 'next/navigation';

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user && error) {
        return <p>Error: {error}</p>;
    }

    if (!auth.isLoggedIn && !user) {
        notFound();
    }

    return (
        user &&
        <>
            <Header />
            <div className="w-full max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-gray-100 p-6 relative">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img
                                className="w-24 h-24 rounded-full border-2 border-gray-300"
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                            />
                            <div>
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-sm text-gray-500">
                                    user.bio
                                </p>
                                <p className="text-sm text-gray-400">user.dateOfJoin</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Follow</button>
                            <button className="bg-gray-100 border px-4 py-2 rounded-md">Resume</button>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">3492</p>
                            <p className="text-gray-500">Followers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">3492</p>
                            <p className="text-gray-500">Following</p>
                        </div>
                    </div>
                </div>

                {/* Navigation (Profile, Threads, Shows, etc.) */}
                <div className="border-b p-4 flex space-x-6">
                    <button className="text-black border-b-2 border-black pb-2">Profile</button>
                    <button className="text-gray-500">Threads</button>
                    <button className="text-gray-500">Shows</button>
                    <button className="text-gray-500">Series</button>
                    <button className="text-gray-500">Guestbook</button>
                </div>

                <div className="p-6 flex space-x-6">
                    {/* Left Content */}
                    <div className="w-3/5">
                        {/* About Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Talks About</h2>
                            {/* add categories to user schema */}
                            user.categories.map((category, index) return (category.name))
                        </div>

                        {/* Expertise Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Previously Collaborated With</h2>
                            <div className="flex space-x-4 flex-wrap">
                                <span className="bg-gray-200 py-2 px-4 rounded-full">Jenny Wilson</span>
                                <span className="bg-gray-200 py-2 px-4 rounded-full">Derick Lee</span>
                                <span className="bg-gray-200 py-2 px-4 rounded-full">Scott Spence</span>
                                <span className="bg-gray-200 py-2 px-4 rounded-full">Ariana</span>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
                            <div className="flex space-x-4 flex-wrap">
                                <span className="bg-blue-100 py-2 px-4 rounded-full">Web Development</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">UI/UX Design</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">Open Source</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">App Development</span>
                                <span className="bg-blue-100 py-2 px-4 rounded-full">Mentorship</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content (Stats and Badges) */}
                    <div className="w-2/5">
                        {/* Front Page */}
                        <div className="bg-white p-4 border rounded-lg mb-6">
                            <h3 className="font-bold">Front Page</h3>
                            <p className="text-blue-500">tianrongliew.showwcase.com</p>
                        </div>

                        {/* Community Karma */}
                        <div className="bg-white p-4 border rounded-lg mb-6">
                            <h3 className="font-bold mb-4">Community Karma</h3>
                            <p><span className="font-bold">7216</span> Threads</p>
                            <p><span className="font-bold">4812</span> Replies</p>
                            <p><span className="font-bold">37</span> Shows</p>
                            <p><span className="font-bold">260</span> People Invited</p>
                        </div>

                        {/* Badges */}
                        <div className="bg-white p-4 border rounded-lg">
                            <h3 className="font-bold">Badges</h3>
                            <div className="flex space-x-4 mt-4">
                                <span className="bg-yellow-400 py-2 px-4 rounded-full">🏆</span>
                                <span className="bg-green-400 py-2 px-4 rounded-full">🎖️</span>
                                <span className="bg-blue-400 py-2 px-4 rounded-full">⭐</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
