'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductInquiryModal } from '@/components/product-inquiry-modal'
import { PRODUCT_CATEGORIES } from '@/lib/categories'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    featured?: boolean
    categories?: string
    subCategories?: string
  }
}

// Helper function to parse JSON arrays
const parseCategories = (categoriesStr?: string): string[] => {
  if (!categoriesStr) return []
  try {
    const parsed = JSON.parse(categoriesStr)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const categories = parseCategories(product.categories)

  return (
    <>
      <div className="group">
        <Card className="overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500 h-full flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-2xl">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wider">
                FEATURED
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="flex-1 flex flex-col px-2 pt-4 pb-6">
            {/* Category tags */}
            {categories.length > 0 && (
              <div className="flex gap-1 flex-wrap mb-2">
                {categories.map(cat => {
                  const categoryData = PRODUCT_CATEGORIES[cat as keyof typeof PRODUCT_CATEGORIES]
                  return (
                    <span
                      key={cat}
                      className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium"
                    >
                      {categoryData?.label}
                    </span>
                  )
                })}
              </div>
            )}

            <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
              {product.description}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gray-900 hover:bg-amber-500 text-white font-medium transition-colors"
            >
              Contact Now
            </Button>
          </div>
        </Card>
      </div>

      <ProductInquiryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        productName={product.name}
      />
    </>
  )
}
