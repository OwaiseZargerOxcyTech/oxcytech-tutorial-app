import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// Handling GET request for a specific footer
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const footer = await prisma.footer.findUnique({
      where: { id: Number(id) },
    });

    if (!footer) {
      return NextResponse.json({ error: "footer not found" }, { status: 404 });
    }

    return NextResponse.json(footer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch footer" },
      { status: 500 }
    );
  }
}

// Handling DELETE request for a specific footer
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.footer.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(
      { message: "footer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting footer:", error);
    return NextResponse.json(
      { error: "Failed to delete footer" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const { name, link } = await req.json();
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const updatedFooter = await prisma.footer.update({
      where: { id: parseInt(id) },
      data: { name, slug, link },
    });
    return NextResponse.json(updatedFooter, { status: 200 });
  } catch (error) {
    console.error("Error updating footer:", error);
    return NextResponse.json(
      { error: "Failed to update footer" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    const { isActive } = await req.json();
    const updatedFooter = await prisma.footer.update({
      where: { id: parseInt(id) },
      data: { isActive },
    });
    // fetchActiveFooters();
    return NextResponse.json(updatedFooter, { status: 200 });
  } catch (error) {
    console.error("Error updating footer status:", error);
    return NextResponse.json(
      { error: "Failed to update footer status" },
      { status: 500 }
    );
  }
}
