'use client'

import Moon from '@/components/ui/saturn'
import Sun from '@/components/ui/smiley'
import { ModeToggle } from '@/components/ui/toggle-mode'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Home() {
  const { setTheme } = useTheme()

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex w-full flex-col items-center justify-center opacity-0 animate-fade-in">
        <motion.div
          className="mb-12"
          initial={{ rotate: '-30deg' }}
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
            onClick={() => setTheme('dark')}
            className="size-32 dark:hidden cursor-pointer"
          />
          <Moon
            onClick={() => setTheme('light')}
            className="size-32 hidden dark:block cursor-pointer"
          />
        </motion.div>
        {/* Name */}
        <h1 className="max-md:text-4xl md:text-7xl relative text-gradient dark:text-gradient-moon font-bold whitespace-nowrap z-10">
          Mathias K. Moen
        </h1>
        {/* Occupation with typewriter animation */}
        <div className="flex items-center gap-1 mt-2">
          <span className="font-semibold text-slate-500">{'>'}</span>
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
