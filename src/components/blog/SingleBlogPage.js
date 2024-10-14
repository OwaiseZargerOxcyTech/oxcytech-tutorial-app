import Image from "next/image";
import React from "react";

const SingleBlogPage = ({ blog }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.image && (
        <Image
          width={500}
          height={500}
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto mb-4 object-cover"
        />
      )}
      <div className="text-gray-600 mb-2">
        <p>Published on: {new Date(blog.publishDate).toLocaleDateString()}</p>
        <p>Author: {blog.authorName}</p>
        <p>Category: {blog.categoryName}</p>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default SingleBlogPage;
