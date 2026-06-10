import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — TrueWeb Solutions",
  description: "Web development tips, Nigerian SaaS insights, and product updates from TrueWeb Solutions.",
  openGraph: {
    title: "Blog — TrueWeb Solutions",
    description: "Web development tips, Nigerian SaaS insights, and product updates from TrueWeb Solutions.",
    url: "https://trueweb.com.ng/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 120px" }}>
      <div style={{ marginBottom: 56 }}>
        <p className="eyebrow">Resources</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "var(--font-syne)", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
          The TrueWeb Blog
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 520 }}>
          Practical guides on web development, Nigerian SaaS, and building digital products that work.
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "var(--text-faint)" }}>Articles coming soon.</p>
      ) : (
        <div style={{ display: "grid", gap: 24 }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", display: "block", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 32px", transition: "border-color 0.2s" }}
            >
              <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                {post.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.6 }}>{post.excerpt}</p>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--text-faint)" }}>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
                <span>·</span>
                <span>{post.author}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
