import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import bcrypt from 'bcryptjs'

const app = new Hono<{ Bindings: Env }>().basePath('/api')

// Root endpoint for API check
app.get('/', (c) => {
  return c.json({ name: 'Cloudflare' })
})

// Login Endpoint
app.post('/auth/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, role } = body

    // 1. Validate required fields
    if (!email || !password || !role) {
      return c.json({ message: 'Email, password, dan peran wajib diisi' }, 400)
    }

    // 2. Validate role
    const validRoles = ['reporter', 'admin', 'technician', 'manager']
    if (!validRoles.includes(role)) {
      return c.json({ message: 'Peran tidak valid' }, 400)
    }

    // 3. Find user in database
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first<{
      id: number
      name: string
      email: string
      password_hash: string
      role: string
      created_at: string
    }>()

    if (!user) {
      return c.json({ message: 'Email atau password salah' }, 401)
    }

    // 4. Verify password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash)
    if (!isPasswordCorrect) {
      return c.json({ message: 'Email atau password salah' }, 401)
    }

    // 5. Verify role (Double validation)
    if (user.role !== role) {
      return c.json({ message: 'Kredensial valid, tetapi peran tidak sesuai dengan akun Anda' }, 401)
    }

    // 6. Generate Session Token
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    const createdAt = new Date().toISOString()

    // 7. Store session in D1
    await c.env.DB.prepare(
      'INSERT INTO sessions (user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?)'
    ).bind(user.id, token, expiresAt, createdAt).run()

    // 8. Set HttpOnly session cookie
    setCookie(c, 'session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    })

    // 9. Return user details
    return c.json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ message: 'Terjadi kesalahan pada server' }, 500)
  }
})

// Logout Endpoint
app.post('/auth/logout', async (c) => {
  try {
    const token = getCookie(c, 'session')

    if (!token) {
      return c.json({ message: 'Tidak ada sesi aktif' }, 401)
    }

    // 1. Delete session from D1
    await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()

    // 2. Clear cookie
    deleteCookie(c, 'session', {
      path: '/',
      secure: true,
      sameSite: 'Strict'
    })

    return c.json({ message: 'Logout berhasil' })
  } catch (error) {
    console.error('Logout error:', error)
    return c.json({ message: 'Terjadi kesalahan pada server' }, 500)
  }
})

// Get Profile Endpoint
app.get('/auth/me', async (c) => {
  try {
    const token = getCookie(c, 'session')

    if (!token) {
      return c.json({ message: 'Sesi tidak ditemukan atau sudah kedaluwarsa' }, 401)
    }

    // 1. Get session and user from D1
    const sessionWithUser = await c.env.DB.prepare(`
      SELECT u.id, u.name, u.email, u.role, s.expires_at 
      FROM sessions s 
      JOIN users u ON s.user_id = u.id 
      WHERE s.token = ?
    `).bind(token).first<{
      id: number
      name: string
      email: string
      role: string
      expires_at: string
    }>()

    if (!sessionWithUser) {
      // Clear invalid cookie
      deleteCookie(c, 'session', { path: '/' })
      return c.json({ message: 'Sesi tidak valid' }, 401)
    }

    // 2. Check if expired
    if (new Date(sessionWithUser.expires_at) < new Date()) {
      // Session expired, delete it
      await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
      deleteCookie(c, 'session', { path: '/' })
      return c.json({ message: 'Sesi sudah kedaluwarsa' }, 401)
    }

    // 3. Return user details
    return c.json({
      user: {
        id: sessionWithUser.id,
        name: sessionWithUser.name,
        email: sessionWithUser.email,
        role: sessionWithUser.role
      }
    })
  } catch (error) {
    console.error('Auth/me error:', error)
    return c.json({ message: 'Terjadi kesalahan pada server' }, 500)
  }
})

export default app
