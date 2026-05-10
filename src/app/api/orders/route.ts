import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const order = await prisma.order.create({
      data: {
        firstName: body.firstName ?? '',
        lastName: body.lastName ?? '',
        email: body.email ?? '',
        phone: body.phone ?? '',
        address: body.address ?? '',
        city: body.city ?? '',
        postalCode: body.postalCode ?? '',
        country: body.country ?? '',
        measurements: body.measurements ?? '',
        notes: body.notes ?? '',
        items: JSON.stringify(body.items ?? []),
        total: body.total ?? 0,
        status: 'nova',
      },
    })

    return NextResponse.json({ id: order.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Greška pri snimanju narudžbe' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(
    orders.map((o) => ({
      ...o,
      items: JSON.parse(o.items),
      createdAt: o.createdAt.toISOString(),
    }))
  )
}
