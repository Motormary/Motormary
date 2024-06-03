import Link from "next/link"
import { ModeToggle } from "./toggle-mode"
import Image from "next/image"

export default function TopNav() {
  return (
    <nav className="w-full border-b shadow-sm">
      <div className="max-w-[1920px] m-auto flex items-center justify-between py-2 px-10">
        <Link href="/">
          <Image src="/logoblack.png" alt="logo" width={38} height={38} className="dark:invert" />
        </Link>
        <div className="flex items-center gap-5">
          Home
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
