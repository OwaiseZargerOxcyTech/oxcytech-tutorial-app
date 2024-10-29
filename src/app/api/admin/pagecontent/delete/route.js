import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    const data = await req.formData();
    let selectedId = data.get("selectedId");
    selectedId = parseInt(selectedId);

    await prisma.pageContent.delete({
      where: { id: selectedId },
    });

    return NextResponse.json(
      { result: "page content item deleted successfully" },
      { status: 200 }
    );
    // Respond with success message
  } catch (error) {
    console.error("Error during page content item delete:", error);
    return NextResponse.json(
      { error: "Failed to delete page content item" },
      { status: 500 }
    );
  }
}
