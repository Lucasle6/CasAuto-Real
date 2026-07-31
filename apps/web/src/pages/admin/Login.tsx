import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useTranslation } from '../../i18n/useTranslation'

export function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  async function handleSubmit() {
    setError('')
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      setError(t('login.wrongCredentials'))
      return
    }

    const data = await res.json()
    login(data.accessToken)
    // Only admins have anywhere useful to go at /admin; everyone else (this
    // form is shared with regular customer accounts via the "already have an
    // account" link on /register) lands back on the site.
    navigate(useAuthStore.getState().isAdmin ? '/admin' : '/')
  }

  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="w-full max-w-sm">
      
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 cursor-pointer select-none"
      >
        <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs">
          ←
        </span>
        {t('login.backToSite')}
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-red-800 text-center mb-8">
          CasAuto Real
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">{t('form.email')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">{t('form.password')}</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors"
          >
            {t('login.submit')}
          </button>
        </div>
      </div>
    </div>
  </div>
)}