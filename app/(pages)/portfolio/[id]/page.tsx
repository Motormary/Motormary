import ShareButton from '@/components/share-button'
import * as page from '@/lib/data/portfolio-data'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type pageData = {
  title: string
  body: string
  src: string
  alt: string
  created: string
  href: string
  github: string
  improvements: string
}


type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const data = page[id as keyof typeof page] as pageData

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
        <div className='flex gap-2 text-sm mt-4 [&>a]:underline'>
          <Link target='_blank' href={data.href}>Live</Link>
          <span>|</span>
          <Link target='_blank' href={data.github}>Repo</Link>
          <ShareButton/>
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
