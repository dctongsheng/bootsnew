import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { CatalogSection } from '@/components/catalog-section'
import { MobileNav } from '@/components/mobile-nav'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' }
  })

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

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="#catalog" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Product Catalog
              </Link>
              <Link href="#capabilities" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Capabilities
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Contact Us
              </Link>
              <Link href="/aboutus" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                About Us
              </Link>
            </div>

            {/* Mobile Nav */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{
          ...(settings.heroBackgroundImage && {
            backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.85), rgba(31, 41, 55, 0.85), rgba(17, 24, 39, 0.85)), url(${settings.heroBackgroundImage})`,
          }),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Superior Materials
              <br />
              <span className="text-amber-400">Advanced Manufacturing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We are a professional footwear manufacturer specializing in shoes made with premium materials. We provide OEM and ODM services for global brands, focusing on material quality, durability, and craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#catalog"
                className="px-8 py-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Browse Catalog
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-gray-400 text-sm">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400 text-sm">Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500万+</div>
              <div className="text-gray-400 text-sm">Annual Production (Pairs)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">ISO 9001</div>
              <div className="text-gray-400 text-sm">Quality Certification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <CatalogSection allProducts={products} />

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Professional Manufacturing Capabilities, Reliable Partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">ISO 9001 certified quality management system with strict control at every stage</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Response</h3>
              <p className="text-gray-600">From design to production, 7-day rapid prototyping to efficiently meet your needs</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Pricing</h3>
              <p className="text-gray-600">Direct from manufacturer, no middlemen, providing the most competitive prices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">If you have any questions or needs, please feel free to contact us</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600">lijuncao50@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Tel</div>
                      <div className="text-gray-600">(01) 438 410 0886</div>
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
                      <div className="font-medium text-gray-900">Address</div>
                      <div className="text-gray-600">280 Boul Rene-Levesque West, Montreal, QC, H2Z 0B5</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Service Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">OEM/ODM Customization Services</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Low Minimum Order Quantity Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Fast Prototyping & Delivery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Full Quality Tracking</span>
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
              <h3 className="text-xl font-bold mb-2">LANRTTDUN</h3>
              <p className="text-gray-400 text-sm">Premium Materials · OEM / ODM Solutions</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="#catalog" className="hover:text-white transition-colors">Catalog</Link>
              <Link href="#capabilities" className="hover:text-white transition-colors">Capabilities</Link>
              <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/aboutus" className="hover:text-white transition-colors">About</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 LANRTTDUN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
