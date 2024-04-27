"use client"

import useLoginModal from '@/zustand/useLoginModal'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa'

export default function TwitterButton() {

    const loginModal = useLoginModal()

    const handleClick = useCallback(() => {
        loginModal.onOpen()
    }, [loginModal])

    return (
        <div onClick={handleClick}>
            <div
                className='
                    lg:hidden
                    mt-6 h-14 w-14
                    rounded-full
                    p-4 flex items-center
                    justify-center
                    bg-sky-500
                    hover:bg-opacity-80
                    transition cursor-pointer
                '
            >
                <FaFeather size={24} color='white' />
            </div>
            <div
                className='
                    lg:block hidden
                    mt-6 px-4 py-2
                    rounded-full transition
                    bg-sky-500
                    hover:bg-opacity-90
                    cursor-pointer
                '
            >
                <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
                    Tweet
                </p>
            </div>
        </div>
    )
}
