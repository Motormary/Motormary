'use server'
import 'server-only'

import { cookies } from 'next/headers'

export async function verifySession() {
  const cookieStore = await cookies()

  // Get the session cookie
  const sessionCookie = cookieStore.get('sid')

  if (!sessionCookie) return null
  const cookie = `${sessionCookie.name}=${sessionCookie.value}`

  try {
    const res = await fetch('http://127.0.0.1:9000/verify', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
    })
    if (!res.ok) return null
    return cookie
  } catch (e) {
    console.error(e)
    return null
  }
}
