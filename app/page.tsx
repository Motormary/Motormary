/* eslint-disable @next/next/no-img-element */

import { ModeToggle } from "@/components/ui/toggle-mode"
import Image from "next/image"
import Link from "next/link"
import sidebar from "../public/side4.png"

export default function Home() {
  return (
    <main className="relative grid min-[1650px]:grid-cols-5 items-center justify-center max-[1650px]:h-svh max-[1650px]:px-2 animate-fade-in">
      {/* dark/light mode */}
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>
      {/* side banner */}
      <div className="m-auto min-[1650px]:col-span-2 max-[1650px]:max-h-96 max-[1650px]:max-w-96 max-[1650px]:rounded-full overflow-hidden">
        <Image
          src={sidebar}
          alt="banner"
          width={1500}
          height={1500}
          priority
          className="min-[1650px]:-translate-x-full min-[1650px]:animate-slide"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center min-[1650px]:col-span-3">
        {/* Name */}
        <h1 className="max-md:text-4xl md:text-7xl text-gradient font-bold whitespace-nowrap">
          Mathias K. Moen
        </h1>
        {/* Occupation with typewriter animation */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-slate-500">{">"}</span>
          <p
            className="relative w-[max-content] text-xl font-mono
        before:absolute before:inset-0 before:animate-typewriter
        after:bg-foreground
        after:absolute after:inset-0 after:w-[0.5em] after:h-[1.75ch] after:top-1 after:animate-caret
        before:bg-background">
            Front-End Developer
          </p>
        </div>
        <div className="mt-20 mb-5">
          {/* Enter link */}
          <Link
            className="font-mono text-xl border-2 p-2 hover:border-primary active:border-primary transition"
            href="/portfolio">
            Enter
          </Link>
        </div>
      </div>
    </main>
  )
}
