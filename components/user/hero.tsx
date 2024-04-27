import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import React from 'react'
import Avatar from '../avatar'

interface HeroProps {
    userId: string
}

export default function Hero({ userId } : HeroProps) {

    const { data: user } = useUser(userId)

    return (
        <div>
            <div className='bg-neutral-700 h-44 relative'>
                { user?.coverImage && (
                    <Image
                        src={user.coverImage}
                        alt='Cover Image'
                        style={{ objectFit: 'cover' }}
                        fill
                    />
                )}
                <div className='absolute -bottom-16 left-4'>
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    )
}
