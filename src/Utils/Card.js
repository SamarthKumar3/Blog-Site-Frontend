// import React from 'react';

// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

// const Card = ({ article }) => {
//     return (
//         <div className='flex flex-col gap-y-2 w-1/3 p-4'>
//             <div className='flex '>
//                 <p className='px-2 py-1 border rounded-xl text-xs bg-lightGray text-steel'>5 min read</p>
//             </div>
//             <h1 className='text-3xl'>{article.title}</h1>
//             <img src={article.cover} className='w-full h-auto mb-2' />
//             <p className='text-justify line-clamp-3 overflow-hidden'>{article.description}</p>
//             <div className='mt-4 flex items-start'>
//                 <p className='flex'>Read Article &nbsp; <ArrowCircleRightIcon /></p>
//             </div>
//         </div>
//     )
// }

// export default Card

import React from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Card = ({ article }) => {
    return (
        <div className='flex flex-col gap-y-2 w-1/3 p-4'>
            <div className='flex'>
                <p className='px-2 py-1 border rounded-xl text-xs bg-lightGray text-steel'>5 min read</p>
            </div>
            <h1 className='text-3xl'>{article.title}</h1>
            <img src={article.cover} className='w-full h-auto mb-2' />
            <p className='text-justify line-clamp-3 overflow-hidden'>{article.description}</p>
            <div className='mt-4 flex items-start'>
                <div className="group flex items-center cursor-pointer" style={{ height: '1rem', width: 'auto' }}>
                    {/* Reducing the size */}
                    <span className="relative text-sm overflow-hidden" style={{ height: '1rem' }}>
                        <span className="block transition-transform transform group-hover:-translate-y-4 duration-300">Read Article</span>
                        <span className="block absolute left-0 top-0 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-300">Read Article</span>
                    </span>
                    <div className="relative w-6 h-6 ml-2 bg-gray-100 rounded-full flex justify-center items-center overflow-hidden transition-transform duration-300 group-hover:translate-x-2">
                        <ArrowCircleRightIcon className="transform transition-transform duration-300 group-hover:translate-x-full" />
                        <ArrowCircleRightIcon className="absolute transform transition-transform duration-300 -translate-x-full group-hover:translate-x-0" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;


