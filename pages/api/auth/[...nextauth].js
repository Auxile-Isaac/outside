// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// import NextAuth from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import GoogleProvider from "next-auth/providers/google";

// const prisma = new PrismaClient();

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       },
//       profile(profile) {
//         return {
//           id: profile.sub,
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//         };
//       },
//     }),
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//       maxAge: 10 * 60 * 60,
//       profile(profile) {
//         return {
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile, isNewUser }) {
//       if (account.provider === 'google') {
//         const existingAccount = await prisma.account.findUnique({
//           where: {
//             providerAccountId: profile.sub,  // Change this to the correct field name
            
//             providerType: 'google',
//           },
//           select: {
//             user: true,
//           },
//         });

//         // If the account exists, you might want to update it or perform additional checks
//         if (existingAccount) {
//           // Do something with the existing account
//         }

//         // If it's a new user, create an entry in your database
//         if (isNewUser) {
//           await prisma.user.create({
//             data: {
//               id: profile.sub,  // Change this to the correct field name
//               email: profile.email,
//               firstName: profile.given_name || '',
//               lastName: profile.family_name || '',
//               username: profile.given_name + "_username", // Change this to the appropriate field from the profile
//               password: 'a_default_password', // Change this to the appropriate field from the profile
//               image: profile.picture,
//               // Add other fields as needed
//             },
//           });
//         }

//         // Return true if the user should be allowed to sign in
//         return true;
//       }
//       return true; // Do different verification for other providers that don't have `email_verified`
//     },
//   },
// });

import NextAuth from 'next-auth'
import { PrismaClient } from '@prisma/client'

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";


const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60 * 60,
      profile(profile) {
        return {
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  
  callbacks: {
    async session(session, user) {
      session.userId = user.id;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  database: process.env.DATABASE_URL,
})