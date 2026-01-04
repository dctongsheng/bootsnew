'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Home, LayoutGrid, Mail, Settings, GripVertical } from 'lucide-react'
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  categories?: string
  subCategories?: string
  featured: boolean
  order: number
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

// Sortable Product Card Component
function SortableProductCard({
  product,
  onEdit,
  onDelete
}: {
  product: Product
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const categories = parseCategories(product.categories)
  const subCategories = parseCategories(product.subCategories)

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="overflow-hidden group relative">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
          aria-label="拖拽排序"
        >
          <GripVertical className="w-5 h-5 text-gray-600" />
        </button>

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
            {categories.map(cat => {
              const categoryData = PRODUCT_CATEGORIES[cat as keyof typeof PRODUCT_CATEGORIES]
              return (
                <span key={cat} className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium">
                  {categoryData?.label}
                </span>
              )
            })}
            {subCategories.map(subCat => (
              <span key={subCat} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                {subCat}
              </span>
            ))}
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
              onClick={() => onDelete(product.id)}
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isReordering, setIsReordering] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = products.findIndex((p) => p.id === active.id)
    const newIndex = products.findIndex((p) => p.id === over.id)

    // Optimistic update
    const newProducts = arrayMove(products, oldIndex, newIndex)
    setProducts(newProducts)
    setIsReordering(true)

    // Update order values
    const reorderedProducts = newProducts.map((product, index) => ({
      id: product.id,
      order: index,
    }))

    try {
      const response = await fetch('/api/products/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: reorderedProducts }),
      })

      if (!response.ok) throw new Error('Failed to reorder')

      // Update local state with confirmed order
      setProducts(newProducts.map((p, i) => ({ ...p, order: i })))
    } catch (error) {
      console.error('Failed to reorder products:', error)
      alert('排序失败，请重试')
      // Revert on error
      await fetchProducts()
    } finally {
      setIsReordering(false)
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
                <Button size="default" disabled={isReordering}>
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
              <p className="text-gray-600">
                管理您的产品库存和信息
                {isReordering && (
                  <span className="ml-2 text-amber-600">正在保存排序...</span>
                )}
              </p>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={products.map(p => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isReordering ? 'opacity-50 pointer-events-none' : ''}`}>
                  {products.map((product) => (
                    <SortableProductCard
                      key={product.id}
                      product={product}
                      onEdit={(id) => console.log('Edit', id)}
                      onDelete={(id) => setDeleteId(id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
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
