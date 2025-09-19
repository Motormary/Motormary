'use client'
import { useWindowProvider } from '../window-context'
import SystemClock from './system-clock'

export default function Taskbar() {
  const { windows, handleMinimize } = useWindowProvider()
  return (
    <div className="w-screen h-14 bg-gray-900 fixed bottom-0 left-0 font-ubuntu flex items-center justify-between">
      <div className="flex items-center h-full">
        <button className="hover:bg-gray-500/10 h-full min-w-20">Start</button>
        <div className="w-full h-full flex items-center gap-4">
          {windows
            ? windows?.map((window, index) => (
                <button
                  onClick={() => handleMinimize(window.title)}
                  style={{ animationIterationCount: 1 }}
                  className="px-4 hover:bg-gray-500/10 h-full text-white animate-caret-blink"
                  key={`id=${window.title}-index=${index}`}
                >
                  <span>{window.title}</span>
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
