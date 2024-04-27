import prisma from "@/libs"

interface ParamsProps {
    userId: string;
}

export async function GET(request: Request, { params } : {params : ParamsProps} ){
    
    if(request.method !== "GET") {
        return new Response ('Http method invalid', { status: 405})
    }
    const userId = params.userId

    try {

        if(userId && typeof userId === 'string') {

            const posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            return Response.json(posts)
        }
    } catch (error) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }

}