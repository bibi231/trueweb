import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — TrueWeb Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://trueweb.com.ng/blog/${slug}`,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px 120px" }}>
      {/* JSON-LD Article schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "TrueWeb Solutions",
              logo: { "@type": "ImageObject", url: "https://trueweb.com.ng/logo.png" },
            },
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://trueweb.com.ng/blog/${slug}` },
            image: post.image ?? "https://trueweb.com.ng/og.png",
            keywords: post.tags.join(", "),
          }),
        }}
      />
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--text-faint)", marginBottom: 32 }}>
        <Link href="/blog" style={{ color: "var(--teal)" }}>Blog</Link>
        <span>/</span>
        <span>{post.title}</span>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {post.tags.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>

      <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, fontFamily: "var(--font-syne)", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 16 }}>
        {post.title}
      </h1>

      <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-faint)", marginBottom: 48 }}>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
        <span>·</span>
        <span>{post.author}</span>
      </div>

      {/* Article body */}
      <article style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: 15 }} className="tw-prose">
        <MDXRemote source={post.content} />
      </article>

      {/* CTA */}
      <div style={{ marginTop: 64, padding: "32px 36px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
        <p style={{ fontSize: 13, color: "var(--teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Need a website?</p>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Ready to build something real?</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>TrueWeb builds fast, professional websites for Nigerian businesses. Fixed prices, 2–8 week delivery.</p>
        <Link href="/start" className="btn-teal">Start your project →</Link>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Related articles</h3>
          <div style={{ display: "grid", gap: 16 }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px", display: "block" }}>
                <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{r.title}</p>
                <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{r.readingTime}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .tw-prose h2 { font-size: 22px; font-weight: 700; margin: 40px 0 16px; color: var(--text); }
        .tw-prose h3 { font-size: 17px; font-weight: 700; margin: 28px 0 12px; color: var(--text); }
        .tw-prose p { margin: 0 0 20px; }
        .tw-prose ul, .tw-prose ol { padding-left: 24px; margin: 0 0 20px; }
        .tw-prose li { margin-bottom: 6px; }
        .tw-prose code { background: var(--surface-2); border: 1px solid var(--border); border-radius: 5px; padding: 2px 7px; font-size: 13px; font-family: monospace; color: var(--teal); }
        .tw-prose pre { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; overflow-x: auto; margin: 24px 0; }
        .tw-prose pre code { background: none; border: none; padding: 0; color: #e4e4e7; }
        .tw-prose a { color: var(--teal); text-decoration: none; }
        .tw-prose blockquote { border-left: 3px solid var(--teal); padding-left: 16px; color: var(--text-muted); font-style: italic; margin: 24px 0; }
        .tw-prose strong { color: var(--text); font-weight: 600; }
        .tw-prose hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }
      `}</style>
    </main>
  );
}
