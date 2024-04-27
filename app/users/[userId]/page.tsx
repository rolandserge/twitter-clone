"use client"

import Header from '@/components/header';
import { useUser } from '@/hooks/useUser';
import ClipLoader from "react-spinners/ClipLoader";
import React from 'react'
import Hero from '@/components/user/hero';
import Bio from '@/components/user/bio';
import Feed from '@/components/home/feed';

interface Params {
    userId: string;
}
export default function UserView({ params } : { params: Params}) {

    const userId = params.userId
    const { data: user, isLoading } = useUser(userId as string)

    if(isLoading || !user) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={user.name}/>
            <Hero userId={userId as string} />
            <Bio userId={userId as string} />
            <Feed userId={userId as string} />
        </>
    )
}
