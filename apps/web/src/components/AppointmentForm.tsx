import { useState } from 'react'
import type { Appointment } from '../types'
import { useTranslation } from '../i18n/useTranslation'

interface Props {
  vehicleId: string
  onClose: () => void
}

export function AppointmentForm({ vehicleId, onClose }: Props) {
  const { t } = useTranslation()
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
    await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setSuccess(true)
  }

  if (success) return (
    <div className="text-center py-8">
      <p className="text-green-400 text-xl mb-4">✓ {t('appointment.success')}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-white">{t('common.back')}</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-6">{t('detail.bookTestDrive')}</h3>

      <input
        name="customerName"
        placeholder={t('form.name')}
        value={form.customerName}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
      />

      <input
        name="customerEmail"
        placeholder={t('form.email')}
        value={form.customerEmail}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
      />

      <input
        name="customerPhone"
        placeholder={t('form.phone')}
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
        <option value="test_drive">{t('appointment.typeTestDrive')}</option>
        <option value="service">{t('appointment.typeService')}</option>
        <option value="consultation">{t('appointment.typeConsultation')}</option>
      </select>

      <textarea
        name="notes"
        placeholder={t('appointment.notes')}
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
          {t('appointment.submit')}
        </button>
        <button
          onClick={onClose}
          className="flex-1 border border-gray-700 text-gray-400 hover:text-white py-2 rounded transition-colors"
        >
          {t('appointment.cancel')}
        </button>
      </div>
    </div>
  )
}
