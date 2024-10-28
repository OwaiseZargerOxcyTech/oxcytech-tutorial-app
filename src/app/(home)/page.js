import HomePage from "@/components/home/HomePage";

export const metadata = {
  metadataBase: new URL("https://oxcytech-tutorial-app.vercel.app/"),
  keywords: ["Hey Blog User", "Top Location Blogs", "Top Blogs", "Blogs"],
  title: {
    default: "Blog Home Page",
  },
  description: "Discover top blogs on various Web development topics.",
  openGraph: {
    description: "Blog Home Page description",
  },
};

export default function page() {
  return <HomePage />;
}
