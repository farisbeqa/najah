'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { buildContactMessage, getWhatsAppUrl } from '@/lib/whatsapp'
import { MessageCircle, Instagram, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Upiši ime'
    if (!form.message.trim()) errs.message = 'Upiši poruku'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const encoded = buildContactMessage(form)
    window.open(getWhatsAppUrl(encoded), '_blank')
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <p className="section-subtitle mb-4">Javi nam se</p>
              <h1 className="section-title mb-6">Kontakt</h1>
              <p className="text-sm text-warm-gray leading-relaxed mb-10 max-w-md">
                Imaš pitanje o narudžbi, mjerama ili želiš prilagoditi komad?
                Slobodno nam se javi — odgovaramo u roku od 24 sata.
              </p>

              <div className="space-y-6 mb-10">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '387XXXXXXXXX'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-beige-200 rounded-full flex items-center justify-center group-hover:bg-charcoal transition-colors duration-200">
                    <MessageCircle
                      size={20}
                      className="text-charcoal group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">WhatsApp</p>
                    <p className="text-xs text-warm-gray">Najbži odgovor</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/najah.active?igsh=MzJoOTdxb3lpZHU5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-beige-200 rounded-full flex items-center justify-center group-hover:bg-charcoal transition-colors duration-200">
                    <Instagram
                      size={20}
                      className="text-charcoal group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Instagram</p>
                    <p className="text-xs text-warm-gray">@najah.activewear</p>
                  </div>
                </a>
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden hidden lg:block">
                <Image
                  src="/images/img-29.jpg"
                  alt="NAJAH Activewear"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Ime *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                    placeholder="Tvoje ime"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="tvoj@email.com"
                  />
                </div>

                <div>
                  <label className="label">Predmet</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field bg-white"
                  >
                    <option value="">Odaberi predmet...</option>
                    <option value="Informacije o narudžbi">
                      Informacije o narudžbi
                    </option>
                    <option value="Mjere i prilagodbe">
                      Mjere i prilagodbe
                    </option>
                    <option value="Dostava">Dostava</option>
                    <option value="Suradnja">Suradnja</option>
                    <option value="Ostalo">Ostalo</option>
                  </select>
                </div>

                <div>
                  <label className="label">Poruka *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                    placeholder="Napiši svoju poruku ovdje..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="bg-beige-200 p-4 text-xs text-warm-gray">
                  Klikom na dugme, poruka se šalje direktno na naš WhatsApp.
                </div>

                <button
                  type="submit"
                  className="btn-primary flex items-center gap-3 w-full justify-center py-4"
                >
                  <Send size={16} />
                  Pošalji poruku via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
