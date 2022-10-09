import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@lib/prismadb';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CognitoProvider({
      clientId: String(process.env.COGNITO_CLIENT_ID),
      clientSecret: String(process.env.COGNITO_CLIENT_SECRET),
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
};

export default NextAuth(authOptions);
