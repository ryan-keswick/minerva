import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prismadb';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CognitoProvider({
      clientId: String(process.env.COGNITO_CLIENT_ID),
      clientSecret: String(process.env.COGNITO_CLIENT_SECRET),
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
