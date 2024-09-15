"use client"
import React, { useState, useEffect, useRef } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const images = [
    {
        src: './Google-Campus.jpg',
        alt: 'Google Campus',
        credit: 'Photo by Alban on Unsplash',
        creditLink: 'https://unsplash.com/@hypr1and?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        imageLink: 'https://unsplash.com/photos/gray-and-white-concrete-building-Un-vHvg5ezU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        title: "Google’s Innovative Campus: A Hub for Pioneering Technology and Sustainable Development",
        keywords: ['Google', 'Innovative Campus', 'Technology']
    },
    {
        src: './Dog-spam.jpg',
        alt: 'Dog',
        credit: 'Photo by Ryan Walton on Unsplash',
        creditLink: 'https://unsplash.com/@rwltn1?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        imageLink: 'https://unsplash.com/photos/a-brown-dog-sitting-on-top-of-a-sandy-beach-AbNO2iejoXA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        title: "My Dog Barked Today",
        keywords: []
    },
    {
        src: './AI-boom.jpg',
        alt: 'AI Boom',
        credit: 'Photo by Possessed Photography on Unsplash',
        creditLink: 'https://unsplash.com/@possessedphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        imageLink: 'https://unsplash.com/photos/closeup-photo-of-white-robot-arm-jIBMSMs4_kA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
        title: "The AI Revolution: How Automation is Shaping Our Future",
        keywords: ['AI', 'Automation', 'Future']
    }
];
const Carousel = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [showText, setShowText] = useState(false);

    const [highlightKeywords, setHighlightKeywords] = useState(false);
    const carouselRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setShowText(false);
        const timer = setTimeout(() => {
            setShowText(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [currIndex]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }
        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
        };
    }, []);

    const nextSlide = () => {
        setCurrIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const getHighlightedTitle = (title, keywords) => {
        let highlightedTitle = title;

        keywords.forEach((keyword) => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            highlightedTitle = highlightedTitle.replace(
                regex,
                highlightKeywords
                    ? `<span class='bg-yellow-200 text-black font-semibold'>${keyword}</span>`
                    : `${keyword}`
            );
        });

        return highlightedTitle;
    };

    return (
        <div className="relative flex  h-full items-center w-full justify-center">
            {/* text hover effect */}
            <div className="absolute">
                <span
                    className="text-[20rem] text-white cursor-pointer"
                    onMouseEnter={() => setHighlightKeywords(true)}
                    onMouseLeave={() => setHighlightKeywords(false)}
                >
                    useful
                </span>
            </div>
            <button onClick={prevSlide} className='p-5 absolute left-0'> <ArrowBackIosIcon className='text-white' /> </button>

            <div ref={carouselRef} className={`flex justify-center items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className='absolute'>
                    <div className="relative flex justify-center h-[500px] w-[250px] border-[4px] bg-slate-100 border-black rounded-[2.5rem] z-10 shadow-custom-gray" >
                        <span class="border absolute border-black bg-black w-16 h-4 mt-2 rounded-full"></span>
                        <span className="absolute -right-1.5 top-20  border-[2px]  border-black h-10 rounded-md " style={{ boxShadow: 'rgb(111 111 111) 2px 0px 2px 1px;' }}></span>
                        <span className="absolute -left-1.5 top-16 border-[2px]  border-black h-6 rounded-md" style={{ boxShadow: 'rgb(111 111 111) -2px 0px 2px 1px;' }}></span>
                        <span className="absolute -left-1.5 top-32 border-[2px]  border-black h-12 rounded-md" style={{ boxShadow: 'rgb(111 111 111) -2px 0px 2px 1px;' }}></span>
                        <span className="absolute -left-1.5 top-48 border-[2px]  border-black h-12 rounded-md" style={{ boxShadow: 'rgb(111 111 111) -2px 0px 2px 1px;' }}></span>
                        <div className="w-full flex justify-center items-center relative" >
                            <div className='flex flex-row carousel justify-center gap-x-12 absolute '>

                                {images.map((img, index) => {
                                    return <div className={`slides  p-2 flex flex-col gap-y-4 `} style={{ transform: `translateX(${150 - currIndex * 150}px)`, width: `${index !== currIndex ? '100px' : "200px"}`, filter: `blur(${index !== currIndex ? '3px' : ""})`, transition: 'all 0.5s ease-in-out' }}>
                                        <img src={img.src} alt={img.alt} title={img.credit} style={{
                                            height: '200px',
                                            width: 'auto',
                                            objectFit: 'cover'
                                        }} />

                                        {index === currIndex && showText ? (
                                            <div className={`${index === currIndex ? 'animate-slide-in' : 'animate-slide-out'}`}>
                                                <p className="text-md font-semibold mt-2"
                                                    dangerouslySetInnerHTML={{ __html: getHighlightedTitle(img.title, img.keywords) }}>
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={nextSlide} className='p-5 absolute right-0'> <ArrowForwardIosIcon className='text-white' /></button>
        </div>
    );
}

export default Carousel;
