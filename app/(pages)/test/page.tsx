'use client'

import Moon from '@/components/ui/saturn'
import Sun from '@/components/ui/smiley'
import { motion } from 'motion/react'

export default function Test() {
  return (
    <div className='min-h-[calc(100svh-200px)] flex justify-center items-center'>
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
        <Sun className="size-32 dark:hidden" />
        <Moon className="size-32 hidden dark:block" />
      </motion.div>
    </div>
  )
}
