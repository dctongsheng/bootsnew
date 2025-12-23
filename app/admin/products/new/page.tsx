import { ProductForm } from '@/components/product-form'

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductForm />
      </div>
    </div>
  )
}
