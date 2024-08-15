import Link from 'next/link';
import React from 'react';

const Button = ({ href, borderColor, bgColor, text, round, color }) => {
    return (
        <Link href={`${href}`} className={`flex justify-center w-full text-${color}`}>
            <button className={`px-6 py-2 border border-${borderColor} bg-${bgColor} rounded-${round}`}>
                {text}
            </button>
        </Link>
    );
};

export default Button;