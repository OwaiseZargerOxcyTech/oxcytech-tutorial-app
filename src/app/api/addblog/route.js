import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const data = await req.formData();
    const image = data.get("image");
    const title = data.get("title");
    const desc = data.get("desc");
    const content = data.get("content");
    let published = data.get("published");
    const publishDate = data.get("publishDate");
    const authorId = parseInt(data.get("authorId"), 10); // Change to 'authorId'
    const featuredPost = data.get("featuredPost");
    const categoryId = parseInt(data.get("categoryId"), 10);

    let newBlog;
    let slug;

    const prisma = new PrismaClient();

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
    newBlog = await prisma.blogt.create({
      data: {
        title,
        slug,
        description: desc,
        publishDate: publishDateObj,
        content,
        published,
        featuredpost: featuredPost,
        category: {
          connect: {
            id: categoryId,
          },
        },
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

    // Handle image upload if image exists
    if (image && image.name) {
      const filenameParts = image.name.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      // Upload image to Vercel Blob storage
      const blob = await put(`${slug}.${fileExtension}`, image, {
        access: "public",
      });

      // Update the blog entry with the image URL
      newBlog = await prisma.blogt.update({
        where: { id: newBlog.id },
        data: {
          image: blob.url,
        },
        include: {
          author: {
            select: {
              authorName: true,
            },
          },
        },
      });
    }

    const responseData = {
      id: newBlog.id,
      title: newBlog.title,
      slug: newBlog.slug,
      description: newBlog.description,
      publishDate: newBlog.publishDate,
      content: newBlog.content,
      published: newBlog.published,
      author_id: newBlog.author_id,
      featuredpost: newBlog.featuredpost,
      image: newBlog.image,
      authorName: newBlog.author?.authorName,
      category_id: newBlog.category_id,
    };

    return NextResponse.json({ result: responseData }, { status: 200 });
  } catch (error) {
    console.error("Error during blog addition:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to add blog" },
      { status: 500 }
    );
  }
}
