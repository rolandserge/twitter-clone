import { auth } from "@/auth"
import prisma from "@/libs"

export async function POST(req: Request){

    if(req.method !== "POST") {
        return new Response ('Http method invalid', { status: 405})
    }
    // nous permet d'avoir la personne connecter coté server
    const session = await auth()

    try {
        const { postId } = await req.json()
        
        if(!postId || typeof postId !== 'string') {
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
        
        let updatedLikedIds = [...(post.likedIds || [])]

        updatedLikedIds.push(session?.user?.id as string)

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId as string,
                }
            })

            if(post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: "Someone liked your tweet !",
                        userId: post.userId
                    }
                })

                await prisma.user.update({
                    where: {
                        id: post.userId as string
                    },
                    data: {
                        hasNotification: true
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }

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