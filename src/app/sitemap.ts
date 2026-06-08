import type { MetadataRoute } from "next";

const BASE = "https://trueweb.com.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/services", "/work", "/process", "/pricing", "/about", "/contact", "/start"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/start" ? 0.9 : 0.7,
  }));
}
