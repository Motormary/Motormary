'use server'

import { verifySession } from '../auth/verify-session'

export async function getAllUsers() {
  const session = await verifySession()
  if (!session) return { data: null, success: false }
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('cookie', session)
  const res = await fetch('http://127.0.0.1:9000/users', {
    method: 'GET',
    headers,
  })

  if (!res.ok) return { success: false, data: null }
  const data = await res.json()

  return { success: true, data }
}
