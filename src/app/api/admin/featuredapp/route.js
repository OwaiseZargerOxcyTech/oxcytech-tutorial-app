import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const featuredApp = await prisma.featuredApp.findFirst();
    return NextResponse.json({ result: featuredApp }, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured app:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured app" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const image = data.get("image");
    const title = data.get("title");
    const description = data.get("description");

    let newFeaturedApp;
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

    newFeaturedApp = await prisma.featuredApp.create({
      data: {
        title,
        description,
      },
    });

    if (image && image.name) {
      const filenameParts = image.name.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      // Upload image to Vercel Blob storage
      const blob = await put(`${slug}.${fileExtension}`, image, {
        access: "public",
      });

      newFeaturedApp = await prisma.featuredApp.update({
        where: { id: newFeaturedApp.id },
        data: {
          image: blob.url,
        },
      });

      const responseData = {
        id: newFeaturedApp.id,
        title: newFeaturedApp.title,
        description: newFeaturedApp.description,
        image: newFeaturedApp.image,
      };
      return NextResponse.json({ result: responseData }, { status: 200 });
    }
  } catch (error) {
    console.log("Error adding featured App", error);
    return NextResponse.json(
      { success1: false, error: "Failed to add featured app" },
      { status: 500 }
    );
  }
}
