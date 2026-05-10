'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartProvider'
import { Product, CATEGORIES } from '@/types'
import { ShoppingBag, Check, ArrowLeft, MessageCircle } from 'lucide-react'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`/api/products?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setLoading(false)
          return
        }
        setProduct(data)
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0])
        if (data.colors?.length > 0) setSelectedColor(data.colors[0])
        setLoading(false)
      })
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? '',
      size: selectedSize,
      color: selectedColor,
      quantity,
      slug: product.slug,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const categoryLabel =
    CATEGORIES.find((c) => c.value === product?.category)?.label ?? product?.category

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-28 min-h-screen flex items-center justify-center">
          <div className="space-y-4 w-full max-w-5xl px-4">
            <div className="skeleton h-96 w-full" />
          </div>
        </div>
      </>
    )
  }

  if (!product) return notFound()

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-xs text-warm-gray">
            <Link href="/shop" className="flex items-center gap-1 hover:text-charcoal">
              <ArrowLeft size={12} /> Kolekcija
            </Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden bg-beige-200">
                <Image
                  src={product.images[selectedImage] ?? '/images/img-09.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-colors ${
                        selectedImage === i
                          ? 'border-charcoal'
                          : 'border-transparent hover:border-beige-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs tracking-widest uppercase text-warm-gray mb-2">
                {categoryLabel}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-sans text-charcoal mb-6">
                {product.price.toFixed(2)} KM
              </p>

              <div className="w-12 h-px bg-beige-300 mb-6" />

              <p className="text-sm text-warm-gray leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size selection */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="label">
                    Veličina:{' '}
                    <span className="text-charcoal normal-case tracking-normal">
                      {selectedSize}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs border transition-colors duration-150 ${
                          selectedSize === size
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'border-beige-300 text-warm-gray hover:border-charcoal hover:text-charcoal'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="label">
                    Boja:{' '}
                    <span className="text-charcoal normal-case tracking-normal">
                      {selectedColor}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs border transition-colors duration-150 ${
                          selectedColor === color
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'border-beige-300 text-warm-gray hover:border-charcoal hover:text-charcoal'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="label">Količina</label>
                <div className="flex items-center border border-beige-300 w-32">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-beige-200 transition-colors"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-beige-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`btn-primary flex items-center justify-center gap-3 w-full mb-3 ${
                  !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                } ${added ? 'bg-green-800' : ''}`}
              >
                {added ? (
                  <>
                    <Check size={18} /> Dodano u korpu
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    {product.inStock ? 'Dodaj u korpu' : 'Rasprodano'}
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '387XXXXXXXXX'}?text=${encodeURIComponent(`Zdravo! Zanima me artikal: ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-3 w-full"
              >
                <MessageCircle size={18} /> Pitaj via WhatsApp
              </a>

              {/* Product details */}
              <div className="mt-10 pt-8 border-t border-beige-200 space-y-3">
                <p className="text-xs text-warm-gray flex gap-2">
                  <span className="font-medium text-charcoal">Rok izrade:</span>
                  10–15 radnih dana
                </p>
                <p className="text-xs text-warm-gray flex gap-2">
                  <span className="font-medium text-charcoal">Veličine:</span>
                  Sve po Vašim mjerama — napiši u napomeni pri narudžbi
                </p>
                <p className="text-xs text-warm-gray flex gap-2">
                  <span className="font-medium text-charcoal">Porijeklo:</span>
                  Handmade, Made in Bosnia
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
