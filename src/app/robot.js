import { MetadataRoute } from "next";

export default function robots() {
  const baseUrl = "https://tutorials-fawn-omega.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog3"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
