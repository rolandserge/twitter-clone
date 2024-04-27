"use client"

import fetcher from "@/libs/fetcher"
import useSWR from "swr"

export const useNotification = (userId?: string) => {

    const {data, error, isLoading, mutate} = useSWR(`/api/notification/${userId}`, fetcher)

    return { data, error, isLoading, mutate }
}