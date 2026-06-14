import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
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
        <meta name="google-adsense-account" content="ca-pub-7798519284162823" />
        {/* JSON-LD: Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "TrueWeb Solutions",
          "url": "https://trueweb.com.ng",
          "logo": "https://trueweb.com.ng/logo.png",
          "sameAs": ["https://replyai.com.ng", "https://harvestai.com.ng", "https://supportai.com.ng"],
        })}} />
        {/* JSON-LD: WebSite */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "TrueWeb Solutions",
          "url": "https://trueweb.com.ng",
          "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://trueweb.com.ng/blog?q={search_term_string}" }, "query-input": "required name=search_term_string" },
        })}} />
        {/*
          AD NETWORKS — activate by replacing placeholders:

          Monetag: monetag.com → Publisher → Sites → get MONETAG_SITE_KEY
          <meta name="monetag" content="MONETAG_SITE_KEY" />
          <script async src="https://s.pubmine.com/showad.js" />

          Adsterra: adsterra.com → Publisher → Add site → get ADSTERRA_KEY
          <script async data-cfasync="false" src="//pl24ADSTERRA_KEY.profitableratecpm.com/ADSTERRA_KEY/invoke.js" />

          PropellerAds: propellerads.com → Sites → Add site → get PROPELLER_ZONE_ID
          <script async src="https://hbstatic.net/natush.min.js" data-cfasync="false" />

          Media.net: media.net → Publisher → get MEDIA_NET_CID
          <script async src="//contextual.media.net/dmedianet.js?cid=MEDIA_NET_CID" crossOrigin="anonymous" />
        */}
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <CookieBanner />
        <Script
          src="https://supportai.com.ng/widget.js"
          data-bot-id="6a2a7692a81172fc6c6ffaf8"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
