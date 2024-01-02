"use client"
import React, { useState } from 'react'

const Trending = () => {

    const [trending, setTrending] = useState(true);



    return (
        <div className='pl-5 pr-5 flex flex-col items-center gap-y-16'>
            <h1 className='text-5xl'>Browse through the most &nbsp;
                <button onClick={() => setTrending(true)} className={`${trending ? 'bg-red-700' : ''} p-3 rounded-2xl transition-all ease-in-out duration-300` }>Trending</button>&nbsp;
                /&nbsp;
                <button onClick={() => setTrending(false)} className={`${!trending ? 'bg-red-700' : ''} p-3 rounded-2xl transition-all ease-in-out duration-300`}>Latest</button>
                &nbsp;Blogs
            </h1>
            <div className='flex flex-row justify-center gap-x-5'>
                {trending ?
                    <>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Trending Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Trending Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Trending Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Trending Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Trending Title</h3>
                        </div>
                    </>
                    :
                    <>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Latest Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Latest Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Latest Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Latest Title</h3>
                        </div>
                        <div className='w-[300px] h-[300px]'>
                            <img src="https://images.ctfassets.net/hrltx12pl8hq/5ZjPpfAhn1rZWeopnHiXb/3e1b9a709297905672a0d24eac94a873/thumb_nov22_03.jpg" />
                            <h3>Latest Title</h3>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Trending;