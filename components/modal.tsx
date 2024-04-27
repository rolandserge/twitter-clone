"use client"

import { ModalProps } from '@/types'
import React, { useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Button from './button';

export default function Modal({isOpen, title, disabled, onClose, onSubmit, actionLabel, body, footer} : ModalProps) {
    
    const handleClose = useCallback(() => {
        if(disabled) {
            return;
        }

        onClose()
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if(disabled) {
            return
        }

        onSubmit()
    }, [disabled, onSubmit] )

    if(!isOpen) return null

    return (
        <div
            className="
                flex fixed inset-0 z-50
                outline-none items-center
                justify-center bg-neutral-800
                bg-opacity-70 focus:outline-none
                overflow-x-hidden overflow-y-auto
            "
        >
            <div
                className="
                    relative w-full lg:w-3/6
                    my-6 mx-auto lg:maw-w-3xl
                    h-full lg:h-auto
                "
            >
                {/* Content */}
                <div
                    className="
                        h-full lg:h-auto border-0
                        rounded-lg shadow-lg relative
                        flex flex-col w-full bg-black
                        outline-none focus:outline-none
                    "
                >
                    {/* HEADER */}
                    <div
                        className="
                            flex items-center p-10
                            justify-between rounded-t
                        "
                    >
                        <h3 className='text-3xl text-white font-semibold'>{title}</h3>
                        <button
                            onClick={handleClose}
                            className="
                                p-1 ml-auto transition
                                border-0 text-white
                                hover:opacity-70
                            "
                        >
                            <AiOutlineClose size={20} onClick={onClose} />
                        </button>
                    </div>
                    {/* Body */}
                    <div className='relative p-10 flex-auto'>
                        {body}
                    </div>
                    {/* FOOTER */}
                    <div className='flex flex-col gap-2 p-10'>
                        <Button
                            disabled={disabled}
                            label={actionLabel}
                            secondary
                            fullWidth
                            large
                            onClick={handleSubmit}
                        />
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )
}
