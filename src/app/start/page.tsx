import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectWizard } from "@/components/build/ProjectWizard";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell us about your project and get an instant quote. Web design, development, and AI integration for Nigerian businesses.",
};

export default function StartPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section className="section">
          <div className="section-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="eyebrow">Start a project</span>
              <div className="teal-line" style={{ margin: "14px auto" }} />
              <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", marginBottom: 16 }}>
                Build your website — get a quote in minutes
              </h1>
              <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.65 }}>
                Answer 6 quick questions. Pick a template. See your estimated cost live.
              </p>
            </div>

            <div
              style={{
                maxWidth: 720,
                margin: "0 auto",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "36px 36px",
              }}
            >
              <ProjectWizard />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
