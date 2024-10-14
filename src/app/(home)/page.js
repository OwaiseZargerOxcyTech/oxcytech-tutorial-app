import HomePage from "@/components/home/HomePage";

export const metadata = {
  metadataBase: new URL("https://tutorials-fawn-omega.vercel.app/"),
  keywords: ["Hey Blog User", "Top Location Blogs", "Top Blogs", "Blogs"],
  title: {
    default: "Blog Home Page",
  },
  openGraph: {
    description: "Blog Home Page description",
  },
};

export default function page() {
  return <HomePage />;
}
