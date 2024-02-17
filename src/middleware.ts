import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const routePermissions: { [key: string]: Array<string> } = {
    // CONCRETE URLS
    '^(\/account\/admin)': ["ADMIN"],
    '^(\/orders)': ["BUYER", "DISPATCHER", "SELLER"],
    // DYNAMIC URLS
    '^(\/dispatcher).*': ["DISPATCHER", "ADMIN"],
    '^(\/seller).*': ["SELLER", "ADMIN"],
    '^(\/buyer).*': ["BUYER", "ADMIN"],
    '^(\/admin).*': ["ADMIN"],
};

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const sessionUserType = request.nextauth.token?.custome_data?.user_type as string;
        const pathName: string = request.nextUrl.pathname as string;
        console.log(sessionUserType,pathName);
        for (let path_regx of Object.keys(routePermissions)) {
            if (pathName.match(new RegExp(path_regx))) {
                if (!routePermissions[path_regx].includes(sessionUserType)) {
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
        "/account/admin",
        "/dispatcher/:path*",
        "/seller/:path*",
        "/buyer/:path*",
        "/admin/:path*"
    ]
};