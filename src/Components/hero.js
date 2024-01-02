"use client"
import React from 'react'



function Hero() {
    return (
        <>
            <div style={{ height: '100vw', backgroundImage: `url('/aaron-burden.jpg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} >
                <div className='flex flex-col h-1/2'>
                    <div className='h-full flex flex-col justify-center'>
                        <div className='flex flex-col gap-y-5 text-center text-white'>
                            <h1 className='text-8xl'>BloggED</h1>
                            <p>Read and write blogs</p>
                        </div>
                        <div >
                            <div className='flex flex-col h-full justify-center items-center pt-10 text-white'>
                                <h3>Literacy is a bridge from misery to hope</h3>
                                <h6>~Kofi Annan</h6>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default Hero;