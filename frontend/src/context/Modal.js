// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />

            <div id="modal-content">

                <div className='top-modal'>
                    <img alt='close-button' id='close-modal' onClick={onClose}
                        src='https://cdn-icons-png.flaticon.com/512/2723/2723639.png' />

                    <div id='loginSignup'>Login or Sign Up</div>

                </div>
                <div id='loginForm-styling'>

                    {children}
                </div>
            </div>

        </div>,
        modalNode
    );
}