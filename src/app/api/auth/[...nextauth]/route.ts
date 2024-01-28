import { ADMIN_EMAIL, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, SERVER_SECRET } from "@/utils/Constants";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { AccountActions } from "@/models/Account";

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt", },
    secret: SERVER_SECRET,
    providers: [
        GoogleProvider({
            clientId: GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
            profile(user_profile) {
                let user_role = user_profile.email === ADMIN_EMAIL ? "ADMIN" : "GENERAL";
                return { ...user_profile, id: user_profile.sub, role: user_role, };
            }
        }),
    ],
    callbacks: {
        async signIn({ profile, user }) {
            if (profile?.email) {
                const user_type = ADMIN_EMAIL === profile?.email ? "ADMIN" : "BUYER";
                (user as any).role = user_type;
                await AccountActions.createBasicAccount({ primary_email: profile?.email, user_type });
                return true;
            }
            return false;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any)?.role;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return { ...session, ...token };
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };