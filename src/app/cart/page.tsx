'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartProvider'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart()

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6">
            <ShoppingBag size={48} className="text-beige-300 mx-auto" />
            <h1 className="font-serif text-3xl text-charcoal">
              Korpa je prazna
            </h1>
            <p className="text-warm-gray text-sm">
              Pogledaj našu kolekciju i pronađi nešto posebno.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={16} /> Idi na kolekciju
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-10">
            Moja korpa
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 border border-beige-200"
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative w-24 h-28 flex-shrink-0 overflow-hidden bg-beige-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-serif text-charcoal hover:opacity-70 transition-opacity"
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-wrap gap-3 mt-1">
                        {item.size && (
                          <span className="text-xs text-warm-gray">
                            Vel: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-xs text-warm-gray">
                            Boja: {item.color}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-beige-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-beige-100 text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-beige-100 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-sans text-charcoal text-sm font-medium">
                          {(item.price * item.quantity).toFixed(2)} KM
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-beige-400 hover:text-charcoal transition-colors"
                          aria-label="Ukloni"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-warm-gray hover:text-charcoal transition-colors mt-2"
              >
                Isprazni korpu
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-beige-200 p-6 sticky top-28">
                <h2 className="font-serif text-xl text-charcoal mb-6">
                  Pregled narudžbe
                </h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-beige-300">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-warm-gray truncate pr-4">
                        {item.name} ×{item.quantity}
                      </span>
                      <span className="text-charcoal flex-shrink-0">
                        {(item.price * item.quantity).toFixed(2)} KM
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mb-8">
                  <span className="font-serif text-charcoal">Ukupno</span>
                  <span className="font-sans font-medium text-charcoal text-lg">
                    {cartTotal.toFixed(2)} KM
                  </span>
                </div>

                <div className="bg-beige-100 p-4 mb-6 text-xs text-warm-gray space-y-1">
                  <p>✓ Besplatna dostava za narudžbe iznad 100 KM</p>
                  <p>✓ Rok izrade: 10–15 radnih dana</p>
                  <p>✓ Narudžba se potvrđuje via WhatsApp</p>
                </div>

                <Link
                  href="/checkout"
                  className="btn-primary flex items-center justify-center gap-2 w-full"
                >
                  Nastavi na narudžbu <ArrowRight size={16} />
                </Link>

                <Link
                  href="/shop"
                  className="block text-center text-xs text-warm-gray mt-4 hover:text-charcoal transition-colors"
                >
                  ← Nastavi kupovinu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
