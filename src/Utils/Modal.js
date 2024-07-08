import React from 'react';

const Modal = ({ isOpen, onClose, title, content }) => {
    return (
        <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center`}>
            <div className="modal-content bg-white w-1/2 rounded-lg shadow-lg">
                <div className="modal-header px-4 py-2 bg-gray-200 rounded-t-lg">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button className="close-button ml-auto text-gray-500 hover:text-gray-700" onClick={onClose}>
                        X
                    </button>
                </div>
                <div className="modal-body px-4 py-2">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
