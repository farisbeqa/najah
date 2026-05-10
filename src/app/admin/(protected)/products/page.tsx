import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Star } from 'lucide-react'
import { CATEGORIES } from '@/types'
import DeleteProductButton from '@/components/DeleteProductButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Artikli | Admin' }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Artikli</h1>
          <p className="text-sm text-warm-gray mt-1">
            {products.length} artikal{products.length !== 1 ? 'a' : ''} ukupno
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Novi artikal
        </Link>
      </div>

      <div className="bg-white border border-beige-200 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-beige-50 border-b border-beige-200">
              <th className="text-left px-6 py-3 text-xs tracking-widest uppercase text-warm-gray font-sans">
                Artikal
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-warm-gray font-sans hidden sm:table-cell">
                Kategorija
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-warm-gray font-sans">
                Cijena
              </th>
              <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-warm-gray font-sans hidden md:table-cell">
                Status
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-beige-100">
            {products.map((product) => {
              const images = JSON.parse(product.images) as string[]
              const categoryLabel =
                CATEGORIES.find((c) => c.value === product.category)?.label ??
                product.category

              return (
                <tr key={product.id} className="hover:bg-beige-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-beige-100 rounded">
                        {images[0] && (
                          <Image
                            src={images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-serif text-charcoal text-sm">
                            {product.name}
                          </p>
                          {product.featured && (
                            <Star
                              size={12}
                              className="text-yellow-500 fill-yellow-500"
                            />
                          )}
                        </div>
                        <p className="text-xs text-beige-400 truncate max-w-[180px]">
                          /shop/{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs text-warm-gray">{categoryLabel}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-charcoal font-medium">
                      {product.price.toFixed(2)} KM
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        product.inStock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.inStock ? 'Dostupno' : 'Rasprodano'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/shop/${product.slug}`}
                        target="_blank"
                        className="text-xs text-beige-400 hover:text-charcoal transition-colors px-2 py-1"
                      >
                        Pogledaj
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex items-center gap-1 text-xs text-warm-gray hover:text-charcoal transition-colors px-2 py-1 border border-beige-200 rounded"
                      >
                        <Pencil size={12} /> Uredi
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              )
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-warm-gray">
                  <p className="font-serif text-lg mb-2">Nema artikala</p>
                  <Link href="/admin/products/new" className="text-sm underline">
                    Dodaj prvi artikal
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

