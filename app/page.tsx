import App from '@/components/app-icon'
import Taskbar from '@/components/taskbar/taskbar'
import Terminal from '@/components/terminal/terminal'
import TerminalIcon from '@/components/terminal/terminal-icon'

export default function Home() {
  return (
    <main className="h-[100dvh] w-full flex flex-col p-4 relative overflow-hidden">
      <App Node={Terminal}>
        <TerminalIcon />
      </App>
      <Taskbar />
    </main>
  )
}
