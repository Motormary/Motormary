'use server'
import 'server-only'

import { getCookie } from '@/lib/session'
import { getBaseApi } from '@/lib/server-utils'

export async function verifySession() {
  const sessionCookie = await getCookie('sid')

  if (!sessionCookie) return null

  try {
    const res = await fetch(getBaseApi('verify'), {
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
