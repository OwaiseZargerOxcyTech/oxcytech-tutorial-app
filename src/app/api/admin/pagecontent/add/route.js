import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    let published = data.get("published");
    const publishDate = data.get("publishDate");
    const authorId = parseInt(data.get("authorId"), 10);

    let newPageContent;
    let slug;

    // Generate slug from title
    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    } else {
      return NextResponse.json(
        { error: "Title is required to generate slug" },
        { status: 400 }
      );
    }

    // Validate and parse publishDate
    const publishDateObj = new Date(publishDate);
    if (isNaN(publishDateObj.getTime())) {
      return NextResponse.json(
        { error: "Invalid publishDate" },
        { status: 400 }
      );
    }

    // Create the blog entry in the database
    newPageContent = await prisma.pageContent.create({
      data: {
        title,
        slug,
        description,
        publishDate: publishDateObj,
        content,
        published,
        author: {
          connect: {
            id: authorId, // Ensure this is correctly passed
          },
        },
      },
      include: {
        author: {
          select: {
            authorName: true,
          },
        },
      },
    });

    return NextResponse.json({ result: newPageContent }, { status: 200 });
  } catch (error) {
    console.error("Error during blog addition:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to add blog" },
      { status: 500 }
    );
  }
}
