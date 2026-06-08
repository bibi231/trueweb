import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trueweb.com.ng"),
  title: {
    default: "TrueWeb Solutions — Web Design & Development Agency Nigeria",
    template: "%s | TrueWeb Solutions",
  },
  description:
    "TrueWeb Solutions builds fast, beautiful websites and SaaS products for Nigerian businesses. Custom web design, development, and AI-powered software.",
  keywords: [
    "web design Nigeria",
    "web development Nigeria",
    "build a website Nigeria",
    "web design agency Abuja",
    "SaaS development Nigeria",
    "TrueWeb Solutions",
  ],
  authors: [{ name: "TrueWeb Solutions", url: "https://trueweb.com.ng" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://trueweb.com.ng",
    siteName: "TrueWeb Solutions",
    title: "TrueWeb Solutions — Web Design & Development Agency Nigeria",
    description:
      "Fast, beautiful websites and AI-powered SaaS products for Nigerian businesses.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@truewebhq",
    creator: "@truewebhq",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
