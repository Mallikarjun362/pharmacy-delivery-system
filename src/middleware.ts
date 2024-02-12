import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const routePermissions: { [key: string]: Array<string> } = {
    // CONCRETE URLS
    '^/account/admin': ["ADMIN"],
    '^/orders': ["BUYER", "DISPATCHER", "SELLER"],
    // DYNAMIC URLS
    '^(\/dispatcher).*': ["DISPATCHER", "ADMIN"],
    '^(\/seller).*': ["SELLER", "ADMIN"],
    '^(\/buyer).*': ["BUYER", "ADMIN"],
    '^(\/admin).*': ["ADMIN"],
};

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const token = request.nextauth.token;
        const pathName: string = request.nextUrl.pathname;

        for (let k of Object.keys(routePermissions)) {
            if (pathName.match(new RegExp(k))) {
                if (!routePermissions[k].includes(token?.custome_data?.user_type as string)) {
                    return NextResponse.rewrite(new URL("/denied", request.url))
                }
                break;
            }
        }
    },
    {
        callbacks: {
            authorized: (token) => !!token,
        }
    }
);

export const config = {
    matcher: [
        "/dispatcher/:path",
        "/account/admin",
        "/seller/:path*",
        "/buyer/:path",
        "/admin/:path"
    ]
};