"use client"

import fetcher from "@/libs/fetcher"
import useSWR from "swr"

export const usePosts = (userId?: string) => {

    const {data, error, isLoading, mutate} = useSWR(userId !== "undefined" && typeof userId !==  "undefined" ? `/api/posts/user/${userId}` : "/api/posts", fetcher)

    return { data, error, isLoading, mutate }
}