import prisma from "@/libs"

interface ParamsProps {
    postId: string;
}

export async function GET(req: Request, { params } : {params : ParamsProps}){

    if(req.method !== "GET") {
        return new Response ('Http method invalid', { status: 405})
    }

    const postId = params.postId

    try {
        if(!postId || typeof postId !== 'string') {
            throw new Error("Invalid ID user")
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        return Response.json(post)
    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}