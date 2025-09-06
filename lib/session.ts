'use server'
import 'server-only'

import { cookies } from 'next/headers'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cache } from 'react'

export async function setSession(setCookieHeader: string | null = '') {
  if (setCookieHeader) {
    const cookie = await cookies()
    const sessionCookie = setCookieHeader.split(';')[0].split('=')

    try {
      cookie.set(sessionCookie[0], sessionCookie[1], {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
      })
    } catch (e) {
      console.error('error setting cookie:', e)
    }
  }
}

export const getCookieCache = cache(async (cookieName: string) => await getCookie(cookieName))

export async function getCookie(cookieName: string): Promise<string | null | undefined> {
  const cookieStore = await cookies()
  if (cookieStore.has(cookieName)) {
    const sessionCookie = cookieStore.get(cookieName)
    return `${sessionCookie?.name}=${sessionCookie?.value}`
  }
  return null
}
