import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'
import OrdersTable from '@/components/OrdersTable'

export const metadata: Metadata = { title: 'Narudžbe | Admin' }
export const revalidate = 0

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const parsed = orders.map((o) => ({
    ...o,
    items: JSON.parse(o.items) as Array<{
      name: string
      size: string
      color: string
      quantity: number
      price: number
    }>,
    createdAt: o.createdAt.toISOString(),
  }))

  const totalRevenue = parsed.reduce((s, o) => s + o.total, 0)
  const byStatus = {
    nova: parsed.filter((o) => o.status === 'nova').length,
    u_obradi: parsed.filter((o) => o.status === 'u_obradi').length,
    zavrsena: parsed.filter((o) => o.status === 'zavrsena').length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Narudžbe</h1>
        <p className="text-sm text-warm-gray mt-1">
          {parsed.length} narudžb{parsed.length === 1 ? 'a' : 'i'} ukupno
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-beige-200 p-5 rounded">
          <p className="font-serif text-3xl text-charcoal">{parsed.length}</p>
          <p className="text-xs text-warm-gray mt-1">Ukupno narudžbi</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 p-5 rounded">
          <p className="font-serif text-3xl text-yellow-700">{byStatus.nova}</p>
          <p className="text-xs text-yellow-600 mt-1">Nove</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-5 rounded">
          <p className="font-serif text-3xl text-blue-700">{byStatus.u_obradi}</p>
          <p className="text-xs text-blue-600 mt-1">U obradi</p>
        </div>
        <div className="bg-green-50 border border-green-100 p-5 rounded">
          <p className="font-serif text-3xl text-charcoal">
            {totalRevenue.toFixed(0)} KM
          </p>
          <p className="text-xs text-warm-gray mt-1">Ukupna vrijednost</p>
        </div>
      </div>

      <OrdersTable orders={parsed} />
    </div>
  )
}
