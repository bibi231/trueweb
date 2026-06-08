import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutContent } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About Us",
  description: "TrueWeb Solutions is a Nigerian web design and development agency building fast, modern digital products from Abuja.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
