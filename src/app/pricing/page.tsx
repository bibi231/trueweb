import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingContent } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent Naira pricing for web design and development in Nigeria. Landing pages, business websites, SaaS apps, and monthly maintenance plans.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <PricingContent showCart />
      </main>
      <Footer />
    </>
  );
}
