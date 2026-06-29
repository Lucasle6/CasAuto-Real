import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwörter stimmen nicht überein')
      return
    }

    if (form.password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen haben')
      return
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    })

    if (res.ok) {
      setSuccess(true)
    } else {
      setError('Email bereits registriert')
    }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto px-8 py-32 text-center">
        <p className="text-green-700 text-xl font-medium mb-2">Konto erfolgreich erstellt</p>
        <p className="text-gray-500 text-sm mb-8">Sie können sich jetzt anmelden.</p>
        <button
          onClick={() => navigate('/admin/login')}
          className="bg-red-800 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors"
        >
          Zum Login
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-md mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Konto erstellen</h2>
        <p className="text-gray-500 mb-8">Registrieren Sie sich für ein Konto</p>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Passwort</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Passwort bestätigen</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors"
          >
            Registrieren
          </button>

          <p className="text-center text-sm text-gray-500">
            Bereits ein Konto?{' '}
            <span onClick={() => navigate('/admin/login')} className="text-red-800 cursor-pointer hover:underline">
              Anmelden
            </span>
          </p>
        </div>
      </main>
    </div>
  )
}