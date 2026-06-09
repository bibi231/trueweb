import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, minHeight: "100svh", background: "var(--bg)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 28px 100px" }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
