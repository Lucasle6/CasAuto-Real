import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Vehicle } from '../types'
import { AppointmentForm } from '../components/AppointmentForm'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function VehicleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setVehicle(data))
  }, [id])

  if (!vehicle) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="max-w-3xl mx-auto px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-900 mb-8 flex items-center gap-2 transition-colors"
        >
          ← Zurück
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mb-6">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs uppercase tracking-widest text-gray-400">{vehicle.category}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${vehicle.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {vehicle.status}
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-1">{vehicle.brand}</h2>
          <p className="text-gray-500 text-xl mb-8">{vehicle.model} · {vehicle.year}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded p-4 border border-gray-100">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Kraftstoff</p>
              <p className="text-gray-900 font-medium">{vehicle.fuelType}</p>
            </div>
            <div className="bg-gray-50 rounded p-4 border border-gray-100">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Kategorie</p>
              <p className="text-gray-900 font-medium">{vehicle.category}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-red-800 font-bold text-3xl">€{vehicle.price.toLocaleString()}</span>
            {vehicle.status === 'Available' && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-red-800 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium transition-colors"
              >
                Probefahrt buchen
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <AppointmentForm vehicleId={vehicle.id} onClose={() => setShowForm(false)} />
          </div>
        )}
      </main>

      <Footer />

    </div>
  )
}