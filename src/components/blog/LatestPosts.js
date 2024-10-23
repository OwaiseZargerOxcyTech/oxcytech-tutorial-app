"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LatestPosts() {
  const [latestBlogData, setLatestBlogData] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Fetch latest blog data
    async function fetchLatestBlogData() {
      try {
        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiName: "getlatestblogs",
          }),
        });

        const { result } = await response.json();
        setLatestBlogData(result);
      } catch (error) {
        console.error("Error fetching latest blog data:", error);
      }
    }

    // Fetch category data
    async function fetchCategoryData() {
      try {
        const response = await fetch("/api/categories", {
          method: "GET",
        });
        const categoryResult = await response.json();
        const categoryMap = categoryResult.reduce((map, category) => {
          map[category.id] = category.slug;
          return map;
        }, {});
        setCategories(categoryMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchLatestBlogData();
    fetchCategoryData();
  }, []);

  const getCategoryName = (categoryId) => {
    return categories[categoryId] || "uncategorized";
  };

  return (
    <div className="space-y-4 p-4 shadow-md bg-white rounded-sm">
      <h1 className="text-gray-900 font-bold text-xl p-2 border-b-2 border-blue-500">
        Latest Posts
      </h1>
      <div className="space-y-1">
        {latestBlogData?.map((blog, index) => (
          <div
            key={index}
            className="relative flex items-start space-x-4 border rounded-md pt-2"
          >
            <div className="relative w-16 h-16 flex-shrink-0 m-2">
              {/* Correct positioning */}
              {blog.image && (
                <Link
                  prefetch={false}
                  href={`/${getCategoryName(blog.category_id)}/${blog.slug}`}
                  className="block relative w-full h-full"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 640px) 40px, (max-width: 768px) 50px, 60px"
                    className="object-cover rounded-md"
                  />
                </Link>
              )}
            </div>

            <div className="flex-1">
              <Link
                prefetch={false}
                href={`/${getCategoryName(blog.category_id)}/${blog.slug}`}
              >
                <h2 className="text-gray-800 text-md font-semibold hover:text-blue-600 hover:underline">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                {getCategoryName(blog.category_id)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
