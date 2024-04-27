"use client"

import { useCurrentUser } from "./useCurrentUser"
import useLoginModal from "@/zustand/useLoginModal"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { usePost } from "./usePost"
import { useUserPost } from "./useUserPost"

interface LikeProps {
    userId?: string
    postId: string
}

export const useLike = ({ postId, userId } : LikeProps) => {

    const { currentUser } = useCurrentUser()
    const {data: post, mutate: mutateFetchedPost } = usePost(postId)
    const { mutate: mutateFetchedPosts } = useUserPost(userId as string)

    const loginModal = useLoginModal()

    const hasLiked = useMemo(() => {
        const list = post?.likedIds || []

        return list.includes(currentUser?.id)
    }, [currentUser?.id, post?.likedIds])

    const toggleLike = useCallback(async() => {
        if(!currentUser) {
            loginModal.onOpen()
        }

        try {
            let request

            if(hasLiked) {
                request = () => axios.delete('/api/like/delete', {data: { postId } })
            } else {
                request = () => axios.post("/api/like/create", { postId })
            }

            await request()

            mutateFetchedPost()
            mutateFetchedPosts()

            toast.success('Successfully action')
        } catch (error) {
            toast.error("Erreur de recuperation coté serveur")
        }
    }, [hasLiked, mutateFetchedPost, postId, loginModal, currentUser, mutateFetchedPosts]) 

    return { hasLiked, toggleLike }
}