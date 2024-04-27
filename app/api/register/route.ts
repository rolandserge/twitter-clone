import bcrypt from "bcryptjs"
import prisma from "@/libs"

export async function POST(request: Request){

    
    if(request.method !== "POST") {
        return new Response ('Http method invalid', { status: 405})
    }

    try {
        const { username, name, email, password } = await request.json()

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: { name, username, email, hashedPassword}
        })

        return Response.json(user)

    } catch (error: any) {
        console.log(error)
        return new Response("Erreur !",{ status: 400 })
    }
}