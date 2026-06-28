import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Appointment {
  id: string
  vehicleId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  type: string
  status: string
  notes: string
  createdAt: string
}

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-red-800">Admin Panel</h1>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
            Zurück zur Website
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Termine ({appointments.length})</h2>
          <button
            onClick={() => navigate('/admin')}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Fahrzeuge
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Kunde</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Email</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Telefon</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Datum</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Typ</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 uppercase tracking-wider text-xs">Notizen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{a.customerName}</td>
                  <td className="px-6 py-4 text-gray-600">{a.customerEmail}</td>
                  <td className="px-6 py-4 text-gray-600">{a.customerPhone}</td>
                  <td className="px-6 py-4 text-gray-600">{a.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {a.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{a.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}