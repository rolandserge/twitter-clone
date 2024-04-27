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

        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false
            }
        })

        return Response.json(notifications)
    } catch (error) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}