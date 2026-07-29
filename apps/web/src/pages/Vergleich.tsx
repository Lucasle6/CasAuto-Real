import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Vehicle } from '../types'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useCompareStore, MAX_COMPARE } from '../store/compareStore'
import { useTranslation } from '../i18n/useTranslation'
import { categoryLabels, fuelLabels, statusLabels } from '../i18n/translations'

export function Vergleich() {
  const navigate = useNavigate()
  const { t, price, lang } = useTranslation()
  const compareIds = useCompareStore(state => state.compareIds)
  const removeFromCompare = useCompareStore(state => state.removeFromCompare)
  const clearCompare = useCompareStore(state => state.clearCompare)
  const pruneCompare = useCompareStore(state => state.pruneCompare)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  // Built inside the component so labels and values follow the active language.
  const rows: { label: string; render: (v: Vehicle) => string }[] = [
    { label: t('compare.rowPrice'), render: v => price(v.price) },
    { label: t('compare.rowYear'), render: v => String(v.year) },
    { label: t('catalog.category'), render: v => categoryLabels[lang][v.category] },
    { label: t('catalog.fuel'), render: v => fuelLabels[lang][v.fuelType] },
    { label: t('catalog.status'), render: v => statusLabels[lang][v.status] },
  ]

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(res => res.json())
      .then((data: Vehicle[]) => {
        setVehicles(data)
        // Drop any selected IDs that no longer correspond to a real vehicle
        // (e.g. deleted in the admin panel), so the navbar badge stays accurate.
        pruneCompare(data.map(v => v.id))
      })
      .finally(() => setLoading(false))
  }, [pruneCompare])

  // Keep the order the user picked them in, not the fetch order.
  const compared = compareIds
    .map(id => vehicles.find(v => v.id === id))
    .filter((v): v is Vehicle => v !== undefined)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full flex-1">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('compare.title')}</h1>
          {compared.length > 0 && (
            <button onClick={clearCompare} className="text-xs text-red-800 hover:text-orange-500">
              {t('compare.clearAll')}
            </button>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-8">
          {loading ? t('common.loading') : t('compare.selected', { n: compared.length, max: MAX_COMPARE })}
        </p>

        {!loading && compared.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-400">
            {t('compare.empty', { max: MAX_COMPARE })}
          </div>
        )}

        {compared.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-gray-400 uppercase text-xs tracking-wider w-32">&nbsp;</th>
                  {compared.map(v => (
                    <th key={v.id} className="text-left p-4 min-w-[180px]">
                      <div className="flex justify-between items-start gap-2">
                        <button
                          onClick={() => navigate(`/vehicles/${v.id}`)}
                          className="text-left hover:text-red-800 transition-colors"
                        >
                          <div className="font-semibold text-gray-900">{v.brand}</div>
                          <div className="text-gray-500 font-normal">{v.model}</div>
                        </button>
                        <button
                          onClick={() => removeFromCompare(v.id)}
                          aria-label={`${v.brand} ${v.model} ${t('compare.removeSuffix')}`}
                          className="text-gray-300 hover:text-red-800 transition-colors text-lg leading-none"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                    <td className="p-4 text-gray-400 text-xs uppercase tracking-wider">{row.label}</td>
                    {compared.map(v => (
                      <td key={v.id} className="p-4 text-gray-900">{row.render(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
