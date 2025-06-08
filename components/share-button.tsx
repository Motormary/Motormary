'use client'

import { CheckCircle2, CheckCircleIcon, CheckIcon, Share2Icon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ShareButton() {
  const [success, setSuccess] = useState(false)
  const handleShare = () => {
    const currentUrl = window.location.href

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setSuccess(true)
        toast.success('URL copied to clipboard', {duration: 3000})
      })
      .catch((err) => {
        toast.error('Failed to copy URL to clipboard')
      })
      .finally(() => {
        setTimeout(
          () => setSuccess(false),
          3000
        )
      })
  }

  return (
    <button
      title="Share"
      onClick={handleShare}
      className="ml-auto grid [grid-template-areas:'stack']">
      <AnimatePresence initial={false} mode="popLayout">
        {!success ? (
          <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
            key="share">
            <Share2Icon className="size-5 [grid-area:stack]" />
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="success">
            <CheckCircle2 className="size-5 [grid-area:stack] stroke-green-400" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">Share</span>
    </button>
  )
}
