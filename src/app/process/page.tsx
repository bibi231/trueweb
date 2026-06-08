import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProcessContent } from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "How We Work",
  description: "TrueWeb Solutions 6-step process: brief, proposal, design, build, launch, and ongoing support.",
};

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <ProcessContent />
      </main>
      <Footer />
    </>
  );
}
