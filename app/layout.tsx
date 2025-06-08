import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'

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
          'min-h-svh h-full bg-background font-sans antialiased',
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="h-full my-auto">{children}</main>
          <Toaster richColors/>
        </ThemeProvider>
      </body>
    </html>
  )
}
