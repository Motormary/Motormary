'use client'

import { Typewriter } from '@/lib/client-utils'
import { TerminalHistory } from '@/lib/definitions'
import React, { useEffect, useRef, useState } from 'react'
import TerminalUser from './terminalUser'
import { bootText } from './data'
import WelcomeMsg from './welcome-msg'
import History from './history'
import Window from '../window/window-container'
import { createRoot, Root } from 'react-dom/client'

type Terminal = {
  close: () => void
}

function nedry() {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const root: Root = createRoot(container)

  const close = () => {
    root.unmount()
    container.remove()
  }

  root.render(
    <Window close={close}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/RfiQYRn7fBg?autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      ></iframe>
    </Window>,
  )
}

export default function Terminal({ close }: Terminal) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [toggleState, setToggleState] = useState(0)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [history, setHistory] = useState<TerminalHistory[]>([])
  const [welcomeText, setWelcomeText] = useState<string>('')
  const [command, setCommand] = useState<string>('')

  const commands = () => {
    return {
      help: () =>
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            value: `help      Show available commands
clear     Clears screen history
sudo      Gain access to root
log       Prints command history
exit      Closes terminal window
ping      Pings target host`,
          },
        ]),
      clear: () => {
        setHistory([])
        setWelcomeText('')
      },
      sudo: () => {
        setHistory((prev) => [
          ...prev,
          { type: 'system', value: 'Unauthorized access' },
        ])
        nedry()
      },
      log: () =>
        setHistory((prev) =>
          prev.concat(
            commandHistory.map((val) => ({ type: 'system', value: val })),
          ),
        ),
      ping: () => {
        const addr = command.split(' ')
        if (addr.length > 2 || !addr[1])
          return setHistory((prev) => [
            ...prev,
            {
              type: 'system',
              value: `Invalid address: ${addr.slice(1).join(',').replace(',', ' ')}`,
            },
          ])
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            value: `Pinging ${addr[1]} with 32 bytes of data:`,
          },
        ])
        let nr = 0
        const inter = setInterval(() => {
          if (nr >= 4) return clearInterval(inter)
          nr++
          setHistory((prev) => [
            ...prev,
            {
              type: 'system',
              value: `Reply from ${addr[1]}: bytes=32 time=18ms TTL=249`,
            },
          ])
        }, 1000)
      },
      exit: () => close(),
    }
  }

  function handleCommands(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setToggleState(-1)
      setHistory((prev) => [
        ...prev,
        {
          type: 'user',
          value: `${command}`,
        },
      ])

      const cmdVal = command.split(' ')
      const cmd =
        commands()[cmdVal[0].toLowerCase() as keyof ReturnType<typeof commands>]

      if (cmd) {
        setCommandHistory((prev) => [...prev, command])
        cmd()
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'system', value: `Command not found: ${command}` },
        ])
      }
      setCommand('')
      setTimeout(() => {
        setToggleState(0)
        inputRef?.current?.scrollIntoView()
      }, 0)
    }
    if (event.key === 'ArrowUp') {
      if (!commandHistory.length) return
      const list = [...commandHistory].reverse()
      const maxIndex = list.length - 1
      setCommand(list[toggleState])
      if (toggleState === maxIndex) return
      setToggleState((prev) => prev + 1)
    }
    if (event.key === 'ArrowDown') {
      const list = [...commandHistory].reverse()
      if (toggleState === 0) return setCommand('')
      else if (toggleState > 0) setCommand(list[toggleState - 1])
      setToggleState(() => toggleState - 1)
    }
  }

  function handleFocusWindow() {
    inputRef?.current?.focus()
  }

  useEffect(() => {
    setTimeout(() => {
      Typewriter({
        setState: setWelcomeText,
        text: bootText,
        speed: 20,
      })
    }, 2000)
  }, [])

  return (
    <div
      className="opacity-0 animate-fadeIn font-ubuntu text-lg flex flex-col disabled relative p-2 overflow-x-auto overflow-y-auto h-[calc(100%-40px)]"
      style={{ scrollbarWidth: 'thin' }}
      onClick={handleFocusWindow}
    >
      <WelcomeMsg welcome={welcomeText} />
      <History history={history} />
      <div className="w-full flex">
        <TerminalUser />
        <input
          ref={inputRef}
          value={command}
          onChange={({ target }) => setCommand(target.value)}
          onKeyDown={handleCommands}
          type="text"
          className="outline-none w-full"
          autoFocus
        />
      </div>
    </div>
  )
}
