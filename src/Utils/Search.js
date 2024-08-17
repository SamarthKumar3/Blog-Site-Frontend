import React, { useState, useEffect, useRef } from 'react'

import { capitalize, highlightText } from '@/Utils/Misc';
import Link from 'next/link';


const Search = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <input
                className='pl-10 py-3 border rounded-3xl'
                type='text'
                placeholder='Search for a blog'
                onChange={(e) => props.setSearch(e.target.value)}
                value={props.search}
                ref={props.searchRef}
                onClick={() => setIsOpen(true)}
            />
            {props.search && (
                isOpen && (
                    <div ref={props.ref} className='absolute top-14 w-72 h-72 bg-white shadow-lg rounded-xl overflow-y-auto'>
                        {props.blogs?.filter((blog) => blog.title.includes(capitalize(props.search))).map((blog) => (
                            <div key={blog.id} className='p-4 border-b z-10'>
                                <Link href={`/blog/${blog.id}`}>
                                    <p>{highlightText(blog.title, props.search)}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    )
}

export default Search