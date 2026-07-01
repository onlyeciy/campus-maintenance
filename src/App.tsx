import { useState, useEffect } from 'react'
import './App.css'

interface User {
  id: number
  name: string
  email: string
  role: 'reporter' | 'admin' | 'technician' | 'manager'
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Login Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'reporter' | 'admin' | 'technician' | 'manager'>('reporter')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch current user session on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Not logged in')
      })
      .then((data) => {
        const resData = data as { user: User }
        setUser(resData.user)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorData = data as { message?: string }
        throw new Error(errorData.message || 'Login gagal')
      }

      const successData = data as { user: User }
      setUser(successData.user)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi kesalahan yang tidak diketahui')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      // Reset form states
      setEmail('')
      setPassword('')
      setError(null)
    }
  }

  if (loading) {
    return (
      <div className="login-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent-bg)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p style={{ fontSize: '14px', color: 'var(--text)' }}>Memeriksa sesi...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Campus Maintenance</h2>
            <p>Silakan masuk untuk mengakses dashboard Anda</p>
          </div>

          {error && <div className="alert-danger" role="alert">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="nama@kampus.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Pilih Peran Anda</label>
              <div className="role-grid">
                <div
                  className={`role-card ${selectedRole === 'reporter' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('reporter')}
                >
                  <div className="role-icon" aria-hidden="true">📝</div>
                  <div className="role-name">Pelapor</div>
                </div>
                <div
                  className={`role-card ${selectedRole === 'admin' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('admin')}
                >
                  <div className="role-icon" aria-hidden="true">🛡️</div>
                  <div className="role-name">Administrator</div>
                </div>
                <div
                  className={`role-card ${selectedRole === 'technician' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('technician')}
                >
                  <div className="role-icon" aria-hidden="true">🔧</div>
                  <div className="role-name">Teknisi</div>
                </div>
                <div
                  className={`role-card ${selectedRole === 'manager' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('manager')}
                >
                  <div className="role-icon" aria-hidden="true">📊</div>
                  <div className="role-name">Manajer</div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || !email || !password}
            >
              {submitting ? 'Memproses...' : 'Masuk ke Sistem'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Dashboard Renderer based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'reporter':
        return (
          <div className="dashboard-content">
            <h3>Pusat Laporan Pelapor</h3>
            <p>Selamat datang di dashboard pelapor. Di sini Anda dapat membuat laporan keluhan fasilitas kampus baru dan memantau perkembangannya.</p>
            
            <div className="features-preview">
              <h4>Fitur yang Tersedia (Fase Berikutnya):</h4>
              <ul>
                <li><strong>Buat Laporan Baru:</strong> Laporkan masalah fasilitas di kelas, laboratorium, atau area kampus lainnya.</li>
                <li><strong>Pantau Progres:</strong> Lihat status terkini laporan Anda secara real-time (Submitted → Under Review → Assigned → In Progress → Resolved → Closed).</li>
                <li><strong>Diskusi & Catatan:</strong> Tambahkan komentar atau berikan konfirmasi atas hasil pekerjaan teknisi.</li>
              </ul>
            </div>
          </div>
        )
      case 'admin':
        return (
          <div className="dashboard-content">
            <h3>Panel Kontrol Administrator</h3>
            <p>Selamat datang di panel kontrol administrator. Anda bertanggung jawab untuk memeriksa laporan masuk, menentukan prioritas, dan menugaskan teknisi.</p>
            
            <div className="features-preview">
              <h4>Fitur yang Tersedia (Fase Berikutnya):</h4>
              <ul>
                <li><strong>Tinjau Laporan Baru:</strong> Periksa keaslian dan kategori laporan yang masuk dari mahasiswa/dosen.</li>
                <li><strong>Penugasan Teknisi:</strong> Pilih dan tugaskan teknisi yang sesuai untuk menyelesaikan masalah.</li>
                <li><strong>Log Audit & Riwayat:</strong> Pantau riwayat perubahan status laporan demi retensi data dan transparansi.</li>
              </ul>
            </div>
          </div>
        )
      case 'technician':
        return (
          <div className="dashboard-content">
            <h3>Daftar Tugas Teknisi</h3>
            <p>Selamat datang di ruang kerja teknisi. Di sini Anda dapat melihat tugas perbaikan fasilitas yang diberikan kepada Anda dan memperbarui progresnya.</p>
            
            <div className="features-preview">
              <h4>Fitur yang Tersedia (Fase Berikutnya):</h4>
              <ul>
                <li><strong>Daftar Tugas Aktif:</strong> Lihat laporan fasilitas yang ditugaskan kepada Anda beserta prioritasnya.</li>
                <li><strong>Terima Tugas:</strong> Tandai tugas sebagai "In Progress" saat Anda mulai bekerja.</li>
                <li><strong>Pekerjaan Selesai:</strong> Kirim konfirmasi penyelesaian agar pelapor dapat memeriksa hasilnya.</li>
              </ul>
            </div>
          </div>
        )
      case 'manager':
        return (
          <div className="dashboard-content">
            <h3>Dashboard Manajer Fasilitas</h3>
            <p>Selamat datang di ringkasan eksekutif manajer fasilitas. Anda dapat memantau performa pemeliharaan kampus secara keseluruhan melalui visualisasi data ringkas.</p>
            
            <div className="features-preview">
              <h4>Fitur yang Tersedia (Fase Berikutnya):</h4>
              <ul>
                <li><strong>Agregasi Data Laporan:</strong> Pantau jumlah total keluhan per kategori dan status.</li>
                <li><strong>Statistik Penyelesaian:</strong> Lihat persentase laporan yang berhasil diselesaikan tepat waktu.</li>
                <li><strong>Laporan Cetak:</strong> Ekspor ringkasan performa untuk rapat koordinasi bulanan.</li>
              </ul>
            </div>
          </div>
        )
      default:
        return <div>Peran tidak dikenal.</div>
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Campus Maintenance</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '15px', color: 'var(--text)' }}>
              Masuk sebagai <strong>{user.name}</strong> ({user.email})
            </span>
            <span className="user-badge">{user.role}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Keluar
        </button>
      </div>
      {renderDashboard()}
    </div>
  )
}

export default App
