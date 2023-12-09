import bcrypt from "bcrypt"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/utils/prisma"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!( credentials?.username) || !credentials?.password) {
                    throw new Error('Invalid credentials provided');
                }
                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username,
                    },
                })
                if (!user) {
                    throw new Error('No user found');
                }
                const comparePasswords = await bcrypt.compare(credentials.password, user.password)
                if (!comparePasswords) {
                    throw new Error('Invalid password');
                }
                return user
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],


    callbacks: {
        async jwt({ token, user }) {
            const dbUserResutlt = await prisma.user.findFirst({
                where: {
                    email: user?.email as string,
                }
            })
            if (!dbUserResutlt) {
                return token
            }

            return {
                ...token,
                id: dbUserResutlt.id,
                username: dbUserResutlt.username,
                email: dbUserResutlt.email,
                image: dbUserResutlt.avatar,
            }
        },
        async session({ session, token }) {
            if (token) {
                return {
                    ...session,
                    user: session.user
                }
            }
            return session

        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
    },
}