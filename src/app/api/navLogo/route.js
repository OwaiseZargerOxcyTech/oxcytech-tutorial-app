import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const existingLogo = await prisma.navLogo.findFirst();

    if (existingLogo) {
      const updatedLogo = await prisma.navLogo.update({
        where: { id: existingLogo.id },
        data: { text },
      });

      return NextResponse.json(updatedLogo, { status: 200 });
    } else {
      const newLogo = await prisma.navLogo.create({
        data: {
          text,
        },
      });

      return NextResponse.json(newLogo, { status: 201 });
    }
  } catch (error) {
    console.error("Error adding nav logo:", error);
    return NextResponse.json(
      { error: "Failed to add nav logo" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const navLogo = await prisma.navLogo.findFirst();
    if (!navLogo) {
      return NextResponse.json({ message: "No logo found" }, { status: 404 });
    }

    return NextResponse.json(navLogo, { status: 200 });
  } catch (error) {
    console.error("Error fetching nav logo:", error);
    return NextResponse.json(
      { error: "Failed to fetch nav logo" },
      { status: 500 }
    );
  }
}
