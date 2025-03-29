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
        console.log('Credenciais recebidas:', credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          console.log('Usuário não encontrado');
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials?.password!,
          user.password!
        );
        if (!isValid) {
          console.log('Senha inválida');
          return null;
        }
        console.log('Usuário autenticado com sucesso:', user);
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log('Redirecionando para:', url);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    error: '/auth/error',
    signIn: '/login',
  },
  session: { strategy: 'jwt' as 'jwt' },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
