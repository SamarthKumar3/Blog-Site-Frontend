// import React, { useState, useEffect, useRef } from 'react';
// import { capitalize, highlightText } from '@/Utils/Misc';
// import Link from 'next/link';
// import useClickOutside from '@/hooks/useClickOutside';

// const Search = ({ search, setSearch, blogs, className }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const containerRef = useRef(null);
//     const inputRef = useRef(null);

//     useClickOutside(containerRef, () => setIsOpen(false));

//     useEffect(() => {
//         if (search) {
//             setIsOpen(true);
//         } else {
//             setIsOpen(false);
//         }
//     }, [search]);

//     const handleInputChange = (e) => {
//         setSearch(e.target.value);
//     };

//     return (
//         <div ref={containerRef} className={`relative ${className}`}>
//             <input
//                 className='pl-2 py-3 border-b focus:outline-none text-black '
//                 type='text'
//                 placeholder='Search for a blog'
//                 onChange={handleInputChange}
//                 value={search}
//                 ref={inputRef}
//                 onClick={() => setIsOpen(true)}
//                 aria-expanded={isOpen}
//                 aria-controls='search-results'
//                 aria-autocomplete='list'
//                 aria-haspopup='true'
//             />
//             {search && isOpen && (
//                 <div
//                     id='search-results'
//                     className='absolute top-14 w-72 h-72 bg-white shadow-lg rounded-xl overflow-y-auto z-50'
//                 >
//                     {blogs
//                         ?.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()))
//                         .map((blog) => (
//                             <div key={blog.id} className='p-4 border-b'>
//                                 <Link href={`/blog/${blog._id}`}>
//                                     <p>{highlightText(blog.title, search)}</p>
//                                 </Link>
//                             </div>
//                         ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Search;


import React, { useState, useEffect, useRef } from 'react';
import { capitalize, highlightText } from '@/Utils/Misc';
import Link from 'next/link';
import useClickOutside from '@/hooks/useClickOutside';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ search, setSearch, blogs, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useClickOutside(containerRef, () => setIsOpen(false));

    useEffect(() => {
        if (search) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleIconClick = () => {
        inputRef.current.focus();  // This makes sure the input expands when the icon is clicked
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div
                className="relative flex items-center cursor-pointer"
                onClick={handleIconClick}

            >
                <SearchIcon className="absolute left-0  text-gray-500" />
                <input
                    className='pl-10 py-3 border-b w-[40px] focus:w-[280px] transition-all duration-600 ease-in-out focus:outline-none text-black bg-transparent cursor-pointer focus:cursor-text focus:border-gray-400'
                    type='text'
                    placeholder='Search for a blog'
                    onChange={handleInputChange}
                    value={search}
                    ref={inputRef}
                    onClick={() => setIsOpen(true)}
                    aria-expanded={isOpen}
                    aria-controls='search-results'
                    aria-autocomplete='list'
                    aria-haspopup='true'
                />
            </div>

            {search && isOpen && (
                <div
                    id='search-results'
                    className='absolute top-14 w-72 h-72 bg-white shadow-lg rounded-xl overflow-y-auto z-50'
                >
                    {blogs
                        ?.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()))
                        .map((blog) => (
                            <div key={blog.id} className='p-4 border-b'>
                                <Link href={`/blog/${blog._id}`}>
                                    <p>{highlightText(blog.title, search)}</p>
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Search;
