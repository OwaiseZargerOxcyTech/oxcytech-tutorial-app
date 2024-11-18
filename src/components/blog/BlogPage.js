"use client";
import { useState, useEffect } from "react";
import BlogLists from "@/components/blog/BlogLists";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Pagination from "../common/Pagination";
import SingleBlogPage from "./SingleBlogPage";
import ImageInSidebar from "./ImageInSidebar";
import LatestPosts from "./LatestPosts";
import FeaturedApp from "./FeaturedApp";

const BlogPage = ({ data, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalBlogs = data?.length;
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

  return (
    <>
      <main className="bg-gray-50 min-h-screen py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            {/* Main Content */}
            <div className="lg:col-span-8 col-span-12">
              {type === "category" ? (
                <BlogLists blogData={data.slice(startIndex, endIndex)} />
              ) : (
                <SingleBlogPage blog={data} />
              )}

              {/* Pagination */}
              {type === "category" && (
                <div className="mt-10">
                  <Pagination
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalBlogs={totalBlogs}
                    blogsPerPage={blogsPerPage}
                    startIndex={startIndex}
                    endIndex={endIndex}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 col-span-12 space-y-8">
              <ImageInSidebar />
              <FeaturedPosts />
              <LatestPosts />
              <FeaturedApp/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
