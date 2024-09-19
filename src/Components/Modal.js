import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

const Backdrop = (props) => {
    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={props.onClick}
        ></div>,
        document.getElementById('backdrop-hook')
    );
};

const ModalOverlay = (props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={props.onCancel}> {/* This is the backdrop click */}
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg relative" onClick={(e) => e.stopPropagation()}> {/* Stop propagation inside modal */}
                <button
                    className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={props.onCancel}
                >
                    <CloseIcon />
                </button>
                <header className={`px-4 py-2 text-white font-semibold rounded-t-lg ${props.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
                    <h2>{props.header}</h2>
                </header>
                <div className="px-6 py-4">{props.children}</div>
                <footer className="px-4 py-2 flex justify-end space-x-2">{props.footer}</footer>
            </div>
        </div>
    );
};


const Modal = (props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </>
    );
};

export default Modal;
