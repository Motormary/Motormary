import Terminal from '@/components/home/terminal'

export default function Home() {
  return (
    <main className="h-[100dvh] w-full flex flex-col px-4 sm:px-10 justify-center items-center relative">
      <div className="absolute rounded-full backdrop-blur-3xl w-full h-full -z-10" />
      <div className="absolute opacity-0 animate-fadeIn rounded-full bg-gray-500/10 w-full h-full -z-20 max-w-[80rem] max-h-[60rem]" />
      <div className="animate-screen-on overflow-hidden max-w-[50rem] max-h-[35rem] rounded-lg outline outline-slate-500 shadow-xl bg-black">
        <Terminal />
      </div>
    </main>
  )
}
