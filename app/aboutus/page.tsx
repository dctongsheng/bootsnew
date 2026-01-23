import Link from 'next/link'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
                LANRTTDUN
              </Link>
              <p className="text-xs text-gray-500">Premium Materials · OEM / ODM Solutions</p>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                首页
              </Link>
              <Link href="/#catalog" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                产品目录
              </Link>
              <Link href="/#capabilities" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                工厂实力
              </Link>
              <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                联系我们
              </Link>
              <Link href="/aboutus" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                关于我们
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              关于我们
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              专业的鞋材制造商，致力于为全球品牌提供高品质的OEM/ODM解决方案
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">我们的故事</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  我们是一家拥有20多年行业经验的专业鞋材制造商，总部位于中国广东省东莞市。自成立以来，我们始终专注于高品质鞋材的研发、生产和制造，为全球众多知名品牌提供OEM/ODM服务。
                </p>
                <p>
                  凭借先进的生产设备、严格的质量控制体系和专业的团队，我们能够满足不同客户的各种需求，从设计打样到批量生产，提供一站式解决方案。
                </p>
                <p>
                  我们深知品质是企业的生命线，因此每一道工序都经过严格把控，确保每一双鞋材都符合国际质量标准。通过ISO 9001质量管理体系认证，我们建立了完善的质量管理体系。
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">工厂实景图</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">我们的价值观</h2>
            <p className="text-xl text-gray-600">以品质为本，以客户为中心</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">品质第一</h3>
              <p className="text-gray-600">
                我们始终坚持品质第一的原则，从原材料采购到成品出厂，每一环节都严格把控，确保产品质量达到国际标准。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">客户至上</h3>
              <p className="text-gray-600">
                我们以客户需求为导向，提供个性化的定制服务，快速响应客户需求，建立长期稳定的合作关系。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">持续创新</h3>
              <p className="text-gray-600">
                我们不断引进先进技术和设备，持续改进生产工艺，提升产品质量和生产效率，保持行业领先地位。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">20+</div>
              <div className="text-gray-600 text-lg">年行业经验</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">100+</div>
              <div className="text-gray-600 text-lg">合作伙伴</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">500万+</div>
              <div className="text-gray-600 text-lg">年产量（双）</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">ISO 9001</div>
              <div className="text-gray-600 text-lg">质量认证</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">与我们合作</h2>
          <p className="text-xl text-gray-300 mb-8">
            如果您对我们的产品和服务感兴趣，欢迎随时与我们联系。我们期待与您建立长期稳定的合作关系。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#catalog"
              className="px-8 py-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              浏览产品目录
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              联系我们
            </Link>
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
              <Link href="/#catalog" className="hover:text-white transition-colors">目录</Link>
              <Link href="/#capabilities" className="hover:text-white transition-colors">实力</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">联系</Link>
              <Link href="/aboutus" className="hover:text-white transition-colors">关于</Link>
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

