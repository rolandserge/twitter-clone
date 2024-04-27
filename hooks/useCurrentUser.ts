"use client"
// coté client
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {

    const session = useSession()
    const currentUser = session?.data?.user

    return { currentUser }

}

// coté serveur
// import { auth } from "@/auth";

// export const useCurrentUser = async() => {

//     const session = auth()

//     return session
// }