"use client";
import Image from "next/image";
import Link from "next/link";

export default function BlogLists({ blogData }) {
  return (
    <div className=" bg-white border border-gray-200">
      {blogData &&
        blogData.map((blog) => (
          <div key={blog.id}>
            <div className="p-6 border-b-2">
              <Link
                prefetch={false}
                href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}
              >
                <h1 className="mb-2 text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                  {blog.title}
                </h1>
              </Link>

              {blog.authorName && blog.publishDate && (
                <p className="mb-3 text-gray-700 ">
                  By <span>{blog.authorName}</span> On{" "}
                  <span>
                    {" "}
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </span>
                </p>
              )}

              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Left side: Image */}
                {blog.image && (
                  <div className="relative overflow-hidden md:w-143 ">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      height={100}
                      width={100}
                      className=" w-40"
                    />
                  </div>
                )}

                {/* Right side: Description */}
                <div className="flex-1">
                  {blog.content && (
                    <p
                      className="mb-3 text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: blog.content.slice(0, 250) + "...",
                      }}
                    />
                  )}
                  <Link
                    prefetch={false}
                    href={`${blog.categoryName
                      .toLowerCase()
                      .trim()
                      .replace(/[.]+/g, "")
                      .replace(/^[^\w]+|[^\w]+$/g, "")
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")}/${blog.slug}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
