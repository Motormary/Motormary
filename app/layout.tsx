import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'MKM Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="logowhite.png" type="image/x-icon" />
      </head>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased overflow-hidden',
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="overflow-y-auto max-h-screen py-12">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
