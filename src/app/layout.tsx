import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NAJAH Activewear | Skromna aktivna odjeća za žene',
    template: '%s | NAJAH Activewear',
  },
  description:
    'Handmade aktivna odjeća za pokrivene žene. Izrađeno po mjerama, Made in Bosnia. Elegantno, udobno i skromno.',
  keywords: [
    'najah activewear',
    'muslimanska sportska odjeća',
    'skromna aktivna odjeća',
    'handmade bosnia',
    'hidžab sport',
    'islamska sportska odjeća',
  ],
  openGraph: {
    title: 'NAJAH Activewear',
    description: 'Handmade aktivna odjeća za pokrivene žene – Made in Bosnia.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bs" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
