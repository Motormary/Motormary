'use client'

import { Typewriter } from '@/lib/client-utils'
import React, { useEffect, useRef, useState } from 'react'

const bootText = `Welcome to Skyen
\nWIP - This page will be updated everyday
\nType help to see commands`
const startText = 'Hello there...'

export default function Terminal() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [toggleState, setToggleState] = useState(0)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
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
      const max = commandHistory.length
      console.log('max', max)
      console.log('toggle', toggleState)
      console.log('history', commandHistory)
      if (toggleState >= max) return
      setCommand(commandHistory[toggleState])
      setToggleState(() => toggleState + 1)
    }
  }

  useEffect(() => {
    if (textAreaRef.current) {
      const el = textAreaRef.current
      el.style.height = 'auto'
      el.style.minHeight = `${el.scrollHeight}px`
    }
  }, [welcome])

  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  function handlePointerDown(event: React.PointerEvent) {
    if (!windowRef.current) return

    const rect = windowRef.current.getBoundingClientRect()

    // Offset between mouse click and window top-left
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top

    setOffset({ x: offsetX, y: offsetY })
    setDragging(true)

    // Capture pointer so we still get events even if mouse leaves
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent) {
    if (!dragging || !windowRef.current) return

    const newX = event.clientX - offset.x
    const newY = event.clientY - offset.y

    windowRef.current.style.transform = ''
    windowRef.current.style.left = `${newX}px`
    windowRef.current.style.top = `${newY}px`
  }

  function handlePointerUp(event: React.PointerEvent) {
    setDragging(false)
    ;(event.target as HTMLElement).releasePointerCapture(event.pointerId)
  }

  function handleAnimationEnd() {
    if (!windowRef.current) return
    const el = windowRef.current
    el.style.minWidth = '250px'
    el.style.minHeight = '250px'
    el.style.resize = 'both'
    el.classList.remove('animate-appOpen')
  }

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
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
        onPointerUp={handlePointerUp}
        className="w-full h-10 bg-slate-500 relative after:content-[''] after:absolute after:h-5 after:w-full after:bg-white/20 after:rounded-b-lg before:content-[''] before:absolute before:h-10 before:w-full before:backdrop-blur-xs before:z-10"
      >
        <div className="relative h-7 px-4 float-end z-20 flex items-end gap-4 font-mono font-bold">
          <button className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-amber-500"></button>
          <button className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-orange-600"></button>
          <button className="cursor-pointer rounded-sm size-4 flex items-center justify-center bg-red-500"></button>
        </div>
      </div>
      <div
        className="opacity-0 animate-fadeIn font-ubuntu text-lg flex flex-col disabled relative p-2 overflow-x-auto overflow-y-auto h-[calc(100%-40px)]"
        style={{ scrollbarWidth: 'thin' }}
        onClick={() => inputRef?.current?.focus()}
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
