export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  sizes: string[]
  colors: string[]
  images: string[]
  inStock: boolean
  featured: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
  slug: string
}

export const CATEGORIES = [
  { value: 'setovi', label: 'Setovi' },
  { value: 'majice', label: 'Majice i topovi' },
  { value: 'pantalone', label: 'Pantalone' },
  { value: 'duksevi', label: 'Duksevi' },
  { value: 'torbe', label: 'Torbe i dodaci' },
  { value: 'ostalo', label: 'Ostalo' },
] as const

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Po mjerama']

export const COLORS = [
  'Bež / Kremasta',
  'Crna',
  'Roza',
  'Siva',
  'Navy',
  'Smeđa',
  'Bijela',
  'Ostalo',
]
