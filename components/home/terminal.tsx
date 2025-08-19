'use client'

import { useEffect, useState } from 'react'

export default function Terminal() {
  const [text, setText] = useState('')

  function getBootText() {
    const boot = 'Hello there...'
    let cur = ''
    const typing = setInterval(() => {
      cur = cur + boot[cur.length]
      setText(cur)
      if (cur.length === boot.length) clearInterval(typing)
    }, 80)
  }

  useEffect(() => {
    setTimeout(() => getBootText(), 2000)
  }, [])

  return (
    <p className="opacity-0 animate-fadeIn">
      <span className="text-green-600">Server</span>
      <span>:</span>
      <span className="text-blue-600">~</span>
      <span>$ </span>
      {text}
      <span className="animate-carret">|</span>
    </p>
  )
}
