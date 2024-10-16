"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogLists({ blogData }) {
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const imageMap = {};
      for (const blog of blogData) {
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
  }, [blogData]);

  return (
    <div className="space-y-10">
      {blogData &&
        blogData.map((blog) => (
          <div
            key={blog.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            {blog.image && imageData[blog.id] && (
              <div className="relative overflow-hidden rounded-t-lg">
                <Link prefetch={false} href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}>
                  <Image
                    src={imageData[blog.id]}
                    alt={blog.title} // Updated alt text for accessibility
                    fill
                    className="object-cover w-full h-48 transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </Link>
                <button className="absolute z-10 top-4 right-4 p-2 bg-indigo-500 rounded-full shadow-lg hover:bg-indigo-700">
                  <span className="text-white font-semibold">Action</span> {/* Add icon or text here */}
                </button>
              </div>
            )}
            <div className="p-6">
              <Link prefetch={false} href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}>
                <h1 className="mb-2 text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                  {blog.title}
                </h1>
              </Link>
              {blog.description && (
                <p className="mb-3 text-gray-700 ">
                  {blog.description.slice(0, 150)}...
                </p>
              )}
              {blog.authorName && (
                <p className="mb-3 text-gray-700 ">
                  By <span className="font-semibold">{blog.authorName}</span>
                </p>
              )}
              {blog.publishDate && (
                <p className="mb-3 text-gray-700 dark:text-gray-400">
                  Published on {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              )}
              <Link
                prefetch={false}
                href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
