'use client'

import { createPortal } from 'react-dom'
import React, { useEffect, useState } from 'react'
import Window from './window/window-container'

type App = {
  Node: React.ComponentType<{ close: () => void; open: boolean }>
  children: React.ReactNode
  title: string
}

export default function App({ Node, children, title }: App) {
  const [open, setOpen] = useState(false)

  function handleSetOpen() {
    if (open) return
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <button
      disabled={open}
      onClick={handleSetOpen}
      className="max-w-20 p-1 group"
    >
      <div className="bg-black mx-auto size-14 rounded-md border-2 border-slate-500 group-hover:border-slate-400 focus:outline outline-slate-300 font-mono flex items-center justify-center">
        {children}
        {open
          ? createPortal(
              <Window close={handleClose}>
                <Node open={open} close={handleClose} />
              </Window>,
              window.document.body,
            )
          : null}
      </div>
      {title ? <p className="mx-auto max-w-20 truncate">{title}</p> : null}
    </button>
  )
}
