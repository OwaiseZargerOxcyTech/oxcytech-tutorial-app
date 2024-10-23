"use client";
import Image from "next/image";
import Link from "next/link";

export default function BlogLists({ blogData }) {
  return (
    <div className="bg-white border border-gray-200">
      {blogData &&
        blogData.map((blog) => (
          <div key={blog.id} className="border-b border-gray-300 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Image Section */}
              {blog.image && (
                <div className="relative w-full md:w-64 h-40 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    height={100}
                    width={100}
                    className=" w-full  object-cover"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="flex-1">
                <Link
                  prefetch={false}
                  href={`${blog.categoryName.toLowerCase()}/${blog.slug}`}
                >
                  <h1 className="mb-2 text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                    {blog.title}
                  </h1>
                </Link>

                {/* Author and Date */}
                {blog.authorName && blog.publishDate && (
                  <p className="mb-3 text-sm text-gray-500">
                    By{" "}
                    <span className="font-semibold text-black">
                      {blog.authorName}
                    </span>{" "}
                    on{" "}
                    <span>
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </span>
                  </p>
                )}

                {/* Blog Content Preview */}

                {blog.content && (
                  <p
                    className="mb-3 text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.slice(0, 250) + "...",
                    }}
                  />
                )}

                {/* Read More Button */}
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
                  className="inline-block text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
