import { useEffect, useState } from 'react'
import type { Vehicle } from '../types'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { CompareView } from '../components/CompareView'
import { useCompareStore, MAX_COMPARE } from '../store/compareStore'
import { useTranslation } from '../i18n/useTranslation'

export function Vergleich() {
  const { t } = useTranslation()
  const compareIds = useCompareStore(state => state.compareIds)
  const clearCompare = useCompareStore(state => state.clearCompare)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(res => res.json())
      .then((data: Vehicle[]) => setVehicles(data))
      .finally(() => setLoading(false))
  }, [])

  const selectedCount = compareIds.filter(id => vehicles.some(v => v.id === id)).length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full flex-1">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('compare.title')}</h1>
          {selectedCount > 0 && (
            <button onClick={clearCompare} className="text-xs text-red-800 hover:text-orange-500">
              {t('compare.clearAll')}
            </button>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-8">
          {loading ? t('common.loading') : t('compare.selected', { n: selectedCount, max: MAX_COMPARE })}
        </p>

        {!loading && <CompareView vehicles={vehicles} />}
      </main>

      <Footer />
    </div>
  )
}
