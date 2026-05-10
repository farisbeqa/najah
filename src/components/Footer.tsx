import Link from 'next/link'
import { Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '387XXXXXXXXX'

  return (
    <footer className="bg-charcoal text-beige-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-serif font-bold tracking-[0.35em] text-beige-100">
                NAJAH
              </p>
              <p className="text-[9px] tracking-[0.45em] text-beige-400 uppercase">
                activewear
              </p>
            </div>
            <p className="text-sm text-beige-300 leading-relaxed max-w-xs">
              Handmade aktivna odjeća za pokrivene žene. Svaki komad izrađen s
              posebnom pažnjom, po Vašim mjerama. Made in Bosnia.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.instagram.com/najah.active?igsh=MzJoOTdxb3lpZHU5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige-400 hover:text-beige-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige-400 hover:text-beige-100 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-widest uppercase text-beige-400">
              Navigacija
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Početna' },
                { href: '/shop', label: 'Kolekcija' },
                { href: '/about', label: 'O nama' },
                { href: '/contact', label: 'Kontakt' },
                { href: '/cart', label: 'Korpa' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-beige-300 hover:text-beige-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-widest uppercase text-beige-400">
              Kontakt
            </h4>
            <div className="flex flex-col gap-3 text-sm text-beige-300">
              <p>Bosnia i Hercegovina</p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-beige-100 transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp narudžbe
              </a>
              <div className="mt-4 p-4 border border-beige-700 rounded">
                <p className="text-xs text-beige-400 leading-relaxed">
                  Svaki komad se izrađuje po narudžbi.
                  <br />
                  Rok izrade: <strong className="text-beige-200">10–15 radnih dana</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-beige-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-beige-600">
            © {new Date().getFullYear()} NAJAH Activewear. Sva prava pridržana.
          </p>
          <p className="text-xs text-beige-600">Handmade with ♥ in Bosnia</p>
        </div>
      </div>
    </footer>
  )
}
