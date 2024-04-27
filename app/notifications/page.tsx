"use client"

import Header from '@/components/header'
import Feed from '@/components/notification/feed'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

export default function page() {

    const session = getSession()

    if(!session) {
        return redirect('/')
    }

    return (
        <>
            <Header label='Notifications' showBackArrow />
            <Feed />
        </>
    )
}
