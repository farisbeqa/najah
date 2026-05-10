import ProductForm from '@/components/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Novi artikal | Admin' }

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-8">Novi artikal</h1>
      <ProductForm mode="create" />
    </div>
  )
}
