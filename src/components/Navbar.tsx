'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from './CartProvider'

const navLinks = [
  { href: '/', label: 'Početna' },
  { href: '/shop', label: 'Kolekcija' },
  { href: '/about', label: 'O nama' },
  { href: '/contact', label: 'Kontakt' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartCount } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-beige-100/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start leading-none">
              <span className="text-xl font-bold tracking-[0.35em] text-charcoal font-serif">
                NAJAH
              </span>
              <span className="text-[9px] tracking-[0.45em] text-warm-gray uppercase font-sans">
                activewear
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-widest uppercase font-sans transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-charcoal border-b border-charcoal pb-0.5'
                      : 'text-warm-gray hover:text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative group">
                <ShoppingBag
                  size={22}
                  className="text-charcoal group-hover:opacity-60 transition-opacity"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-charcoal hover:opacity-60 transition-opacity"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-beige-100 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-serif tracking-wider transition-opacity duration-200 ${
                pathname === link.href
                  ? 'text-charcoal'
                  : 'text-warm-gray hover:text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm tracking-widest uppercase text-charcoal hover:opacity-60 mt-4"
          >
            <ShoppingBag size={18} />
            Korpa {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </div>
    </>
  )
}
