import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    const validUsername = process.env.ADMIN_USERNAME ?? 'admin'
    const validPassword = process.env.ADMIN_PASSWORD ?? 'najah2024'

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { error: 'Pogrešno korisničko ime ili lozinka' },
        { status: 401 }
      )
    }

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    )
    session.isAdmin = true
    await session.save()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Greška servera' }, { status: 500 })
  }
}
