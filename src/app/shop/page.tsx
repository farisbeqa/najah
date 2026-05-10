import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Product, CATEGORIES } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kolekcija',
  description: 'Pogledajte kompletnu NAJAH Activewear kolekciju. Skromna, udobna i elegantna sportska odjeća za žene.',
}

interface Props {
  searchParams: { category?: string }
}

async function getProducts(category?: string): Promise<Product[]> {
  const where = category ? { category, inStock: true } : { inStock: true }
  const products = await prisma.product.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }],
  })
  return products.map((p) => ({
    ...p,
    sizes: JSON.parse(p.sizes),
    colors: JSON.parse(p.colors),
    images: JSON.parse(p.images),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))
}

export default async function ShopPage({ searchParams }: Props) {
  const activeCategory = searchParams.category
  const products = await getProducts(activeCategory)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center mb-10">
            <p className="section-subtitle mb-3">Handmade · Made in Bosnia</p>
            <h1 className="section-title">Kolekcija</h1>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <a
              href="/shop"
              className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors duration-200 ${
                !activeCategory
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'border-beige-300 text-warm-gray hover:border-charcoal hover:text-charcoal'
              }`}
            >
              Sve
            </a>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.value}
                href={`/shop?category=${cat.value}`}
                className={`text-xs tracking-widest uppercase px-5 py-2 border transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'border-beige-300 text-warm-gray hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-gray font-serif text-xl mb-2">
                Nema artikala u ovoj kategoriji
              </p>
              <a href="/shop" className="text-sm text-charcoal underline">
                Vidi sve artikle
              </a>
            </div>
          ) : (
            <>
              <p className="text-xs text-warm-gray mb-6 tracking-wider">
                {products.length} artikal{products.length !== 1 ? 'a' : ''}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-beige-200 p-8 sm:p-12 text-center">
            <p className="font-serif text-2xl text-charcoal mb-3">
              Sve po Vašim mjerama
            </p>
            <p className="text-sm text-warm-gray max-w-lg mx-auto leading-relaxed">
              Svaki artikal se izrađuje po narudžbi. Napiši mjere u napomeni
              pri narudžbi ili nam se javi via WhatsApp za detaljniju
              konsultaciju.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
