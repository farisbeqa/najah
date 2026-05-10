'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, Plus, LogOut, ShoppingBag } from 'lucide-react'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Narudžbe', icon: ShoppingBag },
  { href: '/admin/products', label: 'Artikli', icon: Package },
  { href: '/admin/products/new', label: 'Novi artikal', icon: Plus },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-beige-100 flex flex-col min-h-screen">
        <div className="p-6 border-b border-beige-800">
          <p className="text-lg font-serif font-bold tracking-[0.3em]">NAJAH</p>
          <p className="text-[9px] tracking-[0.4em] text-beige-500 uppercase">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors duration-150 ${
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-beige-100/10 text-white'
                  : 'text-beige-400 hover:text-white hover:bg-beige-100/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-beige-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded text-sm text-beige-400 hover:text-white hover:bg-beige-100/5 w-full transition-colors duration-150"
          >
            <LogOut size={16} />
            Odjavi se
          </button>
          <div className="mt-3 px-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-beige-600 hover:text-beige-400 transition-colors"
            >
              ← Pogledaj stranicu
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
