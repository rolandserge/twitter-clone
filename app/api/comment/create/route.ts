import { auth } from "@/auth"
import prisma from "@/libs"

export async function POST(request: Request){

    
    if(request.method !== "POST") {
        return new Response ('Http method invalid', { status: 405})
    }

    try {
        const session = await auth()
        const { body, postId } = await request.json()

        if(!postId || typeof postId !== 'string') {
            throw new Error("Invalid post id: " + postId)
        }

        const comment = await prisma.comment.create({
            data: { 
                body,
                userId: session?.user?.id as string,
                postId
            }
        })

        return Response.json(comment)

    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}