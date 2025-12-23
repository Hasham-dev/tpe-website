import type { Metadata } from 'next'
import { Montserrat, Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { LocalBusinessSchema, WebsiteSchema } from '@/components/seo/StructuredData'
import { CookieConsent } from '@/components/ui/CookieConsent'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://theperfectevent.com'),
  title: {
    default: 'Full-Service Event Planning & Production | The Perfect Event | Southern California',
    template: '%s | The Perfect Event',
  },
  description: "Southern California's premier event production company. Weddings, corporate events, festivals - one company handles coordination, entertainment, AV, transportation & more. 600+ events yearly. Get your free quote.",
  keywords: [
    // Primary keywords
    'event planning Los Angeles',
    'event production company California',
    'full service event planner',
    'wedding planner Southern California',
    // Location-based keywords
    'corporate event planner San Diego',
    'wedding planner Orange County',
    'event company Long Beach',
    'Santa Barbara event planner',
    // Service keywords
    'DJ services Los Angeles',
    'event lighting rental',
    'wedding entertainment',
    'corporate party planning',
    'festival production company',
    // Event type keywords
    'university event company',
    'college event planning',
    'prom DJ services',
    'high school dance entertainment',
    'private party planner',
    // Long-tail keywords
    'best event planner near me',
    'affordable wedding DJ California',
    'full service event production',
    'one stop event company',
  ],
  authors: [{ name: 'The Perfect Event' }],
  creator: 'The Perfect Event',
  publisher: 'The Perfect Event',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theperfectevent.com',
    siteName: 'The Perfect Event',
    title: 'Full-Service Event Planning & Production | The Perfect Event',
    description: "Southern California's premier event production company. One company handles everything - coordination, entertainment, AV, transportation & more.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Perfect Event - Full-Service Event Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Service Event Planning & Production | The Perfect Event',
    description: "Southern California's premier event production company. 600+ events yearly.",
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} ${greatVibes.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans">
        <LocalBusinessSchema />
        <WebsiteSchema />
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
