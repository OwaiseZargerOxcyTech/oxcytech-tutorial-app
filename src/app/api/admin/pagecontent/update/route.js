import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const selectedId = parseInt(data.get("selectedId"), 10);
    const publishDate = data.get("publishDate");
    const authorId = parseInt(data.get("author_id"), 10);

    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // Validate and parse publishDate
    const publishDateObj = new Date(publishDate);
    if (isNaN(publishDateObj.getTime())) {
      return NextResponse.json(
        { error: "Invalid publishDate" },
        { status: 400 }
      );
    }

    const pageContentItemData = {
      title,
      slug,
      description,
      publishDate: publishDateObj,
      published: "Y",
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    };
    const updatedPageContentItemData = await prisma.pageContent.update({
      where: { id: selectedId },
      data: pageContentItemData,
    });

    return NextResponse.json(
      {
        result: "page content item data updated successfully",
        data: updatedPageContentItemData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during page content item data update:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to update page content Item data" },
      { status: 500 }
    );
  }
}
