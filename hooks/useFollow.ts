"use client"

import { useCurrentUser } from "./useCurrentUser"
import { useUser } from "./useUser"
import useLoginModal from "@/zustand/useLoginModal"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import axios from "axios"

export const useFollow = (userId: string) => {

    const { currentUser } = useCurrentUser()
    const {data: user, mutate: mutateFetchedUser } = useUser(currentUser?.id as string)

    const loginModal = useLoginModal()

    const isFollowing = useMemo(() => {
        const list = user?.followingIds || []

        return list.includes(userId)
    }, [userId, user])

    const toggleFollow = useCallback(async() => {
        if(!currentUser) {
            loginModal.onOpen()
        }

        try {
            let request

            if(isFollowing) {
                request = () => axios.delete('/api/follow/delete', {data: { userId } })
            } else {
                request = () => axios.post("/api/follow/create", { userId })
            }

            await request()

            mutateFetchedUser()

            toast.success('Successfully action')
        } catch (error) {
            toast.error("Erreur de recuperation coté serveur")
        }
    }, [isFollowing, mutateFetchedUser, userId, loginModal, currentUser]) 

    return { isFollowing, toggleFollow }
}