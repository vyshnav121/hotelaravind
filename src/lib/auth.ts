import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import { User } from "@/models/Schemas";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                await dbConnect();

                const user = await User.findOne({ email: credentials.email });

                if (user) {
                    // User found, verify password
                    const isValid = credentials.password === user.password;
                    if (!isValid) {
                        return null;
                    }

                    // If 'admin' is specifically requested, MUST be admin.
                    // If 'user' is requested, can be admin OR user.
                    if (credentials.role === 'admin' && user.role !== 'admin') {
                        return null;
                    }
                    if (credentials.role === 'user' && !['admin', 'user'].includes(user.role)) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                } else {
                    // No user found, check if it's the admin credentials from env to create initial admin
                    if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
                        // If 'user' role is specifically requested, don't allow initial admin creation here
                        if (credentials.role === 'user') {
                            return null;
                        }

                        const newUser = await User.create({
                            email: credentials.email,
                            password: credentials.password,
                            name: "Admin",
                            role: "admin"
                        });
                        return {
                            id: newUser._id.toString(),
                            name: newUser.name,
                            email: newUser.email,
                            role: newUser.role
                        };
                    }
                    return null;
                }
            }
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: any) {
            if (session?.user) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (session.user as any).role = token.role;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (session.user as any).id = (token as any).id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
