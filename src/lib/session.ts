import { SessionOptions } from 'iron-session'

export interface SessionData {
  isAdmin: boolean
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ??
    'najah-activewear-fallback-secret-key-must-be-32-chars',
  cookieName: 'najah-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 8,
  },
}
