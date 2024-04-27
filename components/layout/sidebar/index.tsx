"use client"

import React from 'react'
import SideBarLogo from './Logo'
import { itemSideBar } from '@/constants'
import ItemCard from './itemCard'
import { BiLogOut } from 'react-icons/bi'
import TwitterButton from './twitterButton'
import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUser } from '@/hooks/useUser'

export default function SideBar() {

    const { currentUser } = useCurrentUser()
    const { data: user } = useUser(currentUser?.id as string)

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SideBarLogo />

                    {itemSideBar.map((item, index) => (
                        <ItemCard
                            key={index}
                            icon={item.icon}
                            href={item.href}
                            label={item.label}
                            auth={item.auth}
                            alert={item.alert && user?.hasNotification}
                        />
                    ))}
                    { currentUser && (
                        <ItemCard icon={BiLogOut} label='Logout' onClick={() => logout()} />
                    )}
                    <TwitterButton />
                </div>
            </div>
        </div>
    )
}
