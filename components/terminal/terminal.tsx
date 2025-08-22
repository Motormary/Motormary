'use client'

import { Typewriter } from '@/lib/client-utils'
import { TerminalHistory } from '@/lib/definitions'
import React, { useEffect, useRef, useState } from 'react'
import TerminalUser from './terminalUser'
import { bootText } from './data'
import WelcomeMsg from './welcome-msg'
import useWindow from '@/lib/feature/use-window'
import History from './history'

type Terminal = {
  close: () => void
}

export default function Terminal({ close }: Terminal) {
  const { onPointerDown, onPointerMove, onPointerUp, onOpen, onMaximize } =
    useWindow()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [toggleState, setToggleState] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [history, setHistory] = useState<TerminalHistory[]>([])
  const [welcomeText, setWelcomeText] = useState<string>('')
  const [command, setCommand] = useState<string>('')
  const windowRef = useRef<HTMLDivElement>(null)

  const commands = () => {
    return {
      help: () =>
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            value: `help                Show available commands
clear               Clears screen history
sudo                Gain access to root
log                 Prints command history
exit                Closes terminal window`,
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
      },
      log: () =>
        setHistory((prev) =>
          prev.concat(
            commandHistory.map((val) => ({ type: 'system', value: val })),
          ),
        ),
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

      const cmd =
        commands()[command.toLowerCase() as keyof ReturnType<typeof commands>]

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
      const maxIndex = commandHistory.length - 1
      setCommand(commandHistory[toggleState])
      if (toggleState === maxIndex) return
      setToggleState((prev) => prev + 1)
    }
    if (event.key === 'ArrowDown') {
      if (toggleState === 0) return setCommand('')
      else if (toggleState > 0) setCommand(commandHistory[toggleState - 1])
      setToggleState(() => toggleState - 1)
    }
  }

  function handlePointerDown(event: React.PointerEvent) {
    onPointerDown({ event, windowRef })
  }

  function handlePointerMove(event: React.PointerEvent) {
    onPointerMove({ event, windowRef })
  }

  function handleOpen() {
    onOpen(windowRef)
  }

  function handleFocusWindow() {
    inputRef?.current?.focus()
  }

  function handleMaximize() {
    onMaximize(windowRef)
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
      id="terminal"
      onAnimationEnd={handleOpen}
      ref={windowRef}
      style={{
        height: '100%',
        width: '94%',
        top: `50%`,
        left: `50%`,
        transform: `translateY(-50%) translateX(-50%)`,
      }}
      className="animate-appOpen absolute overflow-hidden max-w-[50rem] max-h-[80dvh] sm:max-h-[37.5rem] rounded-lg border-x-2 border-b-2 border-slate-500 shadow-xl bg-black"
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={onPointerUp}
        className="w-full h-10 bg-slate-500 relative after:content-[''] after:absolute after:h-5 after:w-full after:bg-white/20 after:rounded-b-lg before:content-[''] before:absolute before:h-10 before:w-full before:backdrop-blur-xs before:z-10"
      >
        <div className="relative h-7 px-4 float-end z-20 flex items-end gap-4 font-mono font-bold">
          <button className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-amber-500" />
          <button
            onClick={handleMaximize}
            className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-orange-600"
          />
          <button
            onClick={close}
            className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-red-500"
          />
        </div>
      </div>
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
    </div>
  )
}
