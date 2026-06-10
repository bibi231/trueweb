import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
  ogImage?: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? content.slice(0, 160).trim(),
        date: data.date ?? "",
        author: data.author ?? "Bitrus Gadzama",
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        content,
        ogImage: data.ogImage,
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const mdPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? content.slice(0, 160).trim(),
    date: data.date ?? "",
    author: data.author ?? "Bitrus Gadzama",
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    content,
    ogImage: data.ogImage,
  };
}
