import React, { useEffect, useRef } from 'react';

const Modal = ({ open, children } : {open: boolean, children: React.ReactNode}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && modalRef.current) {
            const firstInput = modalRef.current.querySelector('input');
            if (firstInput) {
                (firstInput as HTMLInputElement).focus();
            }
        }
    }, [open]);

    if(!open) return null;

    return (
        <div key={new Date().getTime()} className='fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.7)] flex justify-center items-center p-2'>
            <div ref={modalRef} className='max-w-md h-fit bg-white rounded p-2'>
                { children }
            </div>
        </div>
    )
}

export default Modal;