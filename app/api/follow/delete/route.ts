import { auth } from "@/auth"
import prisma from "@/libs"

export async function DELETE(req: Request){

    if(req.method !== "DELETE") {
        return new Response ('Http method invalid', { status: 405})
    }
    // nous permet d'avoir la personne connecter coté server
    const session = await auth()

    try {
        const { userId } = await req.json()
        
        if(!userId || typeof userId !== 'string') {
            throw new Error("Invalid ID user")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new Error("The user does not exist")
        }

        let updatedFollowingIds = [...(user.followingIds)]

        updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId)

        const updateUser = await prisma.user.update({
            where: {
                id: session?.user?.id as string
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })
        return Response.json(updateUser)

    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}