"use client"

import Header from '@/components/header'
import CommentFeed from '@/components/home/commentFeed'
import Form from '@/components/home/form'
import Item from '@/components/home/item'
import { usePost } from '@/hooks/usePost'
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

interface PostViewProps {
    postId: string
}

export default function PostView({ params } : { params: PostViewProps}) {

    const { postId } = params

    const { data: post, isLoading } = usePost(postId as string)

    if(isLoading || !post) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader />
            </div>
        )
    }

    return (
        <>
            <Header label='Tweet' showBackArrow />
            <Item data={post} />
            <Form
                placeholder='Tweet your reply !'
                postId={postId as string}
                isComment
            />

            <CommentFeed comments={post.comments} />
        </>
    )
}
