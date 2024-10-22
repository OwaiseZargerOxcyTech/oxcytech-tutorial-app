import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma"; // Adjust the path according to your project structure

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image"); // Get the uploaded image
    const imageName = formData.get("imageName"); // Optional image name field

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const imageUploadName = imageName || image.name.split(".")[0]; // Use provided name or default to original
    const fileExtension = image.name.split(".").pop(); // Get file extension

    // Upload image to Vercel Blob storage
    const blob = await put(`${imageUploadName}.${fileExtension}`, image, {
      access: "public",
    });

    const imageUrl = blob.url;

    // Check if an image already exists
    const existingImage = await prisma.sideImg.findFirst();

    let updatedImage;
    if (existingImage) {
      // Update existing image with new URL and name
      updatedImage = await prisma.sideImg.update({
        where: { id: existingImage.id },
        data: { image: imageUrl },
      });
    } else {
      // Create a new image entry if no image exists
      updatedImage = await prisma.sideImg.create({
        data: { image: imageUrl },
      });
    }

    const responseData = {
      id: updatedImage.id,
      imageUrl: updatedImage.image,
    };

    return NextResponse.json({ result: responseData }, { status: 200 });
  } catch (error) {
    console.error("Error adding/updating image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add or update image" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sideImage = await prisma.sideImg.findFirst();

    if (!sideImage) {
      return NextResponse.json({ message: "No image found" }, { status: 404 });
    }

    const responseData = {
      id: sideImage.id,
      imageUrl: sideImage.image,
    };

    return NextResponse.json({ result: responseData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
