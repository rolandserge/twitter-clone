"use client"

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { SideBarItemProps } from '@/types'
import useLoginModal from '@/zustand/useLoginModal'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { BsDot } from 'react-icons/bs'


export default function ItemCard({label, icon: Icon, href, auth, alert, onClick} : SideBarItemProps) {

    const router = useRouter()
    const loginModal = useLoginModal()
    const { currentUser } = useCurrentUser()

    const handleClick = useCallback(() => {
        if(onClick) {
            return onClick()
        }

        if(auth && !currentUser) {
            loginModal.onOpen()
        } else if(href) {
            if(href === "users") {
                router.push(`/users/${currentUser?.id}`)
            } else {
                router.push(href)
            }
        }
    }, [onClick, href, router, loginModal, auth, currentUser])

    return (
        <div 
            className='flex flex-row items-center'
            onClick={handleClick}
        >
            <div 
                className='
                    relative
                    rounded-full
                    h-14 w-14 p-4
                    items-center
                    justify-center
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                    lg:hidden
                '
            >
                <Icon size={28} color="white" />
                { alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={80} /> : null }
            </div>
            <div
                className="
                    relative hidden
                    lg:flex items-center
                    gap-4 p-4
                    rounded-full
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                "
            >
                <Icon size={24} color='white' />
                <p className='hidden lg:block text-white text-xl'>
                    {label}
                </p>
                { alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={70} /> : null }
            </div>
        </div>
    )
}
