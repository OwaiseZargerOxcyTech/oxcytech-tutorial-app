"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LatestPosts() {
  const [latestBlogData, setLatestBlogData] = useState([]);
  const [imageData, setImageData] = useState({});
  const [categories, setCategories] = useState({}); // State for categories

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
        // Map category_id to category slugs
        const categoryMap = categoryResult.reduce((map, category) => {
          map[category.id] = category.slug;
          return map;
        }, {});
        setCategories(categoryMap); // Store in state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchLatestBlogData();
    fetchCategoryData();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      const imageMap = {};
      for (const blog of latestBlogData) {
        if (blog.image) {
          try {
            const response = await fetch(blog.image);
            if (response.ok) {
              const blob = await response.blob();
              const imageUrl = URL.createObjectURL(blob);
              imageMap[blog.id] = imageUrl;
            } else {
              console.error(
                `Failed to fetch image for blog with ID ${blog.id}`
              );
            }
          } catch (error) {
            console.error(
              `Error fetching image for blog with ID ${blog.id}:`,
              error
            );
          }
        }
      }
      setImageData(imageMap);
    }

    fetchImages();
  }, [latestBlogData]);

  // Get category name dynamically using category_id
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
            className="flex items-start space-x-4 border rounded-md  pt-4"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              {blog.image && imageData[blog.id] && (
                <Link
                  prefetch={false}
                  href={`/${getCategoryName(blog.category_id)}/${blog.slug}`}
                >
                  <Image
                    src={imageData[blog.id]}
                    alt={blog.title}
                    layout="fill"
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
