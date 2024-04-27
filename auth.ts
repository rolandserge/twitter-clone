import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma from "./libs"
import bcrypt from "bcryptjs"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {

                if(!credentials) {
                    throw new Error('credentials is required');
                }

                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: (credentials.email).toString()
                    }
                })

                if(!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const isCorrectPassword = await bcrypt.compare((credentials.password).toString(), user.hashedPassword)

                if(!isCorrectPassword) {
                    throw new Error("Invalid password")
                }

                return user
            }
        })
    ],
    callbacks: {
        async session({token, session}) {
            if(token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({token}) {
            return token
        }
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    }
})