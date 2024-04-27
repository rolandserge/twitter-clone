"use client"

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { PostItemProps } from '@/types'
import useLoginModal from '@/zustand/useLoginModal'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import Avatar from '../avatar'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { useLike } from '@/hooks/useLike'

export default function Item({ userId, data} : PostItemProps) {

    const router = useRouter()
    const loginModal = useLoginModal()

    const { currentUser } = useCurrentUser()
    const { hasLiked, toggleLike} = useLike({postId: data.id, userId})

    const goToUser = useCallback((e: any) => {
        e.stopPropagation()

        const userId = data.user.id
        router.push(`/users/${userId}`)
    }, [router, data.user.id])


    const goToPost = useCallback(() => {

        const postId = data.id
        router.push(`/posts/${postId}`)
    }, [router, data.id])


    const onLike = useCallback((e: any) => {
        e.stopPropagation()

        if(!currentUser) {
            return loginModal.onOpen()
        }

        toggleLike()
    }, [loginModal, toggleLike, currentUser])


    const createdAt = useMemo(() => {
        if(!data?.createdAt) return null

        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

    return (
        <div
            onClick={goToPost}
            className="
                border-b-[1px] p-5
                border-neutral-800
                cursor-pointer transition
                hover:bg-neutral-900
            "
        >
            <div className='flex flex-row items-start gap-3'>
                <Avatar userId={data.user.id} />
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p 
                            onClick={goToUser}
                            className='
                                text-white font-semibold 
                                cursor-pointer hover:underline
                            '
                        >
                            {data.user.name}
                        </p>
                        <span 
                            onClick={goToUser}
                            className="
                                text-neutral-500
                                curson-pointer hidden
                                md:block hover:underline
                            "
                        >
                            @{data.user.username}
                        </span>
                        <span className='text-neutral-500 text-sm'>
                            {createdAt}
                        </span>
                    </div>
                    <div className='text-white mt-1'>
                        {data.body}
                    </div>
                    <div className='flex flex-row items-center mt-3 gap-10'>
                        <div
                            className="
                                flex flex-row items-center
                                text-neutral-500 gap-2
                                cursor-pointer transition
                                hover:text-sky-500
                            "
                        >
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comments?.length || 0}
                            </p>
                        </div>
                        <div
                            onClick={onLike}
                            className="
                                flex flex-row items-center
                                text-neutral-500 gap-2
                                cursor-pointer transition
                                hover:text-red-500
                            "
                        >
                            <LikeIcon size={20} color={hasLiked ? 'red' : ""} />
                            <p>
                                {data.likedIds?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
