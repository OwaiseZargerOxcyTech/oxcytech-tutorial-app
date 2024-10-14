import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// GET Handler: Fetch Single Blog
export async function GET(req) {
  const url = new URL(req.url);
  const blogSlug = url.searchParams.get("blogSlug");

  try {
    if (blogSlug) {
      // Fetch a single blog based on the provided slug using findFirst
      const blog = await prisma.bloglivet.findFirst({
        where: {
          slug: blogSlug,
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
          { error: "Blog not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to get the blog" },
      { status: 500 }
    );
  }
}
