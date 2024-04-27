import bcrypt from "bcryptjs"
import prisma from "@/libs"
import { auth } from "@/auth"

export async function PATCH(request: Request){

    
    if(request.method !== "PATCH") {
        return new Response ('Http method invalid', { status: 405})
    }

    const session = await auth()

    try {
        const { username, name, bio, profileImage, coverImage } = await request.json()

        if(!name || !username) {
            throw new Error('Missing fields')
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: session?.user?.id as string,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })

        return Response.json(updatedUser)

    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}