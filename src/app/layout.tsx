import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Agape Pedicure - Premium Voetenverzorging',
  description: 'Luxueuze pedicure en wellness behandelingen in een serene, moderne omgeving',
  keywords: ['pedicure', 'voetenverzorging', 'wellness', 'spa', 'Amsterdam', 'luxury'],
  authors: [{ name: 'Agape Pedicure' }],
  creator: 'Agape Pedicure',
  publisher: 'Agape Pedicure',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agapepedicure.nl'),
  openGraph: {
    title: 'Agape Pedicure - Premium Voetenverzorging',
    description: 'Luxueuze pedicure en wellness behandelingen in een serene, moderne omgeving',
    url: 'https://agapepedicure.nl',
    siteName: 'Agape Pedicure',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agape Pedicure',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agape Pedicure - Premium Voetenverzorging',
    description: 'Luxueuze pedicure en wellness behandelingen',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  )
}





