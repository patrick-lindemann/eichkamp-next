import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'E-Mail',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      authorize: async ({ email, password }) => {
        const user = await prisma.user.findUnique({
          where: { email }
        });
        if (!user) {
          // User does not exist
          return null;
        }
        if (!compareSync(password, user.passwordHash)) {
          // Invalid password
          return null;
        }
        // Login successfull
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    signIn: async ({ user }) => {
      // Create a new login entry for the user
      await prisma.login.create({
        data: {
          userId: user.id
        }
      });
      return true;
    },
    redirect: async ({ url, baseUrl }) => {
      return `${baseUrl}/admin`;
    }
  },
  session: {
    strategy: 'jwt'
  }
};

export default NextAuth(options);
