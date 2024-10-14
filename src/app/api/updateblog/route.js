import { NextRequest, NextResponse } from "next/server";
import fs, { writeFile } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    const data = await req.formData();
    const image = data.get("image");
    const title = data.get("title");
    const description = data.get("description");
    const authorName = data.get("authorName");
    const content = data.get("content");
    const published = data.get("published");
    const author_id = data.get("author_id");
    const blogLiveId = data.get("blogLiveId");
    const featuredPost = data.get("featuredPost");
    let selectedId = data.get("selectedId");
    selectedId = parseInt(selectedId);
    const previousimage = data.get("previousimage");
    const publishDate = data.get("publishDate"); // Retrieve publishDate
    const category_id = data.get("categoryId");
    let blob;
    if (!image) {
      return NextResponse.json({ success1: false });
    }

    let slug = title
      .toLowerCase() // Convert the title to lowercase
      .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-");

    if (
      (blogLiveId !== undefined &&
        blogLiveId !== null &&
        blogLiveId !== "null" &&
        blogLiveId !== "") ||
      published === "Y"
    ) {
      slug = `${slug}-00000`;
    }

    const originalBlog = await prisma.blogt.findUnique({
      where: { id: selectedId },
    });

    let publishDateObj;
    if (publishDate) {
      publishDateObj = new Date(publishDate);
      if (isNaN(publishDateObj)) {
        return NextResponse.json(
          { error: "Invalid publishDate" },
          { status: 400 }
        );
      }
    } else {
      publishDateObj = originalBlog.publishDate;
    }

    let categoryId = category_id ? parseInt(category_id, 10) : originalBlog.category_id;
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category_id" },
        { status: 400 }
      );
    }

    if (published === "Y") {
      await prisma.bloglivet.update({
        where: { id: selectedId },
        data: {
          author_id: parseInt(author_id),
        },
      });
    } else if (
      blogLiveId === undefined ||
      blogLiveId === null ||
      blogLiveId === "null" ||
      blogLiveId === ""
    ) {
      await prisma.blogt.update({
        where: { id: selectedId },
        data: {
          author_id: parseInt(author_id),
        },
      });
    } else {
      await prisma.blogt.update({
        where: { id: selectedId },
        data: {
          author_id: parseInt(author_id),
        },
      });
      await prisma.bloglivet.update({
        where: { id: parseInt(blogLiveId) },
        data: {
          author_id: parseInt(author_id),
        },
      });
    }

    if (published === "Y" && typeof image === "string") {
      const blog1 = await prisma.bloglivet.findUnique({
        where: { id: selectedId },
      });
      if (
        blog1.title === title &&
        blog1.description === description &&
        blog1.content === content &&
        blog1.featuredpost === featuredPost
      ) {
        return NextResponse.json(
          {
            result: "blog updated successfully, only author need to be updated",
          },
          { status: 200 }
        );
      }
    }

    if (typeof image === "object") {
      const filenameParts = image.name.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      blob = await put(`${slug}.${fileExtension}`, image, {
        access: "public",
      });
    }

    if (typeof image === "string") {
      if (published === "Y") {
        await prisma.blogt.create({
          data: {
            title,
            description,
            content,
            slug,
            image: "",
            published: "N",
            author_id: parseInt(author_id),
            bloglive_id: selectedId,
            featuredpost: featuredPost,
            publishDate: publishDateObj, // Include publishDate
            category_id: categoryId, 
          },
        });
      } else {
        await prisma.blogt.update({
          where: { id: selectedId },
          data: {
            title,
            description,
            content,
            slug,
            published: "N",
            author_id: parseInt(author_id),
            featuredpost: featuredPost,
            publishDate: publishDateObj, // Include publishDate
            category_id: categoryId, 
          },
        });
      }

      return NextResponse.json(
        { result: "blog updated successfully" },
        { status: 200 }
      );
    }

    if (typeof image === "object") {
      if (published === "Y") {
        await prisma.blogt.create({
          data: {
            title,
            description,
            content,
            slug,
            image: blob.url,
            published: "N",
            author_id: parseInt(author_id),
            bloglive_id: selectedId,
            featuredpost: featuredPost,
            publishDate: publishDateObj, // Include publishDate
            category_id: categoryId, 
          },
        });
      } else {
        await prisma.blogt.update({
          where: { id: selectedId },
          data: {
            title,
            description,
            content,
            slug,
            image: blob.url,
            published: "N",
            author_id: parseInt(author_id),
            featuredpost: featuredPost,
            publishDate: publishDateObj, // Include publishDate
            category_id: categoryId, 
          },
        });
      }

      return NextResponse.json(
        { result: "blog updated successfully" },
        { status: 200 }
      );
    }
    // Respond with success message
  } catch (error) {
    console.error("Error during blog addition:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to add blog" },
      { status: 500 }
    );
  }
}
