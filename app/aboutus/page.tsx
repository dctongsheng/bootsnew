import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AboutUsPage() {
  // Get settings for hero background image
  let settings = await prisma.settings.findUnique({
    where: { id: 'settings' }
  })

  // Create default settings if not exists
  if (!settings) {
    settings = await prisma.settings.create({
      data: { id: 'settings' }
    })
  }
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
                Home
              </Link>
              <Link href="/#catalog" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Product Catalog
              </Link>
              <Link href="/#capabilities" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Capabilities
              </Link>
              <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Contact Us
              </Link>
              <Link href="/aboutus" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                About Us
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
              About Us
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Professional footwear materials manufacturer, committed to providing high-quality OEM/ODM solutions for global brands
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We are a professional footwear materials manufacturer with over 20 years of industry experience, headquartered in LuoHe City, HeNan Province, China. Since our establishment, we have been dedicated to the research, development, production, and manufacturing of high-quality footwear materials, providing OEM/ODM services to numerous renowned global brands.
                </p>
                <p>
                  With advanced production equipment, strict quality control systems, and a professional team, we can meet the diverse needs of different clients, offering one-stop solutions from design and prototyping to mass production.
                </p>
                <p>
                  We understand that quality is the lifeline of our business, so every process is strictly controlled to ensure that every pair of footwear materials meets international quality standards. Through ISO 9001 quality management system certification, we have established a comprehensive quality management system.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              {settings.heroBackgroundImage ? (
                <img
                  src={settings.heroBackgroundImage}
                  alt="Factory Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Factory Photo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">Quality First, Customer Centered</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We always adhere to the principle of quality first. From raw material procurement to finished product delivery, every step is strictly controlled to ensure product quality meets international standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                We are customer-oriented, providing personalized customization services, responding quickly to customer needs, and establishing long-term stable partnerships.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Innovation</h3>
              <p className="text-gray-600">
                We continuously introduce advanced technology and equipment, continuously improve production processes, enhance product quality and production efficiency, and maintain our leading position in the industry.
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
              <div className="text-gray-600 text-lg">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">100+</div>
              <div className="text-gray-600 text-lg">Partners</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">5M+</div>
              <div className="text-gray-600 text-lg">Annual Production (Pairs)</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-3">ISO 9001</div>
              <div className="text-gray-600 text-lg">Quality Certification</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Work With Us</h2>
          <p className="text-xl text-gray-300 mb-8">
            If you are interested in our products and services, please feel free to contact us. We look forward to establishing a long-term and stable partnership with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#catalog"
              className="px-8 py-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Browse Product Catalog
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Footwear Factory</h3>
              <p className="text-gray-400 text-sm">Professional Footwear Materials Manufacturer | OEM/ODM Services</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/#catalog" className="hover:text-white transition-colors">Catalog</Link>
              <Link href="/#capabilities" className="hover:text-white transition-colors">Capabilities</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/aboutus" className="hover:text-white transition-colors">About</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 Footwear Factory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

