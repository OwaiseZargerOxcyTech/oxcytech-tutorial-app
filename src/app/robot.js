import { MetadataRoute } from "next";

export default function robots() {
  const baseUrl = "https://oxcytech-tutorial-app.vercel.app/";
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
