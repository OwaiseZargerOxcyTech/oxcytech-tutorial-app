import { NextResponse } from "next/server";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export const authOption = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const user = await prisma.usert.findFirst({
            where: {
              username: credentials.username,
            },
          });

          const hashedPassword = md5(credentials.password);

          if (!user || user.password !== hashedPassword) {
            return null;
          }

          if (user.blocked === "Y") {
            return null;
          }

          const { id, userRole: name, email, userRole } = user;

          return { id, name, email, userRole };
        } catch (error) {
          return NextResponse.json({ status: 400, errors: error.messages });
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
