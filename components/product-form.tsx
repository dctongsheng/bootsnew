'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/image-upload'
import { PRODUCT_CATEGORIES } from '@/lib/categories'
import { X } from 'lucide-react'

interface ProductFormProps {
  product?: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    categories?: string
    subCategories?: string
    featured: boolean
  }
  onSubmit?: (data: any) => void
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Parse categories from JSON string or use default
  const parseCategories = (categoriesStr?: string) => {
    if (!categoriesStr) return []
    try {
      const parsed = JSON.parse(categoriesStr)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const initialCategories = parseCategories(product?.categories)
  const initialSubCategories = parseCategories(product?.subCategories)

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategories.length > 0 ? initialCategories : ['men-boots']
  )
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(initialSubCategories)

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    imageUrl: product?.imageUrl || '',
    featured: product?.featured || false
  })

  // Handle category toggle
  const toggleCategory = (categoryKey: string) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(categoryKey)
      const newCategories = isSelected
        ? prev.filter(c => c !== categoryKey)
        : [...prev, categoryKey]

      // Remove subcategories that belong to the deselected category
      if (isSelected) {
        const categorySubCategories = PRODUCT_CATEGORIES[categoryKey as keyof typeof PRODUCT_CATEGORIES]?.subCategories || {}
        const subCategoriesToRemove = Object.keys(categorySubCategories)
        setSelectedSubCategories(prev =>
          prev.filter(sub => !subCategoriesToRemove.includes(sub))
        )
      }

      return newCategories
    })
  }

  // Handle subcategory toggle
  const toggleSubCategory = (subCategoryKey: string) => {
    setSelectedSubCategories(prev => {
      const isSelected = prev.includes(subCategoryKey)
      return isSelected
        ? prev.filter(s => s !== subCategoryKey)
        : [...prev, subCategoryKey]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        categories: selectedCategories,
        subCategories: selectedSubCategories
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Failed to save product')

      if (onSubmit) {
        onSubmit(await response.json())
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('保存失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  // Get all subcategories grouped by parent category
  const getSubCategoriesByParent = () => {
    const result: { [key: string]: { label: string; subCategories: { [key: string]: string } } } = {}

    selectedCategories.forEach(catKey => {
      const categoryData = PRODUCT_CATEGORIES[catKey as keyof typeof PRODUCT_CATEGORIES]
      if (categoryData && Object.keys(categoryData.subCategories).length > 0) {
        result[catKey] = {
          label: categoryData.label,
          subCategories: categoryData.subCategories
        }
      }
    })

    return result
  }

  const subCategoriesByParent = getSubCategoriesByParent()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? '编辑产品' : '添加新产品'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection - Multiple Checkboxes */}
          <div>
            <Label className="text-base font-semibold mb-3 block">产品类别 (可多选) *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(PRODUCT_CATEGORIES).map(([key, { label }]) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCategories.includes(key)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(key)}
                    onChange={() => toggleCategory(key)}
                    className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>

            {/* Show selected categories as tags */}
            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map(cat => {
                  const categoryData = PRODUCT_CATEGORIES[cat as keyof typeof PRODUCT_CATEGORIES]
                  return (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
                    >
                      {categoryData?.label}
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className="hover:bg-amber-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {/* Subcategory Selection - Grouped by Parent */}
          {Object.keys(subCategoriesByParent).length > 0 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">子类别 (可多选)</Label>
              <div className="space-y-4">
                {Object.entries(subCategoriesByParent).map(([parentKey, { label, subCategories }]) => (
                  <div key={parentKey} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">{label}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(subCategories).map(([subKey, subLabel]) => (
                        <label
                          key={subKey}
                          className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors text-sm ${
                            selectedSubCategories.includes(subKey)
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubCategories.includes(subKey)}
                            onChange={() => toggleSubCategory(subKey)}
                            className="h-3 w-3 text-amber-600 rounded focus:ring-amber-500"
                          />
                          <span>{subLabel}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Show selected subcategories as tags */}
              {selectedSubCategories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSubCategories.map(subCat => (
                    <span
                      key={subCat}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {subCat}
                      <button
                        type="button"
                        onClick={() => toggleSubCategory(subCat)}
                        className="hover:bg-gray-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="name">产品名称 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="例如：Winter Pro Snow Boots"
            />
          </div>

          <div>
            <Label htmlFor="description">产品描述 *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              placeholder="描述产品的特点、材质、适用场景等..."
            />
          </div>

          <div>
            <Label htmlFor="price">价格 (¥) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="例如：1299.00"
            />
          </div>

          <div>
            <Label>产品图片 *</Label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              设为推荐产品
            </Label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading || !formData.imageUrl}>
              {isLoading ? '保存中...' : product ? '更新产品' : '添加产品'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
