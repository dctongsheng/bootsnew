import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for authentication cookie
    const authCookie = request.cookies.get('admin-auth')
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
