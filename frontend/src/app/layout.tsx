import Loading from '@/components/elements/Loading'
import '@/globals.css'
import { Providers } from '@/providers/providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Providers>
          {children}
          <Loading />
        </Providers>
      </body>
    </html>
  )
}
