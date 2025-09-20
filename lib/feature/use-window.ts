import { useWindowProvider } from '@/components/window-context'
import React, { useState } from 'react'

type PointerProps = {
  event: React.PointerEvent
  windowRef: React.RefObject<HTMLElement | null>
}

export default function useWindow() {
  const { handleMinimize, handleCloseWindow, handleFocusWindow } =
    useWindowProvider()
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [dragging, setDragging] = useState(false)
  const [rect, setRect] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  })
  const [isMax, setIsMax] = useState(false)

  function onFocus(windowRef: React.RefObject<HTMLElement | null>) {
    if (!windowRef.current) return
    handleFocusWindow(windowRef.current.id)
  }
  function onPointerDown({ event, windowRef }: PointerProps) {
    if (!windowRef.current || isMax) return

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
    if (!dragging || !windowRef.current || isMax) return

    const rect = windowRef.current.getBoundingClientRect()
    const newX = event.clientX - offset.x
    const newY = event.clientY - offset.y

    // prevents dragging window outside of browser window
    if (
      newY < 0 ||
      newX > window.innerWidth - 10 ||
      newX < -rect.width + 10 ||
      newY > window.innerHeight - 66
    )
      return

    windowRef.current.style.transform = ''
    windowRef.current.style.left = `${newX}px`
    windowRef.current.style.top = `${newY}px`
  }

  function onPointerUp({ event, windowRef }: PointerProps) {
    if (!windowRef.current) return
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

  function onMaximize(windowRef: React.RefObject<HTMLElement | null>) {
    if (!windowRef.current) return
    const el = windowRef.current
    if (isMax) {
      el.style.resize = 'both'
      el.style.maxWidth = '50rem'
      el.style.maxHeight = '80dvh'
      el.style.height = `${rect.height}px`
      el.style.width = `${rect.width}px`
      el.style.top = `${rect.top}px`
      el.style.left = `${rect.left}px`
      setIsMax(false)
    } else {
      const { height, width, top, left } = el.getBoundingClientRect()
      setRect({ height, width, top, left })
      el.style.transform = ''
      el.style.resize = 'none'
      el.style.maxHeight = '100dvh'
      el.style.maxWidth = '100%'
      el.style.width = '100%'
      el.style.height = '100dvh'
      el.style.left = `0`
      el.style.top = `0`
      setIsMax(true)
    }
  }

  function onMinimize(windowRef: React.RefObject<HTMLElement | null>) {
    if (!windowRef.current) return
    handleMinimize(windowRef.current.id)
  }

  function onClose(windowRef: React.RefObject<HTMLElement | null>) {
    if (!windowRef.current) return
    handleCloseWindow(windowRef.current.id)
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onOpen,
    onMaximize,
    onMinimize,
    onClose,
    onFocus,
  }
}
