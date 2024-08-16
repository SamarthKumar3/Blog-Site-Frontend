import React from 'react'

const Input = (props) => {
    const { type, value, handleInputChange, id, inputName, label } =  props;

    return (
        <>
            <input
                className="px-4 py-2 border-b relative border-black focus:outline-none bg-transparent text-black text-md"
                type={type}
                value={value}
                onChange={handleInputChange}
                id={id}
                name={inputName}
            />
            {label &&
                <label className={`absolute px-4 py-2 text-md -z-10 inputTransition  ${value ? 'forward' : ''} `} htmlFor={`#${id}`} style={{ margin: '0 ' }}>{label}</label>
            }
        </>
    )
}

export default Input;