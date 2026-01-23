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
    categories?: string
    subCategories?: string
  }>
}

// Category navigation items
const categoryItems = [
  { id: 'all', label: 'All Products' },
  { id: 'men-boots', label: 'Men Boots' },
  { id: 'women-boots', label: 'Women Boots' },
  { id: 'tactical-boots', label: 'Tactical Boots' },
]

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

export function CatalogSection({ allProducts }: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)

  // Get subcategories for active category
  const activeCategoryData = activeCategory !== 'all'
    ? PRODUCT_CATEGORIES[activeCategory as keyof typeof PRODUCT_CATEGORIES]
    : null
  const subCategories = (activeCategoryData?.subCategories || {}) as Record<string, string>

  // Filter products based on active category and subcategory
  let filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => {
        const productCategories = parseCategories(p.categories)
        return productCategories.includes(activeCategory)
      })

  // Further filter by subcategory if selected
  if (activeSubCategory && activeCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => {
      const productSubCategories = parseCategories(p.subCategories)
      return productSubCategories.includes(activeSubCategory)
    })
  }

  // Reset subcategory when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setActiveSubCategory(null)
  }

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
                        onClick={() => handleCategoryChange(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                          activeCategory === item.id
                            ? 'bg-amber-50 text-amber-700 font-semibold border-l-4 border-amber-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                      {/* Show subcategories when this category is active */}
                      {activeCategory === item.id && Object.keys(subCategories).length > 0 && (
                        <ul className="mt-1 ml-4 space-y-1">
                          {Object.entries(subCategories).map(([subKey, subLabel]) => (
                            <li key={subKey}>
                              <button
                                onClick={() => setActiveSubCategory(activeSubCategory === subKey ? null : subKey)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                  activeSubCategory === subKey
                                    ? 'bg-amber-100 text-amber-800 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {subLabel}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
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
