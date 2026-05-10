import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Package, CheckCircle, XCircle, Plus, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard | Admin' }

export default async function DashboardPage() {
  const [totalProducts, inStock, outOfStock, featured] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { inStock: true } }),
    prisma.product.count({ where: { inStock: false } }),
    prisma.product.count({ where: { featured: true } }),
  ])

  const recentProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const stats = [
    {
      label: 'Ukupno artikala',
      value: totalProducts,
      icon: Package,
      color: 'bg-beige-200',
    },
    {
      label: 'Dostupno',
      value: inStock,
      icon: CheckCircle,
      color: 'bg-green-50',
    },
    {
      label: 'Rasprodano',
      value: outOfStock,
      icon: XCircle,
      color: 'bg-red-50',
    },
    {
      label: 'Istaknuto',
      value: featured,
      icon: Star,
      color: 'bg-yellow-50',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Dashboard</h1>
          <p className="text-sm text-warm-gray mt-1">
            Dobrodošla u NAJAH Admin Panel
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Novi artikal
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`${color} p-6 rounded`}>
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className="text-charcoal opacity-60" />
            </div>
            <p className="font-serif text-3xl text-charcoal">{value}</p>
            <p className="text-xs text-warm-gray mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent products */}
      <div className="bg-white border border-beige-200 rounded">
        <div className="flex items-center justify-between px-6 py-4 border-b border-beige-200">
          <h2 className="font-serif text-lg text-charcoal">
            Nedavno dodani artikli
          </h2>
          <Link
            href="/admin/products"
            className="text-xs text-warm-gray hover:text-charcoal transition-colors"
          >
            Vidi sve →
          </Link>
        </div>
        <div className="divide-y divide-beige-100">
          {recentProducts.map((product) => {
            const images = JSON.parse(product.images) as string[]
            return (
              <div
                key={product.id}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div
                  className="w-10 h-10 bg-beige-100 rounded flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: images[0] ? `url(${images[0]})` : undefined,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-charcoal truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-warm-gray">
                    {product.category} · {product.price.toFixed(2)} KM
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.inStock
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.inStock ? 'Dostupno' : 'Rasprodano'}
                  </span>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-xs text-warm-gray hover:text-charcoal underline"
                  >
                    Uredi
                  </Link>
                </div>
              </div>
            )
          })}
          {recentProducts.length === 0 && (
            <p className="px-6 py-8 text-sm text-warm-gray text-center">
              Nema artikala. <Link href="/admin/products/new" className="underline">Dodaj prvi</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
