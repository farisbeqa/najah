'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/types'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const mainImage = product.images[0] ?? '/images/img-09.jpg'
  const secondImage = product.images[1] ?? mainImage

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-beige-200 aspect-[3/4]">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${
            hovered && secondImage !== mainImage
              ? 'opacity-0'
              : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {secondImage !== mainImage && (
          <Image
            src={secondImage}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 absolute inset-0 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-beige-100/70 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-warm-gray bg-beige-100/90 px-4 py-2">
              Rasprodano
            </span>
          </div>
        )}

        <div
          className={`absolute bottom-0 left-0 right-0 bg-charcoal text-white text-center py-3 text-xs tracking-widest uppercase transition-transform duration-300 ${
            hovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag size={14} />
            Pogledaj
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-[10px] tracking-widest uppercase text-warm-gray font-sans">
          {product.category}
        </p>
        <h3 className="font-serif text-charcoal text-base leading-tight">
          {product.name}
        </h3>
        <p className="text-sm font-sans text-charcoal font-medium">
          {product.price.toFixed(2)} KM
        </p>
      </div>
    </Link>
  )
}
