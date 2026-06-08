import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesContent } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, SaaS development, AI integration, e-commerce, SEO, and maintenance services for Nigerian businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <ServicesContent showFaq />
      </main>
      <Footer />
    </>
  );
}
