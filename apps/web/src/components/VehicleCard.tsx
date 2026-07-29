import { useNavigate } from 'react-router-dom'
import type{ Vehicle } from '../types'
import {motion} from 'framer-motion'
import { useFavoritesStore } from '../store/favoritesStore'
import { useCompareStore } from '../store/compareStore'

const BRAND_IMAGES: Record<string, string> = {
  BMW: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  Mercedes: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
  Audi: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
  Volkswagen: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg',
}

interface Props {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: Props) {
  const navigate = useNavigate()
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
        aria-label={isFavorite ? 'Von der Merkliste entfernen' : 'Zur Merkliste hinzufügen'}
        aria-pressed={isFavorite}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-lg transition-transform hover:scale-110"
      >
        <span className={isFavorite ? 'text-red-800' : 'text-gray-300'}>
          {isFavorite ? '♥' : '♡'}
        </span>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); toggleCompare(vehicle.id) }}
        aria-label={isComparing ? 'Vom Vergleich entfernen' : 'Zum Vergleich hinzufügen'}
        aria-pressed={isComparing}
        title="Vergleichen"
        className={`absolute top-3 left-3 z-10 w-9 h-9 rounded-full shadow-sm flex items-center justify-center text-sm font-medium transition-transform hover:scale-110 ${
          isComparing ? 'bg-red-800 text-white' : 'bg-white/90 text-gray-300'
        }`}
      >
        {isComparing ? '✓' : '⇄'}
      </button>

      <div className="bg-gray-50 h-40 flex items-center justify-center border-b border-gray-100">
        <img
          src={BRAND_IMAGES[vehicle.brand]}
          alt={vehicle.brand}
          className="h-20 object-contain opacity-80"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs uppercase tracking-widest text-gray-400">{vehicle.category}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${vehicle.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {vehicle.status}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{vehicle.brand}</h3>
        <p className="text-gray-500 mb-4">{vehicle.model} · {vehicle.year}</p>
        <div className="flex justify-between items-center">
          <span className="text-red-800 font-bold text-lg">€{vehicle.price.toLocaleString()}</span>
          <span className="text-xs text-gray-400 uppercase">{vehicle.fuelType}</span>
        </div>
      </div>
    </motion.div>
  )
}