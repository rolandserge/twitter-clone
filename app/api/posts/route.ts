import prisma from "@/libs"

interface ParamsProps {
    userId: string;
}

export async function GET(request: Request){
    
    if(request.method !== "GET") {
        return new Response ('Http method invalid', { status: 405})
    }
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        
        return Response.json(posts)
    } catch (error) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }

}