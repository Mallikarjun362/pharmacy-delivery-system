import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            email: string,
            name: string,
            image: any,
            custome_data: {
                user_type: string,
                db_id: string,
            },
        }
    }
}
