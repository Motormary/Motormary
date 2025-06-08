'use client'

import { motion, TargetAndTransition } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const item: { hidden: TargetAndTransition; show: TargetAndTransition } = {
  hidden: { translateY: '100%', opacity: 0 },
  show: { translateY: '0%', opacity: 1 },
}
const itemTwo = { ...item, hidden: { translateY: '-100%', opacity: 0 } }

const data = [
  { id: 'ebox', src: '/ebox.png', header: 'EBOX' },
  { id: 'ecom', src: '/ecom.png', header: 'E-Com' },
  { id: 'holidaze', src: '/holidaze.png', header: 'Holidaze' },
]

export default function Portfolio() {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-3xl font-bold mb-10">Portfolio</h1>
      <motion.ol
        variants={container}
        viewport={{ once: true }}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row gap-10 overflow-hidden py-8 w-full h-full items-center">
        {data.map((page, index) => (
          <motion.li
            key={page.id}
            variants={index % 2 !== 0 ? itemTwo : item}
            className="w-full max-w-[500px] relative sm:h-96">
            <Link href={`/portfolio/${page.id}`} className="inset-0 absolute" />
            <Image
              src={page.src}
              alt="auctionhouse"
              width={300}
              height={300}
              className="object-cover h-52 w-full rounded-md"
            />
            <p className="text-center text-primary">{page.header}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}
