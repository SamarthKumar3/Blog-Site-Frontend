"use client"
import { GET } from '@/app/api/allBlogs/route';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


const images = [
    'https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg',
    'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
    'https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=',
];

const Carousel = () => {
    const [getblogId, setGetBlog] = useState();
    const [isBlog, setIsBlog] = useState(false);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const blog = await GET();
                setGetBlog(blog);
                setIsBlog(true);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setIsBlog(true);
            }
        };

        getBlog();
    }, []);


    const [currIndex, setCurrIndex] = useState(1);

    const nextSlide = () => {
        if (currIndex == images.length - 1) {
            setCurrIndex(0);
        }
        else {
            setCurrIndex(prevIndex => prevIndex + 1)
        }
    }

    const prevSlide = () => {
        setCurrIndex((prevIndex) => {
            return currIndex === 0 ? images.length - 1 : prevIndex - 1;
        })
    }

    return (
        <div className="relative flex h-full items-center w-full justify-center">
            <button onClick={prevSlide} className='border p-5'> prev </button>
            <div className='absolute'>
                <div class="relative flex justify-center h-[500px] w-[250px] border-[4px]  border-black rounded-2xl"
                    style={{ boxShadow: 'rgb(111 111 111) 1px 2px 2px 2px;' }}>
                    {/* <span class="border border-black bg-black w-16 h-4 mt-2 rounded-full"></span> */}

                    <span class="absolute -right-1.5 top-20  border-[2px]  border-black h-10 rounded-md " style={{ boxShadow: 'rgb(111 111 111) 2px 0px 2px 1px;' }}></span>
                    <h1 className='text-6xl text-white'>useful</h1>
                    <span class="absolute -left-1.5 top-16 border-[2px]  border-black h-6 rounded-md" style={{ boxShadow: 'rgb(111 111 111) -2px 0px 2px 1px;' }}></span>
                    <span class="absolute -left-1.5 top-32 border-[2px]  border-black h-12 rounded-md" style={{ boxShadow: 'rgb(111 111 111) -2px 0px 2px 1px;' }}></span>
                    <span class="absolute -left-1.5 top-48 border-[2px]  border-black h-12 rounded-md" style={{ boxShadow: 'rgb(111 111 111) -2px 0px 2px 1px;' }}></span>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className='flex flex-row carousel justify-center items-center gap-x-12 p-5 '>
                    {!isBlog ?
                        (<h1>Loading</h1>) :
                        getblogId.map((img, index) => {
                            return <div key={img._id} className='slides text-white transform transition-transform duration-500 ease-in-out' style={{ transform: `translateX(${155 - currIndex * 155}px)`, width: `${index !== currIndex ? '10%' : "15rem"}`, filter: `blur(${index !== currIndex ? '2px' : ""})`, transition: 'all 1s' }} >
                                <Link href={`/blog/${img._id}`} className='w-[300px] h-[300px]'>
                                    <img src='https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg' />
                                    <h1>{img.title}</h1>
                                </Link>
                            </div>
                        })

                    }
                </div>
            </div>
            <button onClick={nextSlide} className='border p-5'>next</button>
        </div>
    )
}

export default Carousel;