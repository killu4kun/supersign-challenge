import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma/client';
import bcrypt from 'bcryptjs';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials?.password!,
          user.password!
        );
        return isValid ? user : null;
      },
    }),
  ],
  session: { strategy: 'jwt' as 'jwt' },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
