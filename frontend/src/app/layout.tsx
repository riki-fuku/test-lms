import Loading from '@/components/ui/Loading'
import { GOOGLE_ANALYTICS_ID, GOOGLE_TAG_MANAGER_ID } from '@/config'
import '@/globals.css'
import { Providers } from '@/providers/providers'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
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
