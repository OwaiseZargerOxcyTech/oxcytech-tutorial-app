"use client";
import React, { useEffect, useState } from "react";
import BlogPage from "@/components/blog/BlogPage";

const SlugPage = ({ params }) => {
  const { categoryslug } = params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        const response = await fetch(
          `/api/getpublishedblogs?category=${categoryslug}`
        );
        const data = await response.json();

        if (response.ok && Array.isArray(data.result)) {
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

    fetchBlogsByCategory();
  }, [categoryslug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <BlogPage data={blogs} type="category" />
    </main>
  );
};

export default SlugPage;
