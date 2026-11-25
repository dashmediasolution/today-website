
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
};

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/admin/login",
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const email = String(credentials?.email || "")
                    .trim()
                    .toLowerCase();

                const password = String(credentials?.password || "");

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || user.role !== "ADMIN") return null;
                if (!user.password) return null;

                const valid = await bcrypt.compare(password, user.password);

                if (!valid) return null;

                const authUser: AuthUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

                return authUser;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as typeof user & AuthUser;

                token.id = authUser.id;
                token.role = authUser.role;
            }

            return token;
        },

       async session({ session, token }) {
    if (session.user) {
        const sessionUser = session.user as typeof session.user & {
            id: string;
            role: "USER" | "ADMIN";
        };

        sessionUser.id = token.id as string;
        sessionUser.role = token.role as "USER" | "ADMIN";
    }

    return session;
},
    },
});
