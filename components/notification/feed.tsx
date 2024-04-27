"use client"

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useNotification } from '@/hooks/useNotification'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'

export default function Feed() {

    const { currentUser } = useCurrentUser()
    const { data: notifications} = useNotification(currentUser?.id as string)

    if(notifications?.length === 0) {
        return (
            <div className='text-neutral-600 text-center p-6 text-xl'>
                No notifications
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            { notifications?.map((notification: Record<string, any>, index: number) => (
                <div 
                    key={index}
                    className='
                        flex flex-row
                        items-center p-6
                        gap-4 border-b-[1px]
                        border-neutral-800
                    '
                >
                    <BsTwitter color='white' size={32} />
                    <p className='text-white'>
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    )
}
