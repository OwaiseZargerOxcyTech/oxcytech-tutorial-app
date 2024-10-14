import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fetch from "node-fetch";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

async function deleteBlob(blobName) {
  const token =
    "vercel_blob_rw_jUHo6lzVKmb7H9EZ_CKeKUeUhEEokt1LfN6xrmbbhpMkamB"; // Replace with your Vercel token
  const projectId = "prj_tYSSNkO4oeejD8OAxFhmeRgyecqc"; // Replace with your Vercel project ID

  try {
    const response = await fetch(
      `https://api.vercel.com/v2/now/files/${projectId}/${blobName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete blob");
    }

    console.log("Blob deleted successfully");
  } catch (error) {
    console.error("Error deleting blob:", error);
  }
}

function getBlobNameFromUrl(blobUrl) {
  try {
    const url = new URL(blobUrl);
    const pathParts = url.pathname.split("/");
    const blobName = pathParts[pathParts.length - 1];
    return blobName;
  } catch (error) {
    console.error("Error extracting blob name:", error);
    return null;
  }
}

export async function DELETE(req) {
  try {
    const data = await req.formData();
    console.log("data is: ", data);
    const published = data.get("published");
    const slug = data.get("slug");
    const blogLiveId = data.get("blogLiveId");
    let selectedId = data.get("selectedId");
    selectedId = parseInt(selectedId);
    const previousimage = data.get("previousimage");
    if (!previousimage) {
      return NextResponse.json({ success1: false });
    }

    if (published === "Y") {
      const blog = await prisma.bloglivet.findFirst({
        where: { id: selectedId },
      });

      const BlobName = getBlobNameFromUrl(blog.image);

      deleteBlob(BlobName);

      await prisma.bloglivet.delete({
        where: { id: selectedId },
      });
    } else if (
      blogLiveId === undefined ||
      blogLiveId === null ||
      blogLiveId === "null" ||
      blogLiveId === ""
    ) {
      const blog = await prisma.blogt.findFirst({
        where: { id: selectedId },
      });

      const BlobName = getBlobNameFromUrl(blog.image);

      deleteBlob(BlobName);

      await prisma.blogt.delete({
        where: { id: selectedId },
      });
    } else {
      const blog = await prisma.blogt.findFirst({
        where: { id: selectedId },
      });

      const BlobName = getBlobNameFromUrl(blog.image);

      deleteBlob(BlobName);

      const liveblog = await prisma.bloglivet.findFirst({
        where: { id: parseInt(blogLiveId) },
      });

      const BlobNameLive = getBlobNameFromUrl(liveblog.image);

      deleteBlob(BlobNameLive);

      await prisma.blogt.delete({
        where: { id: selectedId },
      });
      await prisma.bloglivet.delete({
        where: { id: parseInt(blogLiveId) },
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
