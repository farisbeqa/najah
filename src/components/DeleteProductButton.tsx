'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Jesi li sigurna da želiš obrisati "${name}"?`)) return

    setLoading(true)
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Greška pri brisanju')
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1 disabled:opacity-50"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
    </button>
  )
}
