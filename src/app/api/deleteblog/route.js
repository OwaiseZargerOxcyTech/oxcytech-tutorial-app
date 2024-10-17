import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    const data = await req.formData();
    const published = data.get("published");
    let selectedId = data.get("selectedId");
    selectedId = parseInt(selectedId);
    
    if (published === "Y") {
      await prisma.bloglivet.delete({
        where: { id: selectedId },
      });
    } else {
      await prisma.blogt.delete({
        where: { id: selectedId },
      });
    } 
return NextResponse.json(
      { result: "blog deleted successfully" },
      { status: 200 }
    );
    // Respond with success message
  } catch (error) {
    console.error("Error during blog delete:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
