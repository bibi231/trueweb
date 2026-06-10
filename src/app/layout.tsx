import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://trueweb.com.ng"),
  title: { default: "TrueWeb Solutions — Web Design & Development Agency Nigeria", template: "%s | TrueWeb Solutions" },
  description: "TrueWeb Solutions builds fast, beautiful websites and SaaS products for Nigerian businesses. Custom web design, development, and AI-powered software.",
  keywords: ["web design Nigeria", "web development Nigeria", "build a website Nigeria", "web design agency Abuja", "SaaS development Nigeria"],
  authors: [{ name: "TrueWeb Solutions", url: "https://trueweb.com.ng" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://trueweb.com.ng",
    siteName: "TrueWeb Solutions",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TrueWeb Solutions" }],
  },
  twitter: { card: "summary_large_image", site: "@truewebhq" },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');` }} />
          </>
        )}
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7798519284162823" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-779851