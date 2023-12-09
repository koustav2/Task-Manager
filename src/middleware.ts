// import getCurrentUser from '@/utils/getCurrentUser'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isAuth = await getToken({ req })
    const isPublicPath = path === '/login' || path === '/register' 
    const isPrivatePath = path === '/' || path === '/completed' || path === '/important' || path === '/incomplete'
    if (isPublicPath && isAuth) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    if (isPrivatePath && !isAuth) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

}

export const config = {
    matcher: [
        '/',
        '/completed',
        '/important',
        '/incomplete',
        '/login',
        '/register',
    ]
}