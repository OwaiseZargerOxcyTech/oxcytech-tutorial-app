import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    console.log("this is the image post api")
    const blobResponse = await put('your-image-path', image, {
      access: 'public',
    });

    const imageUrl = blobResponse.url;

    const existingImage = await prisma.sideImg.findFirst();

    if (existingImage) {
      const updatedImage = await prisma.sideImg.update({
        where: { id: existingImage.id },
        data: { image: imageUrl },
      });

      return NextResponse.json(updatedImage, { status: 200 });
    } else {
      const newImage = await prisma.sideImg.create({
        data: { image: imageUrl },
      });

      return NextResponse.json(newImage, { status: 201 });
    }
  } catch (error) {
    console.error("Error adding image:", error);
    return NextResponse.json(
      { error: "Failed to add image" },
      { status: 500 }
    );
  }
}
export async function GET() {
    try {
        const sideImage = await prisma.sideImg.findFirst();
        
        if (!sideImage) {
            return NextResponse.json({ message: 'No image found' }, { status: 404 });
        }
  
        return NextResponse.json({ image: sideImage.image }, { status: 200 }); 
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
