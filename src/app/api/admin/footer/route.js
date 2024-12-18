import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// GET Handler: Fetch All Footers
export async function GET() {
  try {
    const footers = await prisma.footer.findMany();
    return NextResponse.json(footers, { status: 200 });
  } catch (error) {
    console.error("Error fetching footers:", error);
    return NextResponse.json(
      { error: "Failed to fetch footers" },
      { status: 500 }
    );
  }
}

// POST Handler: Add New footer
export async function POST(request) {
  try {
    const { name, link, isActive } = await request.json();

    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    if (!name || !slug || !link) {
      return NextResponse.json(
        { error: "Name and link are required" },
        { status: 400 }
      );
    }

    const existingFooter = await prisma.footer.findUnique({
      where: { slug },
    });

    if (existingFooter) {
      return NextResponse.json(
        { error: "Footer with this slug already exists" },
        { status: 400 }
      );
    }

    // Create new footer
    const newFooter = await prisma.footer.create({
      data: {
        name,
        isActive,
        slug,
        link,
      },
    });

    return NextResponse.json(newFooter, { status: 201 });
  } catch (error) {
    console.error("Error adding footer:", error);
    return NextResponse.json(
      { error: "Failed to add footer" },
      { status: 500 }
    );
  }
}
