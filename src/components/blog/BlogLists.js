"use client"
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
      {blogData  &&
        blogData.map((blog) => (
          <div key={blog.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {blog.image && imageData[blog.id] && (
              <div className="card-zoom bg-gray-100 w-[100%] h-[300px] sm:h-[450px] rounded-xl ">
                <div className="card-zoom-image">
                  <Link prefetch={false}  href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}>
                    <Image
                      src={imageData[blog.id]}
                      alt="img"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <button className="absolute z-10 top-4 end-4 bg-indigo-500 hover:bg-indigo-700 text-white hover:text-gray-200 shadow-2xl hover:shadow-none font-semibold p-2 rounded-full "></button>
              </div>
            )}
            <div className=" p-6">
              <Link prefetch={false}  href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}>
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {blog.title}
                </h1>
              </Link>

              {blog.description && (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {blog.description.slice(0, 150)}...
                </p>
              )}
              {blog.authorName && (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  By {blog.authorName}
                </p>
              )}
              {blog.publishDate && (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Published on {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              )}
              <Link
                prefetch={false}
                href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
