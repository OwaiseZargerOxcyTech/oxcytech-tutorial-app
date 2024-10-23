import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const author = await prisma.usert.findUnique({
      where: { id: Number(id) },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
