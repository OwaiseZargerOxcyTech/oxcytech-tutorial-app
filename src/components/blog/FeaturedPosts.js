"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FeaturedPosts() {
  const [blogData, setBlogData] = useState([]);
  const [imageData, setImageData] = useState({});
  useEffect(() => {
    async function fetchData() {
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

    fetchData();
  }, []);

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
      <h1 className="text-gray-900 inline-block font-bold text-lg border-b-4 border-red-500">
        Featured Posts
      </h1>
      <div className="space-y-4">
        {blogData?.map((blog, index) => (
          <div
            key={index}
            className="border-2 px-2 rounded-lg h-[120px] flex justify-between items-center"
          >
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <div className="card-zoom bg-red-100 w-full h-[100px] rounded-lg">
                  <div className="card-zoom-image">
                    {blog.image && imageData[blog.id] && (
                      <Link prefetch={false} href={`${blog.slug}`}>
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
                  <Link prefetch={false} href={`${blog.slug}`}>
                    <h1 className="text-gray-800 hover:text-red-600 hover:underline text-md font-bold">
                      {blog.title}
                    </h1>
                  </Link>

                  {/* <div className=" text-gray-600 text-sm font-normal">
                    <i className="bi bi-person pr-1"></i>
                    <Link prefetch={false} href={post.author.authorLink}>
                      {post.author.firstName}
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
