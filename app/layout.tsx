import type { Metadata } from 'next'
import { Geist, Geist_Mono, Ubuntu_Mono } from 'next/font/google'
import './globals.css'
import { WindowProvider } from '@/components/window-context'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const ubuntoMono = Ubuntu_Mono({
  variable: '--font-ubuntu',
  weight: ['400', '700'],
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Eskimoen',
  description: 'Welcome to my portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*     <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntoMono.variable} antialiased relative overflow-hidden`}
      >
        <WindowProvider>{children}</WindowProvider>
      </body>
    </html>
  )
}
