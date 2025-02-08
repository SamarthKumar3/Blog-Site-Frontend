import React from 'react';
import Card from '@/Utils/Card';
import axios from 'axios';


export const revalidate = 6;

export default async function Trending () {

    const data = await fetch('http://localhost:5000/api/blog/trending/new');
    const trendingBlogs= await data.json();

    return (
        <div className='pl-10 pr-5 pt-28 flex flex-col gap-y-12'>
            <div className='relative pl-4 mb-4'>
                <h1 className='text-7xl leading-snug'>Best of the <br /> week</h1>
                <p className='absolute bottom-0 right-0'>The latest industry news, interviews, technologies <br /> and educational resources</p>
            </div>
            <div className='flex gap-x-32 p-4 pb-0 relative'>
                <div><button className='py-6 px-10 border-b-2 border-black'>Trending</button></div>
                <div><button className='py-6 px-10 '>Top articles</button></div>
                <div><button className='py-6 px-10 '>Marketing</button></div>
                <div><button className='py-6 px-10 '>Technology</button></div>
                <div className='absolute bottom-0 border-b-2 w-full -z-50'></div>
            </div>
            <div className='flex flex-wrap'>
                {trendingBlogs.length > 0 ? (
                    trendingBlogs.map((blog) => (
                        <Card article={blog} key={blog._id} />
                    ))
                ) : (
                    <p>No trending articles available.</p>
                )}
                
            </div>
        </div>
    );
};




