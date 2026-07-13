import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading", weight: ["400", "500", "600", "700", "800", "900"] });

const BASE_URL = "https://architassociates.com";

export const metadata: Metadata = {
  title: {
    default: "Archit Associates — Industrial Spares & Laboratory Testing Equipment",
    template: "%s | Archit Associates",
  },
  description:
    "Archit Associates is a New Delhi-based supplier of premium industrial spares, laboratory testing equipment, precision instruments, railway inspection gauges, civil material testing equipment, and industrial safety gear. Serving India's leading infrastructure and manufacturing companies since 2018.",
  keywords: [
    "industrial spares supplier India",
    "laboratory testing equipment Delhi",
    "railway inspection gauges",
    "civil material testing equipment",
    "CBR testing machine",
    "compression testing machine",
    "toe gap gauge",
    "industrial safety equipment",
    "surveying instruments Delhi",
    "Archit Associates",
  ],
  authors: [{ name: "Archit Associates", url: BASE_URL }],
  creator: "Archit Associates",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Archit Associates",
    title: "Archit Associates — Industrial Spares & Laboratory Testing Equipment",
    description:
      "Premium industrial spares, laboratory testing equipment, railway gauges, and precision instruments. Trusted by India's leading infrastructure companies.",
    images: [
      {
        url: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/ARCHIT_ASS_LOGO.jpg",
        width: 1200,
        height: 630,
        alt: "Archit Associates Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archit Associates — Industrial Spares & Laboratory Testing Equipment",
    description:
      "Premium industrial spares, laboratory testing equipment, railway gauges, and precision instruments. Trusted by India's leading infrastructure companies.",
    images: [
      "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/ARCHIT_ASS_LOGO.jpg",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon.ico",
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload the hero/logo image — visible on first paint in LoadingScreen + Hero */}
        <link
          rel="preload"
          as="image"
          href="https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/ARCHIT_ASS_LOGO.jpg"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className} overflow-x-hidden relative w-full`}>
  <Preloader />
  <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
