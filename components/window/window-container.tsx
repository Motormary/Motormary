'use client'

import React, { useRef } from 'react'
import useWindow from '@/lib/feature/use-window'

type Window = {
  close: () => void
  children: React.ReactNode
}

export default function Window({ children, close }: Window) {
  const { onPointerDown, onPointerMove, onPointerUp, onOpen, onMaximize } =
    useWindow()
  const windowRef = useRef<HTMLDivElement>(null)

  function handlePointerDown(event: React.PointerEvent) {
    onPointerDown({ event, windowRef })
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

  return (
    <div
      id="terminal"
      onAnimationEnd={handleOpen}
      ref={windowRef}
      style={{
        height: '100dvh',
        width: '94%',
        top: `50%`,
        left: `50%`,
        transform: `translateY(-50%) translateX(-50%)`,
      }}
      className="animate-appOpen absolute overflow-hidden max-w-[50rem] max-h-[80dvh] rounded-lg border-x-2 border-b-2 border-slate-500 shadow-xl bg-black"
    >
      <div
        onDoubleClick={handleMaximize}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={onPointerUp}
        className="w-full h-10 bg-slate-500 relative after:content-[''] after:absolute after:h-5 after:w-full after:bg-white/20 after:rounded-b-lg before:content-[''] before:absolute before:h-10 before:w-full before:backdrop-blur-xs before:z-10"
      >
        <div className="relative h-7 px-4 float-end z-20 flex items-end gap-4 font-mono font-bold">
          <button className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-amber-500" />
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
