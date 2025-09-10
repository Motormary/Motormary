'use client'

import { login } from '@/app/actions/auth/login'
import { getAllUsers } from '@/app/actions/users/get'
import { Typewriter } from '@/lib/client-utils'
import { TerminalHistory } from '@/lib/definitions'
import React, {
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { copyContentGrid, copyCssReset } from './commands'
import { bootText } from './data'
import History from './history'
import TerminalUser, { TerminalPassword } from './terminalUser'
import WelcomeMsg from './welcome-msg'
import nedry from './ah-ah-ah'
import { Execute } from '@/app/actions/live/execute'

type Terminal = {
  close: () => void
}

export default function Terminal({ close }: Terminal) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [toggleState, setToggleState] = useState(0) // tracks arrowkey up/down through cmd history
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [history, setHistory] = useState<TerminalHistory[]>([]) // System messages
  const [welcomeText, setWelcomeText] = useState<string>('')
  const [command, setCommand] = useState<string>('')
  const [auth, setAuth] = useState({
    isAuthing: false,
    hasAuth: false,
  })
  const [formdata, setFormdata] = useState({
    username: '',
    password: '',
  })
  const [isPending, startTransition] = useTransition()

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
      sudo: async () => {
        try {
          const { stdout, stderr } = await Execute(command)
          setHistory((prev) => [
            ...prev,
            { type: 'system', value: stdout ?? `${stderr}` },
          ])
        } catch (e) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', value: 'Unauthorized access' },
          ])
          nedry()
        }
      },
      log: () =>
        setHistory((prev) =>
          prev.concat(
            commandHistory.map((val) => ({
              type: 'system',
              value: val,
            })),
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
      login: () => {
        const data = command.split(' ')
        if (data.length !== 2) nedry()
        else {
          setAuth((prev) => ({ ...prev, isAuthing: true }))
          setFormdata({ username: data[1], password: '' })
        }
      },
      users: () => {
        startTransition(async () => {
          const data = await getAllUsers()
          setHistory((prev) => [
            ...prev,
            {
              type: 'system',
              value: data.success
                ? `${JSON.stringify(data.data, null, 2)}`
                : 'No data',
            },
          ])
        })
      },
      cssgrid: () => {
        setHistory((prev) => [
          ...prev,
          { type: 'system', value: 'Copied to clipboard' },
        ])
        copyContentGrid()
      },
      cssreset: () => {
        setHistory((prev) => [
          ...prev,
          { type: 'system', value: 'Copied to clipboard' },
        ])
        copyCssReset()
      },
    }
  }

  async function handleCommands(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === 'Enter' && !auth.isAuthing) {
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
        commands()[
          cmdVal[0].toLowerCase() as keyof ReturnType<typeof commands>
        ]

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

    if (event.key === 'Enter' && auth.isAuthing) {
      setAuth((prev) => ({ ...prev, isAuthing: false }))
      startTransition(async () => {
        const res = await login(formdata)
        if (!res.success) return nedry()
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            value: res.success ? 'Success' : 'Failed',
          },
        ])
        setAuth((prev) => ({ ...prev, hasAuth: true }))
        setFormdata({ username: '', password: '' })
      })
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
    if (event.ctrlKey && event.key === 'c') {
      setCommand('')
      if (auth.isAuthing)
        setAuth((prev) => ({ ...prev, isAuthing: false }))
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
        {auth.isAuthing ? (
          <>
            <TerminalPassword />
            <input
              ref={inputRef}
              value={formdata.password}
              onChange={({ target }) =>
                setFormdata((prev) => ({
                  ...prev,
                  password: target.value,
                }))
              }
              onKeyDown={handleCommands}
              type="password"
              className="outline-none w-full"
              autoFocus={auth.isAuthing}
            />
          </>
        ) : (
          <>
            <TerminalUser />
            {isPending ? (
              <div className="ml-2 relative">
                <span className="animate-spin absolute left-0 top-1/2 -translate-y-1/2 size-4 rounded-full border-l shadow-green-500 border-green-400" />
              </div>
            ) : (
              <input
                ref={inputRef}
                value={command}
                onChange={({ target }) => setCommand(target.value)}
                onKeyDown={handleCommands}
                type="text"
                className="outline-none w-full"
                autoFocus
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
