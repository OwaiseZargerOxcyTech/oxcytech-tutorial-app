"use client";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import SingleBlogPage from "@/components/blog/SingleBlogPage";
import Pagination from "@/components/common/Pagination";
import { useState, useEffect } from "react";

const UnpublishedBlogPage = ({ params }) => {
  const { id } = params;

  const [unpublishedBlog, setUnpublishedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the category data by ID
  const loadUnpublishedBlog = async (id) => {
    try {
      const res = await fetch(`/api/blogs/get-unpublished-blog/${id}`);
      if (!res.ok) {
        throw new Error("Unpublished blog not found");
      }
      const data = await res.json();
      console.log(data);
      setUnpublishedBlog(data);
    } catch (err) {
      setError("Failed to load unpublished blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadUnpublishedBlog(id);
    }
  }, [id]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalBlogs = unpublishedBlog?.length;
  const blogsPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [totalBlogs]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <main>
        <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-16 lg:max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            <div className="col-span-8">
              <SingleBlogPage blog={unpublishedBlog} />
              <Pagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalBlogs={totalBlogs}
                blogsPerPage={blogsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </div>

            <div className=" col-span-4 space-y-10">
              <FeaturedPosts />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UnpublishedBlogPage;
