import { DefaultIcon } from '../app-icon'

export default function TerminalIcon() {
  return (
    <DefaultIcon>
      <span className="text-green-400">$</span>
      <span className="hover:animate-carret">_</span>
    </DefaultIcon>
  )
}
