import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://trueweb.com.ng";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/work`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/process`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/founder`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/start`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/refund`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE}/cookies`, changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: post.date ? new Date(post.date) : undefined,
  }));
  return [...staticRoutes, ...blogRoutes];
}
