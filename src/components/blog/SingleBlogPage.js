import Image from "next/image";
import React from "react";

const SingleBlogPage = ({ blog }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-8 bg-white shadow-md rounded-lg">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 leading-tight">
        {blog.title}
      </h1>

      {/* Meta Information */}
      <div className="text-gray-500 text-sm mb-6 flex sm:justify-between">
        <div>
          <span className="font-medium">Published on:</span>
          {new Date(blog.publishDate).toLocaleDateString()}
          <span className="font-medium"> Author:</span> {blog.authorName}
        </div>
      </div>

      {/* Image */}
      {blog.image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            width={400}
            height={300}
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg lg:prose-xl text-gray-800 leading-relaxed max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default SingleBlogPage;
