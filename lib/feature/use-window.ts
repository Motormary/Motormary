import React, { useState } from 'react'

type PointerProps = {
  event: React.PointerEvent
  windowRef: React.RefObject<HTMLElement | null>
}

export default function useWindow() {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  function onPointerDown({ event, windowRef }: PointerProps) {
    if (!windowRef.current) return

    const rect = windowRef.current.getBoundingClientRect()

    // Offset between mouse click and window top-left
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top

    setOffset({ x: offsetX, y: offsetY })
    setDragging(true)

    // Capture pointer so we still get events even if mouse leaves
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  }

  function onPointerMove({ event, windowRef }: PointerProps) {
    if (!dragging || !windowRef.current) return

    const newX = event.clientX - offset.x
    const newY = event.clientY - offset.y

    windowRef.current.style.transform = ''
    windowRef.current.style.left = `${newX}px`
    windowRef.current.style.top = `${newY}px`
  }

  function onPointerUp(event: React.PointerEvent) {
    setDragging(false)
    ;(event.target as HTMLElement).releasePointerCapture(event.pointerId)
  }

  function onOpen(windowRef: React.RefObject<HTMLElement | null>) {
    if (!windowRef.current) return
    const el = windowRef.current
    el.style.minWidth = '250px'
    el.style.minHeight = '250px'
    el.style.resize = 'both'
    el.classList.remove('animate-appOpen')
  }

  return { onPointerDown, onPointerMove, onPointerUp, onOpen }
}
