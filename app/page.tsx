import App from '@/components/app-icon'
import ConverterIcon from '@/components/img-converter/converter-icon'
import ImgConverter from '@/components/img-converter/img-converter'
import Taskbar from '@/components/taskbar/taskbar'
import Terminal from '@/components/terminal/terminal'
import TerminalIcon from '@/components/terminal/terminal-icon'
import { ImgFolder } from '@/lib/folder/folder'
import FolderIcon from '@/lib/folder/folder-icon'

export default function Home() {
  return (
    <main className="h-[100dvh] w-full flex gap-4 bg-background items-center justify-center p-4 relative overflow-hidden">
      <App title="Terminal" Node={Terminal}>
        <TerminalIcon />
      </App>
      <App title="Magick" Node={ImgConverter}>
        <ConverterIcon />
      </App>
      <App title="Images" Node={ImgFolder}>
        <FolderIcon />
      </App>
      <Taskbar />
    </main>
  )
}
