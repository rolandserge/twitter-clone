import prisma from "@/libs"

export async function GET(request: Request){
    
    if(request.method !== "GET") {
        return new Response ('Http method invalid', { status: 405})
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return Response.json(users)
    } catch (error) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }

}