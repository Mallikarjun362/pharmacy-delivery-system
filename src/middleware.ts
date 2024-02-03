import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const admin_restricted = ["/account/admin"];

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const pathName = request.nextUrl.pathname;
        const token = request.nextauth.token;
        // ONLY ADMIN
        if (admin_restricted.includes(pathName) && token?.custome_data?.user_type !== "ADMIN") {
            return NextResponse.rewrite(new URL("/denied", request.url))
        }
        // ONLY SELLER 
        if (pathName.startsWith("/seller") && token?.custome_data?.user_type !== "SELLER") {
            return NextResponse.rewrite(new URL("/denied", request.url))
        }
        // ONLY BUYER 
        if (pathName.startsWith("/buyer") && token?.custome_data?.user_type !== "BUYER") {
            return NextResponse.rewrite(new URL("/denied", request.url))
        }
    },
    {
        callbacks: {
            authorized: (token) => !!token,
        }
    }
);

export const config = { matcher: ["/seller/:path*", "/account/admin", "/buyer/:path*"] };