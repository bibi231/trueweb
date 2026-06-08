import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/portal/", "/api/"] },
    sitemap: "https://trueweb.com.ng/sitemap.xml",
  };
}
