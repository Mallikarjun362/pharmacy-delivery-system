import { ADMIN_EMAIL, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, SERVER_SECRET } from "@/utils/Constants";
import GoogleProvider from "next-auth/providers/google";
import { AccountActions } from "@/models/Account";
import { connectMongooseDB } from "@/models";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt", },
    secret: SERVER_SECRET,
    providers: [
        GoogleProvider({
            clientId: GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
            async profile(user_profile) {
                await connectMongooseDB();
                const email = user_profile.email
                let user_type = email === ADMIN_EMAIL ? "ADMIN" : "GENERAL";
                let the_user = await AccountActions.getUserRefAndTypeIdByEmail(email);
                if (the_user?.user_type) {
                    user_type = the_user.user_type;
                } else {
                    the_user = await AccountActions.createBasicAccount({ primary_email: user_profile?.email, user_type });
                }
                const custome_data = {
                    user_type,
                    db_id: the_user._id
                }
                return { ...user_profile, id: user_profile.sub, custome_data, };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.custome_data = (user as any)?.custome_data;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).custome_data = (token as any)?.custome_data;
            }
            return session;
        },
    },
};