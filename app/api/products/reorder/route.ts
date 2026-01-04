import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { products } = body

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Invalid input: products must be an array' },
        { status: 400 }
      )
    }

    // 使用事务批量更新产品order
    await prisma.$transaction(
      products.map(({ id, order }: { id: string; order: number }) =>
        prisma.product.update({
          where: { id },
          data: { order }
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering products:', error)
    return NextResponse.json(
      { error: 'Failed to reorder products' },
      { status: 500 }
    )
  }
}
