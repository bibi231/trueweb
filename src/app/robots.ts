import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal/", "/admin/"],
      },
    ],
    sitemap: "https://trueweb.com.ng/sitemap.xml",
  };
}
