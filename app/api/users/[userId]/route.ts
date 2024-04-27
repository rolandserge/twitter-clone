import prisma from "@/libs";

interface Params {
    userId: string
}

export async function GET(req: Request, context: { params: Params}) {

    if(req.method !== "GET") {
        return new Response ('Http method invalid', { status: 405})
    }

    try {
        const userId = context.params.userId

        if(!userId || typeof userId !== "string") {
            throw new Error("Invalid ID user")
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })

        return Response.json({ ...existingUser, followersCount})
    } catch (error) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}