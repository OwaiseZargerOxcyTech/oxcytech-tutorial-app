
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// GET Handler: Fetch Published Blogs
export async function GET(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category"); 

  try {
    const blogs = await prisma.bloglivet.findMany({
      where: {
        published: "Y",
        ...(category && { category: { slug: category } })
      },
      include: {
        author: {
          select: {
            authorName: true,
          },
        },
        category: { // Include category details
          select: {
            name: true, // Assuming 'name' is the field for category name
          },
        },
      },
    });

    const processedBlogs = blogs.map(blog => ({
      ...blog,
      authorName: blog.author?.authorName || "Unknown",
      categoryName: blog.category?.name || "Uncategorized", 
    }));

    return NextResponse.json({ result: processedBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return NextResponse.json(
      { error: "Failed to get published blogs" },
      { status: 500 }
    );
  }
}

