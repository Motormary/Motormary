import { TerminalHistory } from '@/lib/definitions'
import TerminalUser from './terminalUser'

export default function History({ history }: { history: TerminalHistory[] }) {
  return (
    <>
      {history.length > 0
        ? history.map((line, index) => {
            if (line.type === 'user') {
              return (
                <div
                  key={`index=${index}-L=${line.value.length}`}
                  className="flex"
                >
                  {line.type === 'user' ? <TerminalUser /> : null}
                  <p>{line.value}</p>
                </div>
              )
            } else {
              return (
                <pre
                  key={`index=${index}-L${line.value.length}`}
                  className="whitespace-pre"
                >
                  {line.value}
                </pre>
              )
            }
          })
        : null}
    </>
  )
}
