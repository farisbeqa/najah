'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartProvider'
import { buildOrderMessage, getWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle, ArrowLeft } from 'lucide-react'

interface FormData {
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
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Bosna i Hercegovina',
  measurements: '',
  notes: '',
}

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Obavezno polje'
    if (!form.lastName.trim()) newErrors.lastName = 'Obavezno polje'
    if (!form.phone.trim()) newErrors.phone = 'Obavezno polje'
    if (!form.city.trim()) newErrors.city = 'Obavezno polje'
    if (!form.address.trim()) newErrors.address = 'Obavezno polje'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Neispravna email adresa'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const orderItems = items.map((item) => ({
      name: item.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
    }))

    // Save order to DB (fire-and-forget, don't block WhatsApp redirect)
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        items: orderItems,
        total: cartTotal,
      }),
    }).catch(() => {})

    const message = buildOrderMessage({
      ...form,
      items: orderItems,
    })

    window.open(getWhatsAppUrl(message), '_blank')
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6">
            <p className="font-serif text-2xl text-charcoal">Korpa je prazna</p>
            <Link href="/shop" className="btn-primary inline-block">
              Pogledaj kolekciju
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
          <Link
            href="/cart"
            className="flex items-center gap-2 text-xs text-warm-gray hover:text-charcoal mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Nazad na korpu
          </Link>

          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-10">
            Narudžba
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 space-y-6"
            >
              {/* Personal info */}
              <fieldset>
                <legend className="section-subtitle mb-5">Vaši podaci</legend>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Ime *</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className={`input-field ${errors.firstName ? 'border-red-400' : ''}`}
                      placeholder="Amina"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="label">Prezime *</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className={`input-field ${errors.lastName ? 'border-red-400' : ''}`}
                      placeholder="Begović"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="label">Telefon / WhatsApp *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                      placeholder="+387 61 000 000"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                      placeholder="amina@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Address */}
              <fieldset>
                <legend className="section-subtitle mb-5">Adresa dostave</legend>
                <div className="space-y-4">
                  <div>
                    <label className="label">Adresa *</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className={`input-field ${errors.address ? 'border-red-400' : ''}`}
                      placeholder="Ulica i broj"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Grad *</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={`input-field ${errors.city ? 'border-red-400' : ''}`}
                        placeholder="Sarajevo"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Poštanski broj</label>
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="71000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Država</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Measurements & notes */}
              <fieldset>
                <legend className="section-subtitle mb-5">Mjere i napomene</legend>
                <div className="space-y-4">
                  <div>
                    <label className="label">Mjere (po želji)</label>
                    <textarea
                      name="measurements"
                      value={form.measurements}
                      onChange={handleChange}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Npr: Visina 168cm, grudi 90cm, struk 72cm, bokovi 95cm..."
                    />
                    <p className="text-[11px] text-beige-500 mt-1">
                      Možeš i naknadno dostaviti mjere via WhatsApp.
                    </p>
                  </div>
                  <div>
                    <label className="label">Napomena (po želji)</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Posebne želje, pitanja, prilagodbe..."
                    />
                  </div>
                </div>
              </fieldset>

              {/* Notice */}
              <div className="bg-beige-200 p-5 text-sm text-warm-gray">
                <p className="font-medium text-charcoal mb-2">
                  Kako funkcioniše narudžba?
                </p>
                <p className="text-xs leading-relaxed">
                  Klikom na dugme ispod, otvorit će se WhatsApp s popunjenom
                  porukom vaše narudžbe. Potvrdite slanje i mi ćemo vas
                  kontaktirati radi finalizacije.
                </p>
              </div>

              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-3 w-full py-4 text-base"
              >
                <MessageCircle size={20} />
                Pošalji narudžbu na WhatsApp
              </button>
            </form>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-beige-200 p-6 sticky top-28">
                <h2 className="font-serif text-xl text-charcoal mb-6">
                  Vaša narudžba
                </h2>
                <div className="space-y-4 mb-6 pb-6 border-b border-beige-300">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-beige-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-serif text-charcoal">
                          {item.name}
                        </p>
                        <p className="text-xs text-warm-gray">
                          {item.size && `${item.size} · `}
                          {item.color && `${item.color} · `}×{item.quantity}
                        </p>
                        <p className="text-sm text-charcoal font-medium">
                          {(item.price * item.quantity).toFixed(2)} KM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-charcoal">Ukupno</span>
                  <span className="font-sans font-medium text-charcoal text-lg">
                    {cartTotal.toFixed(2)} KM
                  </span>
                </div>
                <p className="text-xs text-warm-gray mt-4 leading-relaxed">
                  Rok izrade: 10–15 radnih dana. Dostava se dogovara
                  individualno.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
