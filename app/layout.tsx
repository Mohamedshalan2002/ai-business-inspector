import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aibusinessinspector.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Business Inspector | Discover What\'s Costing You Customers',
    template: '%s | AI Business Inspector',
  },
  description:
    'Get a comprehensive AI-powered website audit covering SEO, performance, security, and UX. A professional PDF report with prioritized fixes delivered within 24 hours.',
  keywords: [
    'website audit',
    'SEO audit',
    'website performance audit',
    'security audit',
    'AI website analysis',
    'website report',
    'website health check',
    'conversion rate optimization',
    'UX audit',
    'accessibility audit',
  ],
  authors: [{ name: 'AI Business Inspector' }],
  creator: 'AI Business Inspector',
  publisher: 'AI Business Inspector',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'AI Business Inspector',
    title: 'AI Business Inspector | Discover What\'s Costing You Customers',
    description:
      'AI-powered website audit covering SEO, performance, security & UX. Professional PDF report in 24 hours with clear, actionable fixes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Business Inspector — Website Audit Reports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Business Inspector | Website Audit Reports',
    description: 'Discover the hidden issues costing your website customers. AI-powered reports in 24 hours.',
    images: ['/og-image.png'],
    creator: '@aibizinspector',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: 'AI Business Inspector',
                  url: siteUrl,
                  description: 'AI-powered website audit reports for businesses worldwide.',
                  sameAs: [],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: 'AI Business Inspector',
                  publisher: { '@id': `${siteUrl}/#organization` },
                },
                {
                  '@type': 'Service',
                  name: 'AI Website Audit Report',
                  provider: { '@id': `${siteUrl}/#organization` },
                  description: 'Comprehensive AI-powered website audit covering SEO, performance, security, and UX.',
                  offers: [
                    {
                      '@type': 'Offer',
                      name: 'Quick Scan',
                      price: '10',
                      priceCurrency: 'USD',
                      description: 'Website health score, SEO, performance, security, mobile check.',
                    },
                    {
                      '@type': 'Offer',
                      name: 'Growth Audit',
                      price: '29',
                      priceCurrency: 'USD',
                      description: 'Full audit + competitor analysis, UX review, 30-day action plan.',
                    },
                    {
                      '@type': 'Offer',
                      name: 'Revenue Audit',
                      price: '79',
                      priceCurrency: 'USD',
                      description: 'Complete audit + 3 competitor reviews, local SEO, 90-day growth plan, consultation.',
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
