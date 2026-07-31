import { useState } from 'react'
import { useTranslation } from '../i18n/useTranslation'

export function Newsletter() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ email: '', name: '' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') return (
    <div className="text-center py-8">
      <p className="text-green-600 font-medium text-lg mb-2">{t('newsletter.successTitle')}</p>
      <p className="text-gray-500 text-sm">{t('newsletter.successBody')}</p>
    </div>
  )

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-3">
        <input
          type="text"
          placeholder={t('form.name')}
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
        />
        <input
          type="email"
          placeholder={t('form.email')}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
        />
        {status === 'error' && (
          <p className="text-red-400 text-sm">{t('newsletter.errEmailTaken')}</p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors"
        >
          {t('newsletter.subscribe')}
        </button>
      </div>
    </div>
  )
}
