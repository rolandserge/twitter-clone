import React from 'react'
import CommentItem from './commentItem'

interface CommentFeedProps {
    comments?: Record<string, any>[]
}

export default function CommentFeed({ comments = []} : CommentFeedProps) {

    return (
        <>
            {comments.map((comment, index: number) => {
                return <CommentItem key={index} data={comment} />
            })}
        </>
    )
}
