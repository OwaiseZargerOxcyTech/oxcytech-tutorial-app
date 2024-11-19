import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const featuredApp = await prisma.featuredApp.findUnique({
      where: { id: Number(id) },
    });

    if (!featuredApp) {
      return NextResponse.json(
        { error: "featuredApp not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(featuredApp);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch featuredApp" },
      { status: 500 }
    );
  }
}

// Handling DELETE request for a specific featured app
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.featuredApp.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(
      { message: "featured app deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting featured app:", error);
    return NextResponse.json(
      { error: "Failed to delete featured app" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const data = await req.formData();
    const title = data.get("title");
    const description = data.get("description");
    const image = data.get("image");

    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const featuredAppData = {
      title,
      description,
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
      featuredAppData.image = blob.url;
    }

    let updatedFeaturedApp = await prisma.featuredApp.update({
      where: { id: parseInt(id) },
      data: { ...featuredAppData },
    });

    const responseData = {
      id: updatedFeaturedApp.id,
      title: updatedFeaturedApp.title,
      description: updatedFeaturedApp.description,
      image: updatedFeaturedApp.image,
    };

    return NextResponse.json(
      { result: "Featured App updated successfully", data: responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during featured app update:", error);
    return NextResponse.json(
      { success1: false, error: "Failed to update featured app" },
      { status: 500 }
    );
  }
}
