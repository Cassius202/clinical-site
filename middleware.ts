import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 1. Only run this logic for paths starting with /admin
  if (pathname.startsWith('/admin')) {
    // 2. Check for a special cookie we will set later
    const isAdmin = request.cookies.get('admin_access')?.value

    // 3. If the cookie isn't "true", redirect them to a login page or home
    if (isAdmin !== 'true') {
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
    if (pathname === '/admin-login' && isAdmin === 'true') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// Ensure middleware only runs on admin routes to save performance
export const config = {
  matcher: '/admin/:path*',
}