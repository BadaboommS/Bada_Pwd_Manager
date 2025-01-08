import React, { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

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

    if(!open) return null
    return ReactDom.createPortal(
        <>
            <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgb(0,0,0,0.7)] z-40" />
            <div ref={modalRef} className="fixed h-fit w-full md:w-3/4 lg:w-1/2 m-auto inset-x-0 inset-y-0 bg-slate-400 p-4 z-50 rounded-sm">
                { children }
            </div>
        </>,
        document.getElementById('modal_portal')
    )
}

export default Modal