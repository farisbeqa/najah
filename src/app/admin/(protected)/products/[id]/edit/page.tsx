import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductForm from '@/components/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Uredi artikal | Admin' }

interface Props {
  params: { id: string }
}

export default async function EditProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  })

  if (!product) notFound()

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-2">Uredi artikal</h1>
      <p className="text-sm text-warm-gray mb-8">{product.name}</p>
      <ProductForm
        mode="edit"
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          sizes: JSON.parse(product.sizes),
          colors: JSON.parse(product.colors),
          images: JSON.parse(product.images),
          inStock: product.inStock,
          featured: product.featured,
          sortOrder: product.sortOrder.toString(),
        }}
      />
    </div>
  )
}
