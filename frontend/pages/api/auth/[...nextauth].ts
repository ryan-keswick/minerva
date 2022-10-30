import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prismadb';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user.id = user.id;
      return session;
    },
  },
  secret: String(process.env.NEXTAUTH_SECRET),
};

export default NextAuth(authOptions);
