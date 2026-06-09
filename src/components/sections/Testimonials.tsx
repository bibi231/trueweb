"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";

const STATIC_REVIEWS = [
  {
    id: 0,
    rating: 5,
    quote: "TrueWeb built our e-commerce site in 3 weeks. Sales from the website went from zero to ₦2M in the first month.",
    authorName: "Adaeze O.",
    authorRole: "Founder, Adaeze Fashion House · Lagos",
  },
  {
    id: 1,
    rating: 5,
    quote: "The SupportAI chatbot they integrated handles 70% of our customer questions automatically. Our team finally has breathing room.",
    authorName: "Emeka N.",
    authorRole: "CTO, LogistiNG · Abuja",
  },
  {
    id: 2,
    rating: 5,
    quote: "We needed something that could speak Pidgin and Yoruba to our customers. TrueWeb were the only agency who understood that requirement immediately.",
    authorName: "Chidinma A.",
    authorRole: "Head of Digital, FoodMart NG · Enugu",
  },
  {
    id: 3,
    rating: 5,
    quote: "Professional, fast, transparent on pricing. Our new website load time went from 8s to 1.2s. Night and day.",
    authorName: "Babatunde L.",
    authorRole: "MD, BrightPath Consulting · Lagos",
  },
];

type Review = { id: number; rating: number; quote: string; authorName: string; authorRole: string | null };

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={13} fill={n <= rating ? "#f59e0b" : "none"} color={n <= rating ? "#f59e0b" : "var(--text-faint)"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => { if (data.reviews?.length > 0) setReviews(data.reviews.slice(0, 8)); })
      .catch(() => {});
  }, []);

  return (
    <section className="section">
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Client results</span>
          <div className="teal-line" style={{ margin: "14px auto" }} />
          <h2>What clients say</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {reviews.slice(0, 4).map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <StarRating rating={r.rating} />
              <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.7, flex: 1, fontStyle: "italic" }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 14, color: "var(--teal)", flexShrink: 0 }}>
                  {r.authorName[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{r.authorName}</p>
                  {r.authorRole && <p style={{ fontSize: 11, color: "var(--text-faint)" }}>{r.authorRole}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {reviews.length > 4 && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/testimonials" className="btn-ghost" style={{ fontSize: 13 }}>
              See all {reviews.length} reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
