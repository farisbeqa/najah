import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'

async function requireAdmin() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  return session.isAdmin
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  const { status } = await req.json()
  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status },
  })

  return NextResponse.json(order)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  await prisma.order.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
