import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// GET Handler: Fetch Blogs by Category or Single Blog by Slug
export async function GET(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const blogSlug = url.searchParams.get("blogSlug");

  try {
    // If both category and blogSlug are present, prioritize fetching the single blog
    if (blogSlug) {
      const blog = await prisma.bloglivet.findFirst({
        where: {
          slug: blogSlug,
          ...(category && { category: { slug: category } }), // Optional category match
        },
        include: {
          author: {
            select: {
              authorName: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      if (blog) {
        const processedBlog = {
          ...blog,
          authorName: blog.author?.authorName || "Unknown",
          categoryName: blog.category?.name || "Uncategorized",
        };

        return NextResponse.json({ result: processedBlog }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Blog not found in single blog" },
          { status: 404 }
        );
      }
    }

    // If only the category is provided, fetch all published blogs in that category
    if (category) {
      const blogs = await prisma.bloglivet.findMany({
        where: {
          published: "Y",
          category: { slug: category },
        },
        include: {
          author: {
            select: {
              authorName: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      const processedBlogs = blogs.map((blog) => ({
        ...blog,
        authorName: blog.author?.authorName || "Unknown",
        categoryName: blog.category?.name || "Uncategorized",
      }));

      return NextResponse.json({ result: processedBlogs }, { status: 200 });
    }

    // If neither parameter is provided, return a bad request error
    return NextResponse.json(
      { error: "Either category or blog slug must be provided" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to get blogs" },
      { status: 500 }
    );
  }
}
