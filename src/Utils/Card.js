import React from 'react';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Card = ({ article }) => {
    return (
        <div className='flex flex-col gap-y-2 w-1/3 p-4'>
            <div className='flex '>
                <p className='px-2 py-1 border rounded-xl text-xs bg-lightGray text-steel'>5 min read</p>
            </div>
            <h1 className='text-3xl'>{article.title}</h1>
            <img src={article.cover} className='w-full h-auto mb-2' />
            <p className='text-justify line-clamp-3 overflow-hidden'>{article.description}</p>
            <div className='mt-4 flex items-start'>
                <p className='flex'>Read Article &nbsp; <ArrowCircleRightIcon/></p>
            </div>
        </div>
    )
}

export default Card