"use client"

import { useUser } from '@/hooks/useUser'
import { AvatarProps } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function Avatar({ userId, isLarge, hasBorder } : AvatarProps) {

    const router = useRouter()
    const { data: user } = useUser(userId)

    const onClick = useCallback((event: any) => {
        event.stopPropagation()

        const url = `/users/${userId}`

        router.push(url)
     }, [router, userId])

    return (
        <div
            className={`
                ${hasBorder ? 'border-4 border-black' : ""}
                ${isLarge ? 'h-32' : "h-12"}
                ${isLarge ? "w-32" : "w-12"}
                rounded-full transition relative
                hover:opacity-90 cursor-pointer
            `}
        >
            <Image
                src={user?.profileImage || "/images/placeholder.jpeg"}
                alt='Avatar user profile image'
                style={{ objectFit: "cover", borderRadius: "100%"}}
                onClick={onClick}
                width={500}
                height={500}
            />
        </div>
    )
}
