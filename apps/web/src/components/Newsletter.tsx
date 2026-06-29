import { useState } from 'react'

export function Newsletter() {
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
      <p className="text-green-600 font-medium text-lg mb-2">Erfolgreich angemeldet!</p>
      <p className="text-gray-500 text-sm">Sie erhalten ab sofort unsere Newsletter.</p>
    </div>
  )

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
        />
        {status === 'error' && (
          <p className="text-red-400 text-sm">Email bereits registriert.</p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors"
        >
          Jetzt anmelden
        </button>
      </div>
    </div>
  )
}