'use server'
import 'server-only'

import { getCookie } from '@/lib/session'

export async function verifySession() {
  const sessionCookie = await getCookie('sid')

  if (!sessionCookie) return null

  try {
    const res = await fetch('http://127.0.0.1:9000/verify', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        cookie: sessionCookie,
      },
    })
    if (!res.ok) return false
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
