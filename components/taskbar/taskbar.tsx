'use client'
import { cn } from '@/lib/utils'
import { useWindowProvider } from '../window-context'
import SystemClock from './system-clock'
import { X } from 'lucide-react'

export default function Taskbar() {
  const { windows, handleMinimize, handleCloseWindow } = useWindowProvider()
  return (
    <div
      className="w-screen h-14 bg-primary-foreground fixed bottom-0 left-0 overflow-hidden overflow-x-auto font-ubuntu flex items-center justify-between z-50"
      style={{ scrollbarWidth: 'thin' }}
    >
      <div className="flex items-center h-full">
        {/* <button className="hover:bg-gray-500/10 h-full min-w-20">Start</button> */}
        <div className="w-full h-full flex items-center">
          {windows
            ? windows?.map((window, index) => (
                <button
                  onClick={() => handleMinimize(window.title)}
                  style={{ animationIterationCount: 1 }}
                  className="px-2 hover:bg-gray-500/10 h-full group relative text-white flex items-center"
                  key={`id=${window.title}-index=${index}`}
                >
                  <div className="scale-[0.3] size-8 mb-2">{window.icon}</div>
                  <p className="pr-2">{window.title}</p>
                  <span
                    className={cn(
                      window.minimized && 'hidden',
                      'absolute w-full h-1.5 bg-sky-500 bottom-0 left-0',
                    )}
                  />
                  <X
                    className="group-hover:opacity-100 group-focus-visible:opacity-100 opacity-0 size-4 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCloseWindow(window.title)
                    }}
                  />
                </button>
              ))
            : null}
        </div>
      </div>
      <div className="px-8">
        <SystemClock />
      </div>
    </div>
  )
}
