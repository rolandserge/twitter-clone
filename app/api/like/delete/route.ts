import { auth } from "@/auth"
import prisma from "@/libs"

export async function DELETE(req: Request){

    if(req.method !== "DELETE") {
        return new Response ('Http method invalid', { status: 405})
    }
    // nous permet d'avoir la personne connecter coté server
    const session = await auth()

    try {
        const { postId } = await req.json()
        
        if(!postId || postId !== 'string') {
            throw new Error("Invalid ID user")
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post) {
            throw new Error("The post does not exist")
        }

        let updatedLikedIds = [...(post.likedIds)]

        updatedLikedIds = updatedLikedIds.filter(likeId => likeId !== session?.user?.id)

        const updatePost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })
        return Response.json(updatePost)

    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}