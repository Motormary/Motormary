'use client'

import { createPortal } from 'react-dom'
import React, { useState } from 'react'
import Window from './window/window-container'
import { useWindowProvider } from './window-context'

type App = {
  Node: React.ComponentType<{ title: string; open: boolean }>
  children: React.ReactNode
  title: string
}

export default function App({ Node, children, title }: App) {
  const {
    handleOpenWindow,
    handleCloseWindow,
    getWindowState,
    handleMinimize,
  } = useWindowProvider()
  const open = getWindowState(title)?.open

  function handleSetOpen() {
    if (open && getWindowState(title)?.minimized) handleMinimize(title)
    if (open) return
    console.log('open')
    handleOpenWindow({
      focused: false,
      icon: children,
      minimized: false,
      title,
      open: true,
    })
  }

  function handleClose() {
    console.log('closed')
    handleCloseWindow(title)
  }

  return (
    <button
      key={`icon-${title}`}
      onClick={handleSetOpen}
      className="max-w-20 p-1 group"
    >
      <div className="bg-black mx-auto size-14 rounded-md border-2 border-slate-500 group-hover:border-slate-400 focus:outline outline-slate-300 font-mono flex items-center justify-center overflow-hidden">
        {children}
        {open
          ? createPortal(
              <Window title={title}>
                <Node open={open} title={title} />
              </Window>,
              window.document.body,
            )
          : null}
      </div>
      {title ? <p className="mx-auto max-w-20 truncate">{title}</p> : null}
    </button>
  )
}
