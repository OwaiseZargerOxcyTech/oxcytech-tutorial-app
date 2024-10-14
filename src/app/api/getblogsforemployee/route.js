import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    let { employeeId } = body;

    employeeId = parseInt(employeeId);

    // Fetch blogs from the Blogt table
    const blogsFromBlogt = await prisma.blogt.findMany({
      where: {
        author_id: employeeId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        image: true,
        slug: true,
        published: true,
        publishDate: true,
        delete_request: true,
        author_id: true,
        bloglive_id: true,
        featuredpost: true,
      },
    });

    // Fetch blogs from the Bloglivet table that are not linked in Blogt
    const blogsFromBloglivet = await prisma.bloglivet.findMany({
      where: {
        author_id: employeeId,
        id: {
          notIn: blogsFromBlogt
            .map((blog) => blog.bloglive_id)
            .filter((id) => id !== null),
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        image: true,
        slug: true,
        published: true,
        publishDate: true,
        delete_request: true,
        author_id: true,
        featuredpost: true,
      },
    });

    // Combine and sort the results by title
    const combinedBlogs = [...blogsFromBlogt, ...blogsFromBloglivet].sort(
      (a, b) => a.title.localeCompare(b.title)
    );

    return NextResponse.json({ result: combinedBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error during blog fetching:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
