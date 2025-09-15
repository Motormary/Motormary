'use client'
import { createContext, useContext, useState } from 'react'

type Window = {
  icon: React.ReactNode
  title: string
  minimized: boolean
  focused: boolean
}

type WindowContextType = {
  windows: Window[] | null
  handleOpenWindow: (window: Window) => void
  handleCloseWindow: (title: string) => void
  handleMinimize: (title: string) => void
  getWindowState: (title: string) => Window | undefined
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function useWindowProvider() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider')
  }
  return context
}

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Window[] | null>(null)

  function handleOpenWindow(window: Window) {
    if (windows?.length) {
      setWindows([...windows, window])
    } else setWindows([window])
  }
  function handleCloseWindow(title: string) {
    if (windows?.length && windows.some((win) => win.title === title)) {
      const newWindows = removeFromArray(windows, title)
      setWindows(newWindows.length ? newWindows : null)
    }
  }
  function handleMinimize(title: string) {
    if (
      windows?.length &&
      windows.some((win) => win.title === title && !win.minimized)
    ) {
      const updatedWindows = windows.reduce((acc: Window[], win) => {
        if (win.title === title) {
          win.minimized = true
          win.focused = false
        }
        acc.push(win)
        return acc
      }, [])
      setWindows(updatedWindows)
    } else {
      if (
        windows?.length &&
        windows.some((win) => win.title === title && win.minimized)
      ) {
        const updatedWindows = windows.reduce((acc: Window[], win) => {
          if (win.title === title) {
            win.minimized = false
            win.focused = true
          }
          acc.push(win)
          return acc
        }, [])
        setWindows(updatedWindows)
      } else {
      }
    }
  }

  function getWindowState(title: string) {
    return windows?.find((win) => win.title === title)
  }

  return (
    <WindowContext
      value={{
        windows,
        handleOpenWindow,
        handleCloseWindow,
        handleMinimize,
        getWindowState,
      }}
    >
      {children}
    </WindowContext>
  )
}

function removeFromArray(array: Window[], val: string) {
  return array.filter((arr) => arr.title !== val)
}
