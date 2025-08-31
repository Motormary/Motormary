import App from '@/components/app-icon'
import Paint from '@/components/paint/paint'
import PaintIcon from '@/components/paint/paint-icon'
import Taskbar from '@/components/taskbar/taskbar'
import Terminal from '@/components/terminal/terminal'
import TerminalIcon from '@/components/terminal/terminal-icon'

export default function Home() {
  return (
    <main className="h-[100dvh] w-full grid gap-2 grid-rows-[repeat(auto-fill,minmax(80px,1fr))] p-4 relative overflow-hidden">
      <App title="Terminal" Node={Terminal}>
        <TerminalIcon />
      </App>
      <App title="Bob Ross" Node={Paint}>
        <PaintIcon />
      </App>
      <Taskbar />
    </main>
  )
}
