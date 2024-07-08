"use client"
import React from 'react'

function Hero() {
    return (
        <>
            <div className='flex gap-x-20'>
                <div className='w-1/2 p-20 '>
                    <div className='relative flex flex-col justify-center items-center'>
                        <img src='/aaron-burden.jpg' alt='hero' className='w-full p-2 border-2' />
                        <div className='absolute bottom-8 text-gray-200 italic'>
                            <h3>Literacy is a bridge from misery to hope</h3>
                            <h6>~Kofi Annan</h6>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center p-20'>
                    <div className='flex flex-col gap-y-5 text-center '>
                        <h1 className='text-8xl'>BloggED</h1>
                        <p>Read and write blogs</p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Hero;