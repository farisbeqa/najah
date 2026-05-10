import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  )
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Neovlašteno' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nema fajla' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Nepodržani tip fajla' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fajl je prevelik (max 10MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabaseAdmin.storage
      .from('products')
      .upload(filename, buffer, { contentType: file.type, upsert: false })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: 'Greška pri uploadu' }, { status: 500 })
    }

    const { data } = supabaseAdmin.storage.from('products').getPublicUrl(filename)

    return NextResponse.json({ url: data.publicUrl })
  } catch {
    return NextResponse.json({ error: 'Greška pri uploadu' }, { status: 500 })
  }
}
