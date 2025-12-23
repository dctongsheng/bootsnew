import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/product-form'
import { prisma } from '@/lib/prisma'

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
