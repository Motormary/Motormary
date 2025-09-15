import { createRoot, Root } from 'react-dom/client'
import Window from '../window/window-container'

export default function nedry() {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const root: Root = createRoot(container)

  const close = () => {
    root.unmount()
    container.remove()
  }

  root.render(
    <Window title="nedry" close={close}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/RfiQYRn7fBg?start=10&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      ></iframe>
    </Window>,
  )
}
