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
    <div className="space-y-10">
      <h1 className="text-gray-900 inline-block font-bold text-lg border-b-4 border-blue-500">
        Latest Posts
      </h1>
      <div className="space-y-4">
        {latestBlogData?.map((blog, index) => (
          <div
            key={index}
            className="border-2 px-2 rounded-lg h-[120px] flex justify-between items-center"
          >
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <div className=" bg-blue-100 w-full h-[100px] rounded-lg">
                  <div className="card-zoom-image">
                    {blog.image && imageData[blog.id] && (
                      <Link
                        prefetch={false}
                        href={`/${getCategoryName(blog.category_id)}/${
                          blog.slug
                        }`}
                      >
                        <Image
                          src={imageData[blog.id]}
                          alt="img"
                          fill
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col justify-start items-start pl-2 space-y-4">
                  <Link
                    prefetch={false}
                    href={`/${getCategoryName(blog.category_id)}/${blog.slug}`}
                  >
                    <h1 className="text-gray-800 hover:text-blue-600 hover:underline text-md font-bold">
                      {blog.title}
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
