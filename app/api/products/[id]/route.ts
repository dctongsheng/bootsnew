import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PRODUCT_CATEGORIES } from '@/lib/categories'
import { deleteFromR2, isR2Url } from '@/lib/r2'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, price, imageUrl, categories, subCategories, featured } = body

    // Parse and validate categories if provided
    let parsedCategories
    if (categories !== undefined) {
      parsedCategories = Array.isArray(categories)
        ? categories
        : typeof categories === 'string'
          ? JSON.parse(categories)
          : []

      // Validate categories
      const validCategories = Object.keys(PRODUCT_CATEGORIES)
      for (const cat of parsedCategories) {
        if (!validCategories.includes(cat)) {
          return NextResponse.json(
            { error: `Invalid category: ${cat}` },
            { status: 400 }
          )
        }
      }
    }

    // Parse and validate subcategories if provided
    let parsedSubCategories
    if (subCategories !== undefined) {
      parsedSubCategories = Array.isArray(subCategories)
        ? subCategories
        : typeof subCategories === 'string'
          ? JSON.parse(subCategories)
          : []

      // Get all valid subcategories
      const allValidSubCategories = Object.values(PRODUCT_CATEGORIES)
        .flatMap(cat => Object.keys(cat.subCategories))

      for (const subCat of parsedSubCategories) {
        if (!allValidSubCategories.includes(subCat)) {
          return NextResponse.json(
            { error: `Invalid subcategory: ${subCat}` },
            { status: 400 }
          )
        }
      }
    }

    // Delete old R2 image if imageUrl is changing
    if (imageUrl) {
      const existing = await prisma.product.findUnique({ where: { id }, select: { imageUrl: true } })
      if (existing?.imageUrl && existing.imageUrl !== imageUrl && isR2Url(existing.imageUrl)) {
        deleteFromR2(existing.imageUrl).catch((err) => console.error('Failed to delete old R2 image:', err))
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(imageUrl && { imageUrl }),
        ...(parsedCategories !== undefined && { categories: JSON.stringify(parsedCategories) }),
        ...(parsedSubCategories !== undefined && { subCategories: JSON.stringify(parsedSubCategories) }),
        ...(featured !== undefined && { featured })
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id }, select: { imageUrl: true } })
    if (product?.imageUrl && isR2Url(product.imageUrl)) {
      deleteFromR2(product.imageUrl).catch((err) => console.error('Failed to delete R2 image:', err))
    }
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
