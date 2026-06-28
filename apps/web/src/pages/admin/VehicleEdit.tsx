import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const INITIAL_FORM = {
  brand: '',
  model: '',
  year: '',
  price: '',
  fuelType: 'Gasoline',
  status: 'Available',
  category: 'New',
}

export function VehicleEdit() {
  const [form, setForm] = useState(INITIAL_FORM)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setForm({
        brand: data.brand,
        model: data.model,
        year: String(data.year),
        price: String(data.price),
        fuelType: data.fuelType,
        status: data.status,
        category: data.category,
      }))
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    await fetch(`${import.meta.env.VITE_API_URL}/vehicles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        price: Number(form.price),
      })
    })
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-red-800">Admin Panel</h1>
        <button
          onClick={() => navigate('/admin')}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Zurück
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Fahrzeug bearbeiten</h2>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Marke</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Modell</label>
              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Jahr</label>
              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Preis (€)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Kraftstoff</label>
            <select
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            >
              <option value="benzin">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="elektro">Electric</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            >
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Kategorie</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-800 text-sm"
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-red-800 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors"
            >
              Speichern
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="flex-1 border border-gray-200 text-gray-500 hover:text-gray-900 py-2 rounded transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}