import App from '@/components/app-icon'
import ConverterIcon from '@/components/img-converter/converter-icon'
import Paint from '@/components/paint/paint'
import PaintIcon from '@/components/paint/paint-icon'
import Taskbar from '@/components/taskbar/taskbar'
import Terminal from '@/components/terminal/terminal'
import TerminalIcon from '@/components/terminal/terminal-icon'
import { verifySession } from './actions/auth/verify-session'
import ImgConverter from '@/components/img-converter/img-converter'

export default async function Home() {
  const isAuthed = await verifySession()
  return (
    <main className="h-[100dvh] w-full grid gap-2 grid-rows-[repeat(auto-fill,minmax(80px,1fr))] p-4 relative overflow-hidden">
      <App title="Terminal" Node={Terminal}>
        <TerminalIcon />
      </App>
      {isAuthed ? (
        <App title="Magick" Node={ImgConverter}>
          <ConverterIcon />
        </App>
      ) : null}
      <App title="Bob Ross" Node={Paint}>
        <PaintIcon />
      </App>
      <Taskbar />
    </main>
  )
}
