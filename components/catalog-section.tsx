'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { PRODUCT_CATEGORIES } from '@/lib/categories'

interface CatalogSectionProps {
  allProducts: Array<{
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    featured?: boolean
    category?: string
    subCategory?: string
  }>
}

// Category navigation items
const categoryItems = [
  { id: 'all', label: 'All Products' },
  { id: 'men-boots', label: 'Men Boots' },
  { id: 'women-boots', label: 'Women Boots' },
  { id: 'tactical-boots', label: 'Tactical Boots' },
]

export function CatalogSection({ allProducts }: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory)

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Product Catalog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional quality footwear for all needs. We offer OEM/ODM customization services
            for men's boots, women's boots, and tactical boots.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border-l-4 border-red-500 sticky top-24">
              <div className="bg-amber-700 text-white px-4 py-3 rounded-t-lg">
                <h3 className="font-bold text-lg">Categories</h3>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {categoryItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveCategory(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                          activeCategory === item.id
                            ? 'bg-amber-50 text-amber-700 font-semibold border-l-4 border-amber-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content - Product Grid */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No products in this category</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
