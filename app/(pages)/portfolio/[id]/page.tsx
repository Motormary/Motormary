import dynamic from 'next/dynamic'
import * as page from '@/lib/data/portfolio-data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const data = page[id as keyof typeof page]

  if (!data) return notFound()

  return (
    <div className="h-full space-y-8">
      <h1 className="text-3xl font-bold text-primary">{data.title}</h1>
      <div>
        <Image
          src={data.src}
          alt={data.alt}
          width={1024}
          height={500}
          className="rounded-md"
        />
        <div className='space-x-2 text-sm my-2 [&>a]:underline'>
          <Link target='_blank' href={data.href}>Live</Link>
          <span>|</span>
          <Link target='_blank' href={data.github}>Repo</Link>
        </div>
      </div>
      <p className="text-pretty">{data.body}</p>
      <div className="text-sm text-muted-foreground">
        Improvements: <br />
        <ul>
          <li>{data.improvements}</li>
        </ul>
      </div>
    </div>
  )
}
