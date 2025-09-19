'use client'
import { createContext, useContext, useState } from 'react'

type Window = {
  icon: React.ReactNode
  title: string
  minimized: boolean
  focused: boolean
  open: boolean
}

type WindowContextType = {
  windows: Window[] | null
  handleOpenWindow: (window: Window) => void
  handleCloseWindow: (title: string) => void
  handleMinimize: (title: string) => void
  getWindowState: (title: string) => Window | undefined
  handleFocusWindow: (title: string) => void
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function useWindowProvider(): WindowContextType {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider')
  }
  return context
}

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Window[] | null>(null)

  function handleOpenWindow(window: Window): void {
    if (windows?.length) {
      const newWindows = windows.reduce((acc: Window[], win) => {
        win.focused = false
        acc.push(win)
        return acc
      }, [])
      setWindows([...newWindows, window])
    } else setWindows([window])
  }
  function handleCloseWindow(title: string): void {
    if (windows?.length && windows.some((win) => win.title === title)) {
      const newWindows = removeFromArray(windows, title)
      setWindows(newWindows.length ? newWindows : null)
    }
  }
  function handleMinimize(title: string): void {
    if (!windows) return
    const selectedWindow = windows?.find((win) => win.title === title)
    if (selectedWindow && !selectedWindow.minimized) {
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
      if (selectedWindow && selectedWindow?.minimized) {
        const updatedWindows = windows.reduce((acc: Window[], win) => {
          if (win.title === title) {
            win.minimized = false
            win.focused = true
          }
          acc.push(win)
          return acc
        }, [])
        setWindows(updatedWindows)
      }
    }
  }

  function getWindowState(title: string): Window | undefined {
    return windows?.find((win) => win.title === title)
  }

  function handleFocusWindow(title: string): void {
    if (!windows) return
    const updatedWindows = windows.reduce((acc: Window[], win) => {
      if (win.title === title) {
        win.focused = true
      } else {
        win.focused = false
      }
      acc.push(win)
      return acc
    }, [])
    setWindows(updatedWindows)
  }

  return (
    <WindowContext
      value={{
        windows,
        handleOpenWindow,
        handleCloseWindow,
        handleMinimize,
        getWindowState,
        handleFocusWindow,
      }}
    >
      {children}
    </WindowContext>
  )
}

function removeFromArray(array: Window[], val: string): Window[] {
  return array.filter((arr) => arr.title !== val)
}
