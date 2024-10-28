"use client";
import React, { useEffect, useState } from "react";
import BlogPage from "@/components/blog/BlogPage";
import Loading from "../../loading";

const SingleBlog = ({ params }) => {
  const { categoryslug, singleBlog } = params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await fetch(
          `/api/blogs/get-blogs?category=${categoryslug}&blogSlug=${singleBlog}`
        );
        const data = await response.json();

        if (response.ok) {
          setBlog(data.result);
        } else {
          console.error("Error fetching blog:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [categoryslug, singleBlog]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {blog ? (
        <BlogPage data={blog} type="singleBlog" />
      ) : (
        <div className="min-h-screen">
          <h1 className="animate-bounce text-3xl mt-4 text-red-500 text-center font-bold">
            Blog not found
          </h1>
        </div>
      )}
    </main>
  );
};

export default SingleBlog;
