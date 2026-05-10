import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')

  try {
    if (slug) {
      const product = await prisma.product.findUnique({ where: { slug } })
      if (!product)
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json({
        ...product,
        sizes: JSON.parse(product.sizes),
        colors: JSON.parse(product.colors),
        images: JSON.parse(product.images),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      })
    }

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (featured === 'true') where.featured = true

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }],
    })

    return NextResponse.json(
      products.map((p) => ({
        ...p,
        sizes: JSON.parse(p.sizes),
        colors: JSON.parse(p.colors),
        images: JSON.parse(p.images),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }))
    )
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  )
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        category: body.category,
        sizes: JSON.stringify(body.sizes ?? []),
        colors: JSON.stringify(body.colors ?? []),
        images: JSON.stringify(body.images ?? []),
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
        sortOrder: body.sortOrder ?? 0,
      },
    })

    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/admin/products')

    return NextResponse.json(product, { status: 201 })
  } catch (err: unknown) {
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      err.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'Artikal s tim slug-om već postoji' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
