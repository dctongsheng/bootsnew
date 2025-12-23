'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUpload } from '@/components/image-upload'
import { PRODUCT_CATEGORIES } from '@/lib/categories'

interface ProductFormProps {
  product?: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    subCategory?: string
    featured: boolean
  }
  onSubmit?: (data: any) => void
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(product?.category || 'men-boots')
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    imageUrl: product?.imageUrl || '',
    category: product?.category || 'men-boots',
    subCategory: product?.subCategory || '',
    featured: product?.featured || false
  })

  const categoryOptions = PRODUCT_CATEGORIES
  const subCategoryOptions = categoryOptions[selectedCategory as keyof typeof PRODUCT_CATEGORIES]?.subCategories || {}

  useEffect(() => {
    if (selectedCategory !== formData.category) {
      setFormData({
        ...formData,
        category: selectedCategory,
        subCategory: '' // Reset subcategory when category changes
      })
    }
  }, [selectedCategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? '编辑产品' : '添加新产品'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">产品类别 *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => {
                  setSelectedCategory(value)
                  setFormData({ ...formData, category: value, subCategory: '' })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择类别" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryOptions).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subCategory">子类别</Label>
              <Select
                value={formData.subCategory}
                onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                disabled={!formData.category || Object.keys(subCategoryOptions).length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder={Object.keys(subCategoryOptions).length === 0 ? "该类别无子类别" : "选择子类别"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(subCategoryOptions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
