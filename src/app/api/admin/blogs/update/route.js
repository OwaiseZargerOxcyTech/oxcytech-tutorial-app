import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const image = data.get("image");
    let selectedId = parseInt(data.get("selectedId"));
    const published = data.get("published");
    const publishDate = data.get("publishDate");
    const author_id = parseInt(data.get("author_id"));
    const featuredpost = data.get("featuredpost");
    const bloglive_id = data.get("blogliveId");
    const category_id = parseInt(data.get("categoryId"));

    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const blogData = {
      title,
      description,
      content,
      slug,
      image,
      published,
      author_id,
      bloglive_id,
      featuredpost,
      publishDate,
      category_id,
      id: selectedId,
    };

    if (published === "Y") {
      await prisma.blogt.create({ data: { ...blogData, published: "N" } });
    } else {
      await prisma.blogt.update({
        where: { id: selectedId },
        data: { ...blogData },
      });
    }

    return NextResponse.json(
      { result: "Blog updated successfully", blogData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during blog update:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
