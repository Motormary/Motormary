'use server'

import { setSession } from '@/lib/session'

type props = {
  username: string
  password: string
}

export async function login(data: props) {
  if (!data.password || !data.username) return { success: false, data: null }
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const res = await fetch('http://127.0.0.1:9000/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  })

  if (!res.ok) return { success: false, data: null }
  const setCookie = res.headers.get('set-cookie')
  await setSession(setCookie)
  return { success: true, data: null }
}
