"use client"

import fetcher from "@/libs/fetcher"
import useSWR from "swr"

export const useUserPost = (userId: string) => {

    const {data, error, isLoading, mutate} = useSWR(`/api/posts/user/${userId}` , fetcher)

    return { data, error, isLoading, mutate }
}