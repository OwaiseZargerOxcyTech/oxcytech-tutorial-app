"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FeaturedPosts() {
  const [blogData, setBlogData] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Fetch blog data
    async function fetchBlogData() {
      try {
        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiName: "getlatestfeaturedblogs",
          }),
        });

        const { result } = await response.json();
        setBlogData(result);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }

    // Fetch category data
    async function fetchCategoryData() {
      try {
        const response = await fetch("/api/admin/categories", {
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

    fetchBlogData();
    fetchCategoryData();
  }, []);

  const getCategoryName = (categoryId) => {
    return categories[categoryId] || "uncategorized";
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-sm shadow-md">
      <h1 className="text-gray-900 font-bold text-xl p-2 border-b-2 border-red-500">
        Featured Posts
      </h1>
      <div className="space-y-1">
        {blogData?.map((blog, index) => (
          <div
            key={index}
            className=" relative flex items-start space-x-4 rounded-md border pt-2"
          >
            <div className="relative m-2 w-16 h-16 flex-shrink-0">
              {blog.image && (
                <Link
                  prefetch={false}
                  href={`/${getCategoryName(blog.category_id)}/${blog.slug}`}
                  className="block relative w-full h-full"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={100}
                    height={100}
                    className="object-contain rounded-md"
                  />
                </Link>
              )}
            </div>
            <div className="flex-1">
              <Link
                prefetch={false}
                href={`/${getCategoryName(blog.category_id)}/${blog.slug}`}
              >
                <h2 className="text-gray-800 text-md font-semibold hover:text-red-600 hover:underline">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-xs text-gray-500 ">
                {getCategoryName(blog.category_id)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
