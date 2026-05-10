'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Trash2, RefreshCw } from 'lucide-react'

interface OrderItem {
  name: string
  size: string
  color: string
  quantity: number
  price: number
}

interface Order {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  measurements: string
  notes: string
  items: OrderItem[]
  total: number
  status: string
  createdAt: string
}

const STATUS_OPTIONS = [
  { value: 'nova', label: 'Nova', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'u_obradi', label: 'U obradi', color: 'bg-blue-100 text-blue-800' },
  { value: 'zavrsena', label: 'Završena', color: 'bg-green-100 text-green-800' },
  { value: 'otkazana', label: 'Otkazana', color: 'bg-red-100 text-red-800' },
]

function statusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.color ?? 'bg-gray-100 text-gray-700'
}

function statusLabel(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const router = useRouter()

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    router.refresh()
    setUpdating(null)
  }

  const deleteOrder = async (id: string, name: string) => {
    if (!confirm(`Obriši narudžbu od ${name}?`)) return
    await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-beige-200 rounded p-16 text-center">
        <p className="font-serif text-xl text-warm-gray mb-2">Nema narudžbi</p>
        <p className="text-sm text-beige-400">
          Narudžbe će se prikazivati ovdje čim kupci pošalju narudžbu sa stranice.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-beige-200 rounded overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-beige-50 border-b border-beige-200 text-xs tracking-widest uppercase text-warm-gray hidden md:grid">
        <span>Kupac</span>
        <span>Kontakt</span>
        <span>Ukupno</span>
        <span>Status</span>
        <span>Datum</span>
        <span />
      </div>

      <div className="divide-y divide-beige-100">
        {orders.map((order) => (
          <div key={order.id}>
            {/* Row */}
            <div className="px-6 py-4">
              <div className="flex flex-col md:grid md:grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-2 md:gap-4 md:items-center">
                {/* Name */}
                <div>
                  <p className="font-serif text-charcoal">
                    {order.firstName} {order.lastName}
                  </p>
                  <p className="text-xs text-warm-gray">{order.city}</p>
                </div>

                {/* Contact */}
                <div>
                  <a
                    href={`https://wa.me/${order.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-charcoal hover:underline"
                  >
                    {order.phone}
                  </a>
                  {order.email && (
                    <p className="text-xs text-warm-gray">{order.email}</p>
                  )}
                </div>

                {/* Total */}
                <p className="font-medium text-charcoal text-sm md:text-base">
                  {order.total.toFixed(2)} KM
                </p>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    disabled={updating === order.id}
                    className={`text-xs px-2 py-1 rounded border-0 font-medium cursor-pointer ${statusStyle(order.status)}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {updating === order.id && (
                    <RefreshCw size={12} className="animate-spin text-warm-gray" />
                  )}
                </div>

                {/* Date */}
                <p className="text-xs text-warm-gray whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString('bs-BA', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setExpanded(expanded === order.id ? null : order.id)
                    }
                    className="text-warm-gray hover:text-charcoal transition-colors p-1"
                    title="Detalji narudžbe"
                  >
                    {expanded === order.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      deleteOrder(order.id, `${order.firstName} ${order.lastName}`)
                    }
                    className="text-red-300 hover:text-red-600 transition-colors p-1"
                    title="Obriši narudžbu"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded details */}
            {expanded === order.id && (
              <div className="px-6 pb-6 bg-beige-50 border-t border-beige-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
                  {/* Artikli */}
                  <div className="lg:col-span-1">
                    <h4 className="text-xs tracking-widest uppercase text-warm-gray mb-3">
                      Naručeni artikli
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm bg-white px-3 py-2 rounded"
                        >
                          <div>
                            <p className="font-serif text-charcoal">{item.name}</p>
                            <p className="text-xs text-warm-gray">
                              {item.size && `${item.size}`}
                              {item.color && ` · ${item.color}`}
                              {` · ×${item.quantity}`}
                            </p>
                          </div>
                          <p className="text-charcoal font-medium ml-4">
                            {(item.price * item.quantity).toFixed(2)} KM
                          </p>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-medium px-3 pt-1 border-t border-beige-200">
                        <span>Ukupno</span>
                        <span>{order.total.toFixed(2)} KM</span>
                      </div>
                    </div>
                  </div>

                  {/* Adresa */}
                  <div>
                    <h4 className="text-xs tracking-widest uppercase text-warm-gray mb-3">
                      Adresa dostave
                    </h4>
                    <div className="text-sm text-charcoal space-y-1 bg-white px-3 py-3 rounded">
                      <p>{order.address}</p>
                      <p>
                        {order.city} {order.postalCode}
                      </p>
                      <p>{order.country}</p>
                    </div>
                  </div>

                  {/* Napomene */}
                  <div>
                    <h4 className="text-xs tracking-widest uppercase text-warm-gray mb-3">
                      Mjere i napomene
                    </h4>
                    <div className="bg-white px-3 py-3 rounded text-sm text-charcoal space-y-2">
                      {order.measurements ? (
                        <div>
                          <p className="text-xs text-warm-gray mb-1">Mjere:</p>
                          <p>{order.measurements}</p>
                        </div>
                      ) : (
                        <p className="text-beige-400 italic text-xs">
                          Bez mjera
                        </p>
                      )}
                      {order.notes && (
                        <div>
                          <p className="text-xs text-warm-gray mb-1">
                            Napomena:
                          </p>
                          <p>{order.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* WhatsApp link */}
                    <a
                      href={`https://wa.me/${order.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-2 text-xs text-charcoal border border-charcoal px-3 py-2 rounded hover:bg-charcoal hover:text-white transition-colors w-fit"
                    >
                      Otvori WhatsApp razgovor →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
