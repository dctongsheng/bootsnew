'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    featured?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Card className="overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500">
        <div className="relative aspect-square overflow-hidden bg-gray-100 mb-6 rounded-2xl">
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

        <div className="px-2">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ¥{product.price.toFixed(2)}
            </span>
            <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 transform translate-y-4 group-hover:translate-y-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
