import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/lib/i18n/config'
import { updateSession } from '@/lib/supabase/middleware'

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // 1. Detect/set locale cookie
  intlMiddleware(request)
  // 2. Supabase session refresh + auth redirect
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
