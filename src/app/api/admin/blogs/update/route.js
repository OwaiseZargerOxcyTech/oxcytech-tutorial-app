import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const image = data.get("image");
    const selectedId = parseInt(data.get("selectedId"), 10);
    const published = data.get("published");
    const publishDate = data.get("publishDate");
    const authorId = parseInt(data.get("author_id"), 10);
    const featuredPost = data.get("featuredpost");
    const blogliveId = data.get("blogliveId");
    const categoryId = parseInt(data.get("categoryId"), 10);

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

    const blogData = {
      title,
      slug,
      description,
      publishDate: publishDateObj,
      content,
      featuredpost: featuredPost,
      category: {
        connect: {
          id: categoryId,
        },
      },
      author: {
        connect: {
          id: authorId,
        },
      },
    };

    // Handle image upload if image exists
    if (image && image.name) {
      const filenameParts = image.name.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      // Upload image to Vercel Blob storage
      const blob = await put(`${slug}.${fileExtension}`, image, {
        access: "public",
      });

      // Add the image URL to the blog data
      blogData.image = blob.url;
    }

    let updatedBlog;

    // If the blog is marked as published ("Y"), create a new entry with published status "N"
    if (published === "Y") {
      updatedBlog = await prisma.blogt.create({
        data: { ...blogData, published: "N" },
      });
    } else {
      // Otherwise, update the existing blog entry directly
      updatedBlog = await prisma.blogt.update({
        where: { id: selectedId },
        data: { ...blogData, published },
      });
    }

    const responseData = {
      id: updatedBlog.id,
      title: updatedBlog.title,
      slug: updatedBlog.slug,
      description: updatedBlog.description,
      publishDate: updatedBlog.publishDate,
      content: updatedBlog.content,
      published: updatedBlog.published,
      author_id: updatedBlog.author_id,
      featuredpost: updatedBlog.featuredpost,
      image: updatedBlog.image,
      category_id: updatedBlog.category_id,
    };

    return NextResponse.json(
      { result: "Blog updated successfully", data: responseData },
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
