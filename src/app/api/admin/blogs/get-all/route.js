import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Fetch all Blogt entries
    const blogtData = await prisma.blogt.findMany({
      where: {
        bloglive: null, // Ensure it's not linked to Bloglivet
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

    // Fetch all Bloglivet entries that are not linked to Blogt
    const bloglivetData = await prisma.bloglivet.findMany({
      where: {
        blogt: {
          none: {},
        },
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

    // Combine the results from Blogt and Bloglivet
    const combinedData = [
      ...blogtData.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        slug: blog.slug,
        published: blog.published,
        delete_request: blog.delete_request,
        author_id: blog.author_id,
        bloglive_id: blog.bloglive_id,
        featuredpost: blog.featuredpost,
        publishDate: blog.publishDate,
        authorName: blog.author?.authorName || "Unknown",
        categoryName: blog.category?.name || "Uncategorized",
        status: "pending", // Blogt entries are considered "pending"
      })),
      ...bloglivetData.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        slug: blog.slug,
        published: blog.published,
        delete_request: blog.delete_request,
        author_id: blog.author_id,
        bloglive_id: null, // No bloglive_id for Bloglivet entries
        featuredpost: blog.featuredpost,
        publishDate: blog.publishDate,
        authorName: blog.author?.authorName || "Unknown",
        categoryName: blog.category?.name || "Uncategorized",
        status: "published", // Bloglivet entries are considered "published"
      })),
    ];

    // Sort the combined data by title
    // combinedData.sort((a, b) => a.title.localeCompare(b.title));

    return NextResponse.json({ result: combinedData }, { status: 200 });
  } catch (error) {
    console.error("Error during getting blogs data:", error);
    return NextResponse.json(
      { error: "Failed to get blogs data" },
      { status: 500 }
    );
  }
}
