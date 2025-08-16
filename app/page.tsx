import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-scren w-full flex justify-center items-center">
      Home
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        Dash
      </Link>
    </div>
  )
}
