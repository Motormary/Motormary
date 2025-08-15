'use client'
//12
import Moon from '@/components/ui/saturn'
import Sun from '@/components/ui/smiley'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const { setTheme } = useTheme()
  const [clicked, setClicked] = useState(false)
  const [rotate, setRotate] = useState(360)

  function handleClick(theme: string) {
    setRotate(rotate + 360)
    setTimeout(() => {
      setTheme(theme)
    }, 400)
    if (!clicked) setClicked(true)
  }

  return (
    <div className="min-h-screen grid place-items-center overflow-hidden">
      <div className="flex w-full flex-col items-center justify-center opacity-0 animate-fade-in relative">
        <div
          className={cn(
            clicked
              ? 'hidden'
              : "rounded-md border-2 select-none p-4 bg-background absolute left-1/2 -top-64 translate-x-6 after:absolute after:content-[''] after:w-[14px] after:h-[14px] after:border-r-2 after:bg-background after:skew-x-[45deg] after:rotate-[90deg] after:border-b-2 after:left-[10px] after:border-border after:bottom-[-8px]"
          )}>
          <p className="text-xs whitespace-nowrap">Click me!</p>
        </div>
        <div className='bg-background w-full absolute h-[500px] top-16 z-0'/>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: rotate }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          className="absolute w-[600px] h-[600px] rounded-full -z-20">
          <motion.div
            className="absolute left-1/2"
            initial={{ rotate: '-30deg', translateX: '-50%' }}
            animate={{ rotate: '30deg' }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              bounce: '0',
              stiffness: '0',
              ease: 'easeInOut',
            }}>
            <Sun
              onClick={() => handleClick('dark')}
              className="size-32 dark:hidden cursor-pointer"
            />
            <Moon
              onClick={() => handleClick('light')}
              className="size-32 hidden dark:block cursor-pointer"
            />
          </motion.div>
        </motion.div>
        {/* Name */}
        <h1 className="max-md:text-4xl md:text-7xl relative text-gradient dark:text-gradient-moon font-bold whitespace-nowrap z-10">
          Mathias K. Moen
        </h1>
        {/* Occupation with typewriter animation */}
        <div className="flex items-center gap-1 mt-2">
          <span className="font-semibold text-slate-500 z-10">{'>'}</span>
          <p
            className="relative w-[max-content] text-xl font-mono
        before:absolute before:inset-0 before:animate-typewriter
        after:bg-foreground
        after:absolute after:inset-0 after:w-[0.5em] after:h-[1.75ch] after:top-1 after:animate-caret
        before:bg-background">
            Front-End Developer
          </p>
        </div>
        <div className="mt-20 mb-5 z-10">
          {/* Enter link */}
          <Link
            className="text-xl border-2 rounded-full py-2 px-4 hover:border-primary active:border-primary transition"
            href="/portfolio">
            Enter
          </Link>
        </div>
      </div>
    </div>
  )
}
