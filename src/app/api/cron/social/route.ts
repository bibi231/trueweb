export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAllPosts, type Post } from "@/lib/blog";

// Phase 1 social automation: on a schedule (see vercel.json), this rotates
// through your blog posts, builds platform-specific captions, and emails them
// to you ready to copy-paste. Phase 2 (full auto-post to LinkedIn/X/IG) needs
// each platform's API + app approval — see TrueWeb-LinkedIn-Posts-and-Automation.md.

const DEFAULT_TO = "bitrus@trueweb.ng";

function hashtags(tags: string[], extra: string[]): string {
  const fromTags = (tags || []).slice(0, 3).map((t) => "#" + t.replace(/[^a-zA-Z0-9]/g, ""));
  return [...fromTags, ...extra].join(" ");
}

function buildCaptions(post: Post) {
  const url = `https://trueweb.com.ng/blog/${post.slug}`;
  const linkedin = `${post.title}\n\n${post.excerpt}\n\nRead the full piece: ${url}\n\n${hashtags(post.tags, ["#WebDesign", "#Nigeria", "#TrueWeb"])}`;
  const x = `${post.title}\n\n${post.excerpt.slice(0, 150).trim()}\n\n${url}`;
  const instagram = `${post.title}\n\n${post.excerpt}\n\nFull article at the link in our bio (or ${url}).\n\n${hashtags(post.tags, ["#WebDesignNigeria", "#SaaS", "#TrueWeb", "#NaijaTech"])}`;
  return { linkedin, x, instagram, url };
}

export async function GET(req: Request) {
  // Allow only Vercel Cron or a request bearing CRON_SECRET.
  const isVercelCron = req.headers.get("x-vercel-cron");
  const auth = req.headers.get("authorization");
  if (!isVercelCron && process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const posts = getAllPosts();
  if (posts.length === 0) return NextResponse.json({ skipped: "no posts" });

  // Deterministic rotation so each scheduled run features a different post.
  const week = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
  const post = posts[week % posts.length];
  const c = buildCaptions(post);

  const block = (label: string, text: string) =>
    `<div style="margin:0 0 18px"><p style="font-weight:700;color:#0d9488;margin:0 0 6px">${label}</p><pre style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-family:system-ui,Arial,sans-serif;font-size:14px;line-height:1.55;margin:0">${text.replace(/</g, "&lt;")}</pre></div>`;

  if (process.env.RESEND_API_KEY) {
    try {
      const { getResend } = await import("@/lib/email/client");
      await getResend().emails.send({
        from: process.env.EMAIL_FROM ?? "TrueWeb <hello@trueweb.com.ng>",
        to: process.env.SOCIAL_DIGEST_TO ?? DEFAULT_TO,
        subject: `Social posts ready to publish: ${post.title}`,
        html: `<div style="font-family:system-ui,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
          <h2 style="color:#0d9488">This week's social posts</h2>
          <p style="color:#475569">Featuring <strong>${post.title}</strong>. Copy, tweak if you like, and post.</p>
          ${block("LinkedIn", c.linkedin)}
          ${block("X / Twitter", c.x)}
          ${block("Instagram", c.instagram)}
          <p style="color:#94a3b8;font-size:12px">Article: ${c.url}</p>
        </div>`,
      });
    } catch (e) {
      console.error("[cron/social] email failed:", e);
    }
  }

  return NextResponse.json({ ok: true, featured: post.slug });
}
