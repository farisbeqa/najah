import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  )
  return session.isAdmin
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        category: body.category,
        sizes: JSON.stringify(body.sizes ?? []),
        colors: JSON.stringify(body.colors ?? []),
        images: JSON.stringify(body.images ?? []),
        inStock: body.inStock,
        featured: body.featured,
        sortOrder: body.sortOrder ?? 0,
      },
    })

    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath(`/shop/${product.slug}`)
    revalidatePath('/admin/products')

    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  try {
    await prisma.product.delete({ where: { id: params.id } })
    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/admin/products')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
