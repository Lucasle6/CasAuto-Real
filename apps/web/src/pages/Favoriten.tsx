import { useEffect, useState } from 'react'
import type { Vehicle } from '../types'
import { VehicleCard } from '../components/VehicleCard'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useFavoritesStore } from '../store/favoritesStore'
import { useTranslation } from '../i18n/useTranslation'

export function Favoriten() {
  const { t } = useTranslation()
  const favoriteIds = useFavoritesStore(state => state.favoriteIds)
  const pruneFavorites = useFavoritesStore(state => state.pruneFavorites)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(res => res.json())
      .then((data: Vehicle[]) => {
        setVehicles(data)
        // Drop any favorited IDs that no longer correspond to a real vehicle
        // (e.g. deleted in the admin panel), so the navbar badge stays accurate.
        pruneFavorites(data.map(v => v.id))
      })
      .finally(() => setLoading(false))
  }, [pruneFavorites])

  const favorites = vehicles.filter(v => favoriteIds.includes(v.id))

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('nav.watchlist')}</h1>
        <p className="text-gray-400 text-sm mb-8">
          {loading
            ? t('common.loading')
            : favorites.length === 1
              ? t('fav.savedOne')
              : t('fav.savedMany', { n: favorites.length })}
        </p>

        {!loading && favorites.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-400">
            {t('fav.empty')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map(v => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
