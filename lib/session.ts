'use server'
import 'server-only'

import { cookies } from 'next/headers'

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
