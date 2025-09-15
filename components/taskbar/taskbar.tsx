'use client'
import { useWindowProvider } from '../window-context'

export default function Taskbar() {
  const { windows, handleMinimize } = useWindowProvider()
  return (
    <div className="w-screen h-14 bg-gray-900 fixed bottom-0 left-0 font-ubuntu flex items-center">
      <button className="hover:bg-gray-500/10 h-full w-20">Start</button>
      <div className="w-full h-full flex items-center gap-4">
        {windows
          ? windows?.map((window) => (
              <button
                onClick={() => handleMinimize(window.title)}
                className="px-4 hover:bg-gray-500/10 h-full text-white"
                key={window.title}
              >
                <span>{window.title}</span>
              </button>
            ))
          : null}
      </div>
    </div>
  )
}
