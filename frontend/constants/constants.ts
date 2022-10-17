export const callbackUrl =
  process.env.NODE_ENV == 'development'
    ? '/api/auth/callback/cognito'
    : 'https://text2images.com/api/auth/callback/cognito';
