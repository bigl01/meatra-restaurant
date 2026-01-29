import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO } from "./lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${RESTAURANT_INFO.name} - ${RESTAURANT_INFO.tagline}`,
    template: `%s | ${RESTAURANT_INFO.name}`,
  },
  description: RESTAURANT_INFO.tagline,
  keywords: ['ресторан', 'Брест', 'мясо', 'стейки', 'меню', 'бронирование', 'Meatra'],
  authors: [{ name: RESTAURANT_INFO.name }],
  creator: RESTAURANT_INFO.name,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://meatra.by',
    siteName: RESTAURANT_INFO.name,
    title: RESTAURANT_INFO.name,
    description: RESTAURANT_INFO.tagline,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: RESTAURANT_INFO.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: RESTAURANT_INFO.name,
    description: RESTAURANT_INFO.tagline,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-meatra-dark text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
