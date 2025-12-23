import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { ContactForm } from '@/components/contact-form'
import { prisma } from '@/lib/prisma'
import { PRODUCT_CATEGORIES } from '@/lib/categories'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Group products by category and subcategory
  const groupedProducts = {
    'men-boots': {
      products: products.filter(p => p.category === 'men-boots'),
      subCategories: {
        'men-snow-boots': products.filter(p => p.subCategory === 'men-snow-boots'),
        'men-hiking-boots': products.filter(p => p.subCategory === 'men-hiking-boots'),
        'men-work-boots': products.filter(p => p.subCategory === 'men-work-boots'),
      }
    },
    'women-boots': {
      products: products.filter(p => p.category === 'women-boots'),
      subCategories: {
        'women-chelsea-boots': products.filter(p => p.subCategory === 'women-chelsea-boots'),
        'women-snow-boots': products.filter(p => p.subCategory === 'women-snow-boots'),
      }
    },
    'tactical-boots': {
      products: products.filter(p => p.category === 'tactical-boots'),
      subCategories: {}
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
                鞋材工厂
              </Link>
              <p className="text-xs text-gray-500">专业的鞋材制造商</p>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                首页
              </Link>
              <Link href="#catalog" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                产品目录
              </Link>
              <Link href="#capabilities" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                工厂实力
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                联系我们
              </Link>
              <Link href="/admin" className="text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                管理
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-medium tracking-wider text-sm mb-4">
              专业鞋材制造商 | OEM/ODM 服务
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              优质鞋材
              <br />
              <span className="text-amber-400">智能制造</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              我们专注于高品质鞋材的生产与制造，为全球品牌提供OEM/ODM解决方案。
              严选材料，精工制造，为您打造卓越产品。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#catalog"
                className="px-8 py-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                浏览产品目录
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
              >
                联系我们
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-gray-400 text-sm">年行业经验</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400 text-sm">合作伙伴</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500万+</div>
              <div className="text-gray-400 text-sm">年产量（双）</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">ISO 9001</div>
              <div className="text-gray-400 text-sm">质量认证</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="catalog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">产品目录</h2>
            <p className="text-xl text-gray-600">专业品质，满足各种需求</p>
          </div>

          {/* Men Boots */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
              {PRODUCT_CATEGORIES['men-boots'].label}
            </h3>
            {Object.entries(groupedProducts['men-boots'].subCategories).map(([subCatKey, subCatProducts]) => {
              const subCatLabel = PRODUCT_CATEGORIES['men-boots'].subCategories[subCatKey as any] || subCatKey
              return (
                <div key={subCatKey} className="mb-12">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">
                    {subCatLabel}
                  </h4>
                {subCatProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subCatProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 py-8">暂无该分类产品</p>
                )}
              </div>
              )
            })}
            {groupedProducts['men-boots'].products.filter(p => !p.subCategory).length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-600 mb-4">其他</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedProducts['men-boots'].products.filter(p => !p.subCategory).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Women Boots */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
              {PRODUCT_CATEGORIES['women-boots'].label}
            </h3>
            {Object.entries(groupedProducts['women-boots'].subCategories).map(([subCatKey, subCatProducts]) => {
              const subCatLabel = PRODUCT_CATEGORIES['women-boots'].subCategories[subCatKey as any] || subCatKey
              return (
                <div key={subCatKey} className="mb-12">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">
                    {subCatLabel}
                  </h4>
                {subCatProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subCatProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 py-8">暂无该分类产品</p>
                )}
              </div>
              )
            })}
            {groupedProducts['women-boots'].products.filter(p => !p.subCategory).length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-600 mb-4">其他</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedProducts['women-boots'].products.filter(p => !p.subCategory).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tactical Boots */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
              {PRODUCT_CATEGORIES['tactical-boots'].label}
            </h3>
            {groupedProducts['tactical-boots'].products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {groupedProducts['tactical-boots'].products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-8">暂无该分类产品</p>
            )}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-8">暂无产品展示</p>
              <Link
                href="/admin"
                className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                前往管理后台添加产品
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-xl text-gray-600">专业的制造能力，可靠的合作伙伴</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">品质保证</h3>
              <p className="text-gray-600">通过 ISO 9001 质量管理体系认证，每道工序严格把控</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">快速响应</h3>
              <p className="text-gray-600">从设计到生产，7天快速打样，高效满足您的需求</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">价格优势</h3>
              <p className="text-gray-600">厂家直销，没有中间商，为您提供最具竞争力的价格</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h2>
            <p className="text-xl text-gray-600">如有任何疑问或需求，欢迎随时与我们联系</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">联系方式</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">邮箱</div>
                      <div className="text-gray-600">info@yourfactory.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">电话</div>
                      <div className="text-gray-600">+86 xxx xxxx xxxx</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">地址</div>
                      <div className="text-gray-600">中国 · 广东省 · 东莞市</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">服务优势</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">OEM/ODM 定制服务</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">低起订量支持</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">快速打样交付</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">全程质量跟踪</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">鞋材工厂</h3>
              <p className="text-gray-400 text-sm">专业的鞋材制造商 | OEM/ODM 服务</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">首页</Link>
              <Link href="#catalog" className="hover:text-white transition-colors">目录</Link>
              <Link href="#capabilities" className="hover:text-white transition-colors">实力</Link>
              <Link href="#contact" className="hover:text-white transition-colors">联系</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 鞋材工厂. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
