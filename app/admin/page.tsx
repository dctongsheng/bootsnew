'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Home, LayoutGrid, Mail, Settings } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/lib/categories'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  subCategory?: string | null
  featured: boolean
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchMessageCount()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const fetchMessageCount = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      const newMessages = data.filter((m: any) => m.status === 'new').length
      setMessageCount(newMessages)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/products/${deleteId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete product')

      setProducts(products.filter(p => p.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert('删除失败，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <LayoutGrid className="w-6 h-6 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button variant="outline" size="default">
                  <Home className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <Link href="/admin/messages" className="relative">
                <Button variant="outline" size="default">
                  <Mail className="w-4 h-4 mr-2" />
                  消息
                  {messageCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {messageCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" size="default">
                  <Settings className="w-4 h-4 mr-2" />
                  设置
                </Button>
              </Link>
              <Link href="/admin/products/new">
                <Button size="default">
                  <Plus className="w-4 h-4 mr-2" />
                  添加产品
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-32">
            <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">加载中...</p>
          </div>
        ) : products.length === 0 ? (
          <Card className="p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <LayoutGrid className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                暂无产品
              </h3>
              <p className="text-gray-500 mb-6">
                开始添加您的第一个产品
              </p>
              <Link href="/admin/products/new">
                <Button size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  添加产品
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                产品管理 ({products.length})
              </h2>
              <p className="text-gray-600">管理您的产品库存和信息</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const categoryData = PRODUCT_CATEGORIES[product.category as keyof typeof PRODUCT_CATEGORIES]
                const categoryLabel = categoryData?.label || product.category
                const subCategoryLabel = product.subCategory && categoryData
                  ? categoryData.subCategories[product.subCategory as any]
                  : null

                return (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative aspect-square bg-gray-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                          推荐
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium">
                          {categoryLabel}
                        </span>
                        {subCategoryLabel && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                            {subCategoryLabel}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        ¥{product.price.toFixed(2)}
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/admin/products/${product.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Pencil className="w-4 h-4 mr-2" />
                            编辑
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeleteId(product.id)}
                          className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除这个产品吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
