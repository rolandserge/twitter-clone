import { auth } from "@/auth"
import prisma from "@/libs"

export async function POST(request: Request){

    if(request.method !== "POST") {
        return new Response ('Http method invalid', { status: 405})
    }
    const session = await auth()
    try {
        const { body } = await request.json()

        const post = await prisma.post.create({
            data: {
                body,
                userId: session?.user?.id as string
            }
        })

        return Response.json(post)

    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}