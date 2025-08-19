import Terminal from '@/components/home/terminal'

export default function Home() {
  return (
    <main className="h-[100dvh] w-full flex flex-col px-4 sm:px-10 justify-center items-center relative overflow-hidden">
      <div className="absolute rounded-full backdrop-blur-lg md:backdrop-blur-3xl w-full h-full -z-10" />
      <div className="absolute opacity-0 animate-fadeIn rounded-full bg-gray-500/10 w-full h-full -z-20 max-w-[clamp(40rem,75vw,80rem)] max-h-[clamp(45rem,90dvh,60rem)]" />
      <Terminal />
    </main>
  )
}
