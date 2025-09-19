'use client'

import { useState, useEffect } from 'react'

export default function SystemClock() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<{
    hours: number | string
    minutes: number | string
  }>({ hours: 0, minutes: 0 })

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 1000)
    const ticktack = setInterval(() => {
      const date = new Date()
      setTime({ hours: date.getHours(), minutes: date.getMinutes() })
    }, 1000)
    return () => clearInterval(ticktack)
  }, [])
  if (!mounted) return null
  return (
    <span>
      {(time.hours as number) < 10 ? `0${time.hours}` : time.hours}:
      {(time.minutes as number) < 10 ? `0${time.minutes}` : time.minutes}
    </span>
  )
}
