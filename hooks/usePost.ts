"use client"

import fetcher from "@/libs/fetcher"
import useSWR from "swr"

export const usePost = (postId: string) => {

    const {data, error, isLoading, mutate} = useSWR(`/api/posts/${postId}`, fetcher)

    return { data, error, isLoading, mutate }
}