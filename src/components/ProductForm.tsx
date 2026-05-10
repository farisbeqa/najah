'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'
import { CATEGORIES, SIZES, COLORS } from '@/types'
import { Save, Loader2 } from 'lucide-react'

interface ProductFormData {
  name: string
  slug: string
  description: string
  price: string
  category: string
  sizes: string[]
  colors: string[]
  images: string[]
  inStock: boolean
  featured: boolean
  sortOrder: string
}

interface Props {
  initialData?: Partial<ProductFormData> & { id?: string }
  mode: 'create' | 'edit'
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/[šš]/g, 's')
    .replace(/[žž]/g, 'z')
    .replace(/[đ]/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .trim()
}

const defaultData: ProductFormData = {
  name: '',
  slug: '',
  description: '',
  price: '',
  category: 'majice',
  sizes: ['S', 'M', 'L'],
  colors: [],
  images: [],
  inStock: true,
  featured: false,
  sortOrder: '0',
}

export default function ProductForm({ initialData, mode }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    ...defaultData,
    ...initialData,
    sizes: initialData?.sizes ?? defaultData.sizes,
    colors: initialData?.colors ?? defaultData.colors,
    images: initialData?.images ?? defaultData.images,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({})
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setForm((prev) => ({
      ...prev,
      name,
      slug: mode === 'create' ? slugify(name) : prev.slug,
    }))
  }

  const toggleArrayItem = (
    field: 'sizes' | 'colors',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  const validate = () => {
    const errs: Partial<Record<keyof ProductFormData, string>> = {}
    if (!form.name.trim()) errs.name = 'Naziv je obavezan'
    if (!form.slug.trim()) errs.slug = 'Slug je obavezan'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = 'Unesite ispravnu cijenu'
    if (!form.description.trim()) errs.description = 'Opis je obavezan'
    if (form.images.length === 0) errs.images = 'Dodajte barem jednu sliku'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    const payload = {
      ...form,
      price: parseFloat(form.price),
      sortOrder: parseInt(form.sortOrder) || 0,
    }

    const url =
      mode === 'create'
        ? '/api/products'
        : `/api/products/${initialData?.id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      const data = await res.json()
      alert(data.error ?? 'Greška pri čuvanju')
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {/* Basic info */}
      <section>
        <h2 className="font-serif text-lg text-charcoal mb-5 pb-3 border-b border-beige-200">
          Osnovne informacije
        </h2>
        <div className="space-y-5">
          <div>
            <label className="label">Naziv *</label>
            <input
              value={form.name}
              onChange={handleNameChange}
              className={`input-field ${errors.name ? 'border-red-400' : ''}`}
              placeholder="npr. Active Sport Top"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="label">
              Slug (URL){' '}
              <span className="text-beige-400 normal-case font-normal">
                /shop/<strong>{form.slug || '...'}</strong>
              </span>
            </label>
            <input
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  slug: slugify(e.target.value),
                }))
              }
              className={`input-field ${errors.slug ? 'border-red-400' : ''}`}
              placeholder="active-sport-top"
            />
            {errors.slug && (
              <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Cijena (KM) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: e.target.value }))
                }
                className={`input-field ${errors.price ? 'border-red-400' : ''}`}
                placeholder="70.00"
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="label">Kategorija</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="input-field bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Opis *</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={5}
              className={`input-field resize-none ${
                errors.description ? 'border-red-400' : ''
              }`}
              placeholder="Detaljni opis artikla..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="font-serif text-lg text-charcoal mb-5 pb-3 border-b border-beige-200">
          Dostupne veličine
        </h2>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleArrayItem('sizes', size)}
              className={`px-4 py-2 text-xs border transition-colors ${
                form.sizes.includes(size)
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'border-beige-300 text-warm-gray hover:border-charcoal'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section>
        <h2 className="font-serif text-lg text-charcoal mb-5 pb-3 border-b border-beige-200">
          Dostupne boje
        </h2>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => toggleArrayItem('colors', color)}
              className={`px-4 py-2 text-xs border transition-colors ${
                form.colors.includes(color)
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'border-beige-300 text-warm-gray hover:border-charcoal'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </section>

      {/* Images */}
      <section>
        <h2 className="font-serif text-lg text-charcoal mb-5 pb-3 border-b border-beige-200">
          Slike
        </h2>
        <ImageUpload value={form.images} onChange={(imgs) => setForm((prev) => ({ ...prev, images: imgs }))} />
        {errors.images && (
          <p className="text-xs text-red-500 mt-2">{errors.images}</p>
        )}
      </section>

      {/* Settings */}
      <section>
        <h2 className="font-serif text-lg text-charcoal mb-5 pb-3 border-b border-beige-200">
          Postavke
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() =>
                setForm((prev) => ({ ...prev, inStock: !prev.inStock }))
              }
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                form.inStock ? 'bg-charcoal' : 'bg-beige-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.inStock ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="text-sm text-charcoal">Dostupno na stanju</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() =>
                setForm((prev) => ({ ...prev, featured: !prev.featured }))
              }
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                form.featured ? 'bg-charcoal' : 'bg-beige-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.featured ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="text-sm text-charcoal">Istaknuto na početnoj</span>
          </label>

          <div className="w-40">
            <label className="label">Redoslijed prikaza</label>
            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, sortOrder: e.target.value }))
              }
              className="input-field"
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4 pt-4 pb-8">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Čuvanje...
            </>
          ) : (
            <>
              <Save size={16} />
              {mode === 'create' ? 'Dodaj artikal' : 'Sačuvaj izmjene'}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-ghost text-warm-gray"
        >
          Odustani
        </button>
      </div>
    </form>
  )
}
