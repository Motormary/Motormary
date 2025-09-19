'use client'

import { useState, useEffect } from 'react'

export default function SystemClock() {
  const [time, setTime] = useState<{
    hours: number | string
    minutes: number | string
  }>({ hours: '00', minutes: '00' })

  useEffect(() => {
    const ticktack = setInterval(() => {
      const date = new Date()
      setTime({ hours: date.getHours(), minutes: date.getMinutes() })
    }, 1000)
    return () => clearInterval(ticktack)
  }, [])
  return (
    <span>
      {time.hours}:{time.minutes}
    </span>
  )
}
