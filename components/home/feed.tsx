import { usePosts } from '@/hooks/usePosts'
import React from 'react'
import Item from './item'
import { useUserPost } from '@/hooks/useUserPost'

interface PostFeedProps {
    userId?: string
}
export default function Feed({ userId } : PostFeedProps) {

    const { data: posts = [] } = usePosts(userId ? userId : "undefined")

    return (
        <>
            { posts.map((post: Record<string, any>, index: number) => (
                <Item
                    key={index}
                    userId={userId}
                    data={post}
                />
            ))}
        </>
    )
}
