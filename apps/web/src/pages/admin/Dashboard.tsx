import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Vehicle } from '../../types'
import { useAuthStore } from '../../store/authStore'

export function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(res => res.json())
      .then(data => setVehicles(data))
  }, [])

  function handleDelete(id: string) {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles/${id}`, { method: 'DELETE' })
      .then(() => setVehicles(vehicles.filter(v => v.id !== id)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-red-800">Admin Panel</h1>
        <div className="flex gap-4 items-center">
            <button
                onClick={() => navigate('/admin/appointments')}
                className="text-sm px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                Termine 
            </button>
            <button
                onClick={() => navigate('/')}
                className="text-sm px-4 py-2 rounded-md border border-gray-700 text-gray-700 hover:bg-green-100 transition-colors"
                >
                Zurück zur Website
            </button>
            <button
              onClick={() => { logout(); navigate('/admin/login') }}
              className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors"
            >
              Abmelden
            </button>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fahrzeuge ({vehicles.length})</h2>
          <button
            onClick={() => navigate('/admin/vehicles/new')}
            className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            + Fahrzeug hinzufügen
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Marke</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Modell</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Jahr</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Preis</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Kategorie</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vehicles.map(v => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{v.brand}</td>
                  <td className="px-6 py-4 text-gray-600">{v.model}</td>
                  <td className="px-6 py-4 text-gray-600">{v.year}</td>
                  <td className="px-6 py-4 text-red-800 font-medium">€{Number(v.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${v.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{v.category}</td>
                  <td className="px-6 py-4 flex gap-3 justify-end">
                    <button
                      onClick={() => navigate(`/admin/vehicles/${v.id}/edit`)}
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-yellow-400 text-yellow-600 hover:bg-yellow-100 transition-colors">
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-red-400 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}