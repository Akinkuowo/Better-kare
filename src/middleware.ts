import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Exclude admin login and register from any protection
    if (path === '/admin/login' || path === '/admin/register') {
        return NextResponse.next()
    }

    // Protect all other /admin routes
    if (path.startsWith('/admin')) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        })

        // If no token or not an admin, redirect to home
        if (!token || (token as any).role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}