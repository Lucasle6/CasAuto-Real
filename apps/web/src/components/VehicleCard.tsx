import { useNavigate } from 'react-router-dom'
import type{ Vehicle } from '../types'
import {motion} from 'framer-motion'
import { useFavoritesStore } from '../store/favoritesStore'
import { useCompareStore } from '../store/compareStore'
import { getVehiclePhoto } from '../data/brandPhotos'
import { useTranslation } from '../i18n/useTranslation'
import { categoryLabels, statusLabels, fuelLabels } from '../i18n/translations'

interface Props {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: Props) {
  const navigate = useNavigate()
  const { t, price, lang } = useTranslation()
  const isFavorite = useFavoritesStore(state => state.isFavorite(vehicle.id))
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)
  const isComparing = useCompareStore(state => state.isComparing(vehicle.id))
  const toggleCompare = useCompareStore(state => state.toggleCompare)

  return (
    <motion.div
        onClick={() => navigate(`/vehicles/${vehicle.id}`)}
        whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        className="relative bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
      >
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(vehicle.id) }}
        aria-label={isFavorite ? t('card.removeFavorite') : t('card.addFavorite')}
        aria-pressed={isFavorite}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-lg transition-transform hover:scale-110"
      >
        <span className={isFavorite ? 'text-red-800' : 'text-gray-300'}>
          {isFavorite ? '♥' : '♡'}
        </span>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); toggleCompare(vehicle.id) }}
        aria-label={isComparing ? t('card.removeCompare') : t('card.addCompare')}
        aria-pressed={isComparing}
        title={t('card.compare')}
        className={`absolute top-3 left-3 z-10 w-9 h-9 rounded-full shadow-sm flex items-center justify-center text-sm font-medium transition-transform hover:scale-110 ${
          isComparing ? 'bg-red-800 text-white' : 'bg-white/90 text-gray-300'
        }`}
      >
        {isComparing ? '✓' : '⇄'}
      </button>

      <div className="bg-gray-100 h-56 border-b border-gray-100 overflow-hidden">
        <img
          src={getVehiclePhoto(vehicle.brand)}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs uppercase tracking-widest text-gray-400">{categoryLabels[lang][vehicle.category]}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${vehicle.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {statusLabels[lang][vehicle.status]}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{vehicle.brand}</h3>
        <p className="text-gray-500 mb-1">{vehicle.model} · {vehicle.year}</p>
        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1.5">
          <span aria-hidden="true">⛽</span>
          {fuelLabels[lang][vehicle.fuelType]}
        </p>
        <span className="text-red-800 font-bold text-lg">{price(vehicle.price)}</span>
      </div>
    </motion.div>
  )
}
