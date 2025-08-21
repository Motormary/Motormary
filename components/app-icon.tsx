'use client'

import { createPortal } from 'react-dom'
import React, { useState } from 'react'

type App = {
  Node: React.ComponentType<{ close: () => void }>
  children: React.ReactNode
}

export default function App({ Node, children }: App) {
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
      onClick={handleSetOpen}
      className="bg-black group/terminal size-14 rounded-md border-2 border-slate-500 hover:border-slate-400 focus:outline outline-slate-300 font-mono flex items-center justify-center"
    >
      {children}
      {open
        ? createPortal(<Node close={handleClose} />, window.document.body)
        : null}
    </button>
  )
}
