import { useState } from 'react'
import type { Appointment } from '../types'

interface Props {
  vehicleId: string
  onClose: () => void
}

export function AppointmentForm({ vehicleId, onClose }: Props) {
  const [form, setForm] = useState<Appointment>({
    vehicleId,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    date: '',
    type: 'test_drive',
    notes: ''
  })
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    await fetch('http://localhost:3000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setSuccess(true)
  }

  if (success) return (
    <div className="text-center py-8">
      <p className="text-green-400 text-xl mb-4">✓ Termin erfolgreich gebucht!</p>
      <button onClick={onClose} className="text-gray-400 hover:text-white">Zurück</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-6">Probefahrt buchen</h3>

      <input
        name="customerName"
        placeholder="Name"
        value={form.customerName}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
      />

      <input
        name="customerEmail"
        placeholder="Email"
        value={form.customerEmail}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
      />

      <input
        name="customerPhone"
        placeholder="Telefon"
        value={form.customerPhone}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-500"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-500"
      >
        <option value="test_drive">Probefahrt</option>
        <option value="service">Service</option>
        <option value="consultation">Beratung</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notizen (optional)"
        value={form.notes}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        rows={3}
      />

      <div className="flex gap-4 pt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-medium transition-colors"
        >
          Termin buchen
        </button>
        <button
          onClick={onClose}
          className="flex-1 border border-gray-700 text-gray-400 hover:text-white py-2 rounded transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </div>
  )
}