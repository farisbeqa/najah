import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { redirect } from 'next/navigation'
import { sessionOptions, SessionData } from '@/lib/session'
import AdminLayout from '@/components/AdminLayout'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  )

  if (!session.isAdmin) {
    redirect('/admin')
  }

  return <AdminLayout>{children}</AdminLayout>
}
