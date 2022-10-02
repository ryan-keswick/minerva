import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: String(process.env.COGNITO_CLIENT_ID),
      clientSecret: String(process.env.COGNITO_CLIENT_SECRET),
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
};

export default NextAuth(authOptions);
