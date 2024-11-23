// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile', '/settings']

export function middleware(request: NextRequest) {
  
  const response = NextResponse.next()

    // Add CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Remove WWW-Authenticate to prevent browser auth popup
  response.headers.delete('WWW-Authenticate')

  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Redirect to dashboard if logged in user tries to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect to login if unauthenticated user tries to access protected routes
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response;
}

export const config = {
  matcher: ['/login', '/dashboard', '/dashboard/health', '/profile', '/settings', '/api/:path*']
}