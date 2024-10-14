"use client";
import BlogPage from "@/components/blog/BlogPage";
import { useEffect, useState } from "react";

const SingleBlog = ({ params }) => {
  const { singleBlog } = params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsBySlug = async () => {
      try {
        const response = await fetch(
          `/api/getsingleblog?blogSlug=${singleBlog}`
        );
        const data = await response.json();

        if (response.ok ) {
          setBlogs(data.result); 
        } else {
          console.error("Error fetching blogs:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsBySlug();
  }, [singleBlog]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <BlogPage data={blogs} type="singleBlog" />
    </main>
  );
};

export default SingleBlog;
