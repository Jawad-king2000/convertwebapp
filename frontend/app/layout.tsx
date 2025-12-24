import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";
import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Universal File Converter - Free Online File Conversion Tool",
    template: "%s | Universal File Converter",
  },
  description: "Convert files between PDF, DOCX, PPTX, PNG, JPG, WEBP, TXT, and HTML formats instantly. Free, fast, and secure online file converter. No registration required.",
  keywords: [
    "file converter",
    "PDF converter",
    "DOCX converter",
    "image converter",
    "free file conversion",
    "online converter",
    "PDF to DOCX",
    "DOCX to PDF",
    "image to PDF",
    "PNG to JPG",
  ],
  authors: [{ name: "Universal File Converter Team" }],
  creator: "Universal File Converter",
  publisher: "Universal File Converter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Universal File Converter",
    title: "Universal File Converter - Free Online File Conversion",
    description: "Convert your files instantly between multiple formats. PDF, DOCX, PPTX, Images, and more. Simple, fast, and secure.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Universal File Converter - Convert files instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal File Converter - Free Online File Conversion",
    description: "Convert files between PDF, DOCX, PPTX, and image formats instantly. Free and secure.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@fileconverter",
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to backend API for faster requests */}
        <link rel="preconnect" href={apiUrl} />
        <link rel="dns-prefetch" href={apiUrl} />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#7c3aed" />

        {/* Structured Data */}
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
