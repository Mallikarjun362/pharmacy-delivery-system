import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const admin_only_paths = ["/account/admin"];

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const token = request.nextauth.token;
        const pathName = request.nextUrl.pathname;

        // ONLY ADMIN
        if (admin_only_paths.includes(pathName) && token?.custome_data?.user_type !== "ADMIN") {
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

        // ONLY DISPATCHER
        if (pathName.startsWith("/dispatcher") && token?.custome_data?.user_type !== "DISPATCHER") {
            return NextResponse.rewrite(new URL("/denied", request.url))
        }
    },
    {
        callbacks: {
            authorized: (token) => !!token,
        }
    }
);

export const config = { matcher: ["/seller/:path*", "/account/admin", "/buyer/:path*", "/dispatcher/:path"] };