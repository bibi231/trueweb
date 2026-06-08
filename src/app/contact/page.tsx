import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactContent } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with TrueWeb Solutions. Email hello@trueweb.com.ng or fill in our contact form.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
