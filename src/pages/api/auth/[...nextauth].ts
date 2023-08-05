import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/api/endpoints/users';

type CredentialsType = {
  username: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { username, password } = credentials as CredentialsType;

        const data = await login({ username, password });
        console.log('🚀 ~ login ~ data:', JSON.stringify(data));
        
        if (data?.token) {
          const { email, username, token } = data;
          return { id: String(data.user.id), email, name: username, token };
        } else {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
        // @ts-ignore
        token.accessToken = user.token;
      }
      return Promise.resolve(token);
    },

    session: async ({ session, token }) => {
      // @ts-ignore
      session.id = token.id;
      // @ts-ignore
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signOut: `${process.env.NEXT_PUBLIC_PROYECT_BASE_URL}`,
    signIn: '/',
    newUser: '/',
  },
};
export default NextAuth(authOptions);
