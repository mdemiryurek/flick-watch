import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { compare } from 'bcryptjs';
import { authAccout } from '../../../lib/graphcms';

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true,
    },
    session: {
        strategy: 'jwt',
        jwt: true
    },
    debug: process.env.NODE_ENV === 'development',
    providers: [
        Providers.Credentials({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            authorize: async({email, password}) => {
                const account = await authAccout(email);
                if(!account)
                    return null;

                const isValid = await compare(password, account.password);

                if(!isValid)
                    return null;
                else
                    return {
                        name: account.name
                    }
            }
        })
    ],
    callbacks: {
        async jwt(token, user) {
          if (user) {
            token.id = user.userid;
          }
          return token
        },
        async session(session, token) {
          session.user.id = token.id;
          return session
        }
      }
    
})