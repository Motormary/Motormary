import Terminal from '@/components/home/terminal'

export default function Home() {
  return (
    <main className="h-[100dvh] w-full flex flex-col px-4 sm:px-10 justify-center items-center relative">
      <div className="absolute rounded-full backdrop-blur-lg md:backdrop-blur-3xl w-full h-full -z-10" />
      <div className="absolute opacity-0 animate-fadeIn rounded-full bg-gray-500/10 w-full h-full -z-20 max-w-[clamp(40rem,75vw,80rem)] max-h-[clamp(45rem,90dvh,60rem)]" />
      <div className="animate-screen-on overflow-hidden max-w-[50rem] max-h-[80dvh] sm:max-h-[37.5rem] rounded-lg border-x-2 border-b-2 border-slate-500 shadow-xl bg-black">
        <div className="w-full h-10 bg-slate-500" />
        <Terminal />
      </div>
    </main>
  )
}
