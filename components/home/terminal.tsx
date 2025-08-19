'use client'

import { Typewriter } from '@/lib/client-utils'
import React, { useEffect, useRef, useState } from 'react'

const bootText = `Welcome to Skyen
\nWIP - This page will be updated everyday\n
\nType help to see commands`
const startText = 'Hello there...'

export default function Terminal() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [welcome, setWelcome] = useState<string>('')
  const [history, setHistory] = useState<
    {
      type: 'system' | 'user'
      value: string
    }[]
  >([])
  const [command, setCommand] = useState<string>('')

  const commands = () => {
    return {
      help: () =>
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            value: `help                Show available commands
clear               Clears screen history
sudo                Gain access to root`,
          },
        ]),
      clear: () => {
        setHistory([])
        setWelcome('')
        if (textAreaRef.current) textAreaRef.current.style.display = 'none'
      },
      sudo: () => {
        setHistory((prev) => [
          ...prev,
          { type: 'system', value: 'Unauthorized access' },
        ])
      },
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      const isBooted = await Typewriter({
        setState: setWelcome,
        text: bootText,
        speed: 10,
      })
      if (isBooted) Typewriter({ setState: setCommand, text: startText })
    }, 2000)
  }, [])

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setHistory((prev) => [
        ...prev,
        {
          type: 'user',
          value: `${command}`,
        },
      ])

      const cmd = commands()[command as keyof ReturnType<typeof commands>]

      if (cmd) {
        cmd()
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'system', value: `Command not found: ${command}` },
        ])
      }
      setCommand('')
      setTimeout(() => {
        inputRef?.current?.scrollIntoView()
      }, 0)
    }
  }

  useEffect(() => {
    if (textAreaRef.current) {
      const el = textAreaRef.current
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }, [welcome])

  return (
    <div
      className="opacity-0 animate-fadeIn font-ubuntu text-lg flex flex-col disabled relative p-2 overflow-x-hidden overflow-y-auto h-[calc(100%-40px)]"
      style={{ scrollbarWidth: 'thin' }}
    >
      <textarea
        ref={textAreaRef}
        value={welcome}
        onChange={() => null}
        disabled
        spellCheck={false}
        className="p-0 outline-none overflow-hidden text-slate-400 resize-none"
      />
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
      <div className="w-full flex">
        <TerminalUser />
        {/* <span className="animate-carret">|</span> */}
        <input
          ref={inputRef}
          value={command}
          onChange={({ target }) => setCommand(target.value)}
          onKeyDown={handleKey}
          type="text"
          className="outline-none w-full"
          autoFocus
        />
      </div>
    </div>
  )
}

function TerminalUser() {
  return (
    <>
      <span className="text-green-400">sysadmin@server</span>
      <span>:</span>
      <span className="text-blue-400">~</span>
      <span className="mr-1">$</span>
    </>
  )
}
