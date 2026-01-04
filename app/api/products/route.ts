import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PRODUCT_CATEGORIES } from '@/lib/categories'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, imageUrl, categories, subCategories, featured, order } = body

    if (!name || !description || !price || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Parse and validate categories
    const parsedCategories = categories && Array.isArray(categories)
      ? categories
      : categories && typeof categories === 'string'
        ? JSON.parse(categories)
        : []

    const parsedSubCategories = subCategories && Array.isArray(subCategories)
      ? subCategories
      : subCategories && typeof subCategories === 'string'
        ? JSON.parse(subCategories)
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

    // Get the highest current order value if not provided
    let finalOrder = order
    if (finalOrder === undefined || finalOrder === null) {
      const maxOrderProduct = await prisma.product.findFirst({
        orderBy: { order: 'desc' }
      })
      finalOrder = maxOrderProduct ? maxOrderProduct.order + 1 : 0
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        categories: JSON.stringify(parsedCategories),
        subCategories: JSON.stringify(parsedSubCategories),
        featured: featured || false,
        order: finalOrder
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
