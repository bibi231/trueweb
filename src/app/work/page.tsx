import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioContent } from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Case studies of TrueWeb Solutions products: ReplyAI, HarvestAI, SupportAI, NaijaLingo, and NaijaHub.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <PortfolioContent />
      </main>
      <Footer />
    </>
  );
}
