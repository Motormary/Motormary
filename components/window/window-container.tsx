'use client'

import React, { useRef } from 'react'
import useWindow from '@/lib/feature/use-window'
import { cn } from '@/lib/utils'
import { useWindowProvider } from '../window-context'

type Window = {
  close: () => void
  children: React.ReactNode
  title: string
}

export default function Window({ children, close, title }: Window) {
  const {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onOpen,
    onMaximize,
    onMinimize,
  } = useWindow()
  const windowRef = useRef<HTMLDivElement>(null)
  const { getWindowState } = useWindowProvider()

  function handlePointerDown(event: React.PointerEvent) {
    onPointerDown({ event, windowRef })
  }
  function handlePointerUp(event: React.PointerEvent) {
    onPointerUp({ event, windowRef })
  }

  function handlePointerMove(event: React.PointerEvent) {
    onPointerMove({ event, windowRef })
  }

  function handleOpen() {
    onOpen(windowRef)
  }

  function handleMaximize() {
    onMaximize(windowRef)
  }

  function handleMinimize() {
    onMinimize(windowRef)
  }

  return (
    <div
      id={title}
      onAnimationEnd={handleOpen}
      ref={windowRef}
      style={{
        height: '100dvh',
        width: '94%',
        top: `50%`,
        left: `50%`,
        transform: `translateY(-50%) translateX(-50%)`,
      }}
      className={cn(
        getWindowState(title)?.minimized && 'hidden',
        'animate-appOpen absolute overflow-hidden max-w-[50rem] max-h-[80dvh] rounded-lg border border-slate-500 shadow-xl bg-primary/35 backdrop-blur-xl z-10',
      )}
    >
      <div
        onDoubleClick={handleMaximize}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-10 border-b border-slate-500"
      >
        <div className="relative h-7 px-4 float-end z-20 flex items-end gap-4 font-mono font-bold">
          <button
            onClick={handleMinimize}
            className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-amber-500"
          />
          <button
            onClick={handleMaximize}
            className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-orange-600"
          />
          <button
            onClick={close}
            className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-red-500"
          />
        </div>
      </div>
      {children}
    </div>
  )
}
