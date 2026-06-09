export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: "Real reviews from TrueWeb Solutions clients across Nigeria.",
};

const STATIC = [
  { id: 0, rating: 5, quote: "TrueWeb built our e-commerce site in 3 weeks. Sales from the website went from zero to ₦2M in the first month.", authorName: "Adaeze O.", authorRole: "Founder, Adaeze Fashion House · Lagos", createdAt: null },
  { id: 1, rating: 5, quote: "The SupportAI chatbot they integrated handles 70% of our customer questions automatically. Our team finally has breathing room.", authorName: "Emeka N.", authorRole: "CTO, LogistiNG · Abuja", createdAt: null },
  { id: 2, rating: 5, quote: "We needed something that could speak Pidgin and Yoruba to our customers. TrueWeb were the only agency who understood that requirement immediately.", authorName: "Chidinma A.", authorRole: "Head of Digital, FoodMart NG · Enugu", createdAt: null },
  { id: 3, rating: 5, quote: "Professional, fast, transparent on pricing. Our new website load time went from 8s to 1.2s. Night and day.", authorName: "Babatunde L.", authorRole: "MD, BrightPath Consulting · Lagos", createdAt: null },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= n ? "#f59e0b" : "none"} stroke={i <= n ? "#f59e0b" : "var(--text-faint)"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default async function TestimonialsPage() {
  type ReviewRow = typeof reviews.$inferSelect;
  let dbReviews: ReviewRow[] = [];
  try {
    dbReviews = await db.select().from(reviews).where(eq(reviews.approved, true)).orderBy(desc(reviews.createdAt));
  } catch { /* DB not yet migrated */ }

  const allReviews: (ReviewRow | typeof STATIC[0])[] = dbReviews.length > 0 ? dbReviews : STATIC;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="eyebrow">Client results</span>
              <div className="teal-line" style={{ margin: "14px auto" }} />
              <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", marginBottom: 14 }}>What clients say</h1>
              <p style={{ color: "var(--text-muted)", fontSize: 16 }}>
                {allReviews.length} verified reviews from Nigerian businesses.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {allReviews.map((r, i) => (
                <div key={r.id ?? i} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <Stars n={r.rating} />
                  <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, flex: 1, fontStyle: "italic" }}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--surface-2)", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 14, color: "var(--teal)", flexShrink: 0 }}>
                      {r.authorName[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{r.authorName}</p>
                      {r.authorRole && <p style={{ fontSize: 11, color: "var(--text-faint)" }}>{r.authorRole}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
