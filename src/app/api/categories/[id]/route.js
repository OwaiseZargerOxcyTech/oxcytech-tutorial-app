import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handling GET request for a specific category
export async function GET(request, { params }) {
  const { id } = params; 
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }, 
    });
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// Handling DELETE request for a specific category
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const { name, title, description } = await req.json();
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, slug, title, description },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    const { isActive } = await req.json();
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { isActive },
    });
    // fetchActiveCategories();
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error updating category status:", error);
    return NextResponse.json(
      { error: "Failed to update category status" },
      { status: 500 }
    );
  }
}
