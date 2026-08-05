import { useEffect, useState } from 'react'
import type { Vehicle } from '../types'
import { VehicleCard } from '../components/VehicleCard'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useTranslation } from '../i18n/useTranslation'
import { categoryLabels, fuelLabels, statusLabels } from '../i18n/translations'
import { CompareView } from '../components/CompareView'
import { useCompareStore, MAX_COMPARE } from '../store/compareStore'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const BRANDS = ['All', 'BMW', 'Mercedes', 'Audi', 'Volkswagen']
const CATEGORIES = ['All', 'New', 'Used']
const FUEL_TYPES = ['All', 'Gasoline', 'Diesel', 'Hybrid', 'Electric']
const STATUSES = ['All', 'Available', 'Reserved']

export function Catalog() {
  const { t, lang } = useTranslation()
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedFuel, setSelectedFuel] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([])
  const compareCount = useCompareStore(state => state.compareIds.length)
  const clearCompare = useCompareStore(state => state.clearCompare)

  // The filter arrays keep the raw values the backend expects; only the labels
  // shown to the user are translated. 'All' is the localized "any" option.
  const brandLabel = (v: string) => (v === 'All' ? t('catalog.all') : v)
  const categoryLabel = (v: string) => (v === 'All' ? t('catalog.all') : categoryLabels[lang][v as Vehicle['category']])
  const fuelLabel = (v: string) => (v === 'All' ? t('catalog.all') : fuelLabels[lang][v as Vehicle['fuelType']])
  const statusLabel = (v: string) => (v === 'All' ? t('catalog.all') : statusLabels[lang][v as Vehicle['status']])

  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedBrand !== 'All') params.append('brand', selectedBrand)
    if (selectedCategory !== 'All') params.append('category', selectedCategory)
    if (selectedFuel !== 'All') params.append('fuelType', selectedFuel)
    if (selectedStatus !== 'All') params.append('status', selectedStatus)
    if (minPrice) params.append('minPrice', minPrice)
    if (maxPrice) params.append('maxPrice', maxPrice)
    if (minYear) params.append('minYear', minYear)
    if (maxYear) params.append('maxYear', maxYear)

    fetch(`${import.meta.env.VITE_API_URL}/vehicles?${params.toString()}`)
      .then(res => res.json())
      .then(data => setVehicles(data))
  }, [selectedBrand, selectedCategory, selectedFuel, selectedStatus, minPrice, maxPrice, minYear, maxYear])

  // Full, unfiltered list for the compare drawer, so the active filters can
  // never hide (or prune) a vehicle the user picked for comparison.
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(res => res.json())
      .then((data: Vehicle[]) => setAllVehicles(data))
  }, [])

  function resetFilters() {
    setSelectedBrand('All')
    setSelectedCategory('All')
    setSelectedFuel('All')
    setSelectedStatus('All')
    setMinPrice('')
    setMaxPrice('')
    setMinYear('')
    setMaxYear('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 bg-white shadow-sm mb-2"
        >
          {showFilters ? `${t('catalog.hideFilters')} ✕` : `${t('catalog.showFilters')} ☰`}
        </button>
        {/* Sidebar */}
        <aside className={`w-full md:w-64 md:shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <button
            onClick={() => setShowCompare(v => !v)}
            disabled={compareCount === 0}
            aria-expanded={showCompare && compareCount > 0}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-red-800 enabled:hover:bg-red-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span aria-hidden="true">⇄</span> {t('nav.compare')}
            <span className="bg-white/25 rounded-full px-2 py-0.5 text-xs tabular-nums">{compareCount}/{MAX_COMPARE}</span>
            <span aria-hidden="true" className={`transition-transform ${showCompare && compareCount > 0 ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full text-left text-xs text-gray-400 hover:text-red-800 underline decoration-dotted underline-offset-2 transition-colors mb-4 -mt-2"
            >
              {t('catalog.authHint')}
            </button>
          )}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm uppercase tracking-widest text-gray-400">{t('catalog.filter')}</h2>
              <button onClick={resetFilters} className="text-xs text-red-800 hover:text-orange-500">
                {t('catalog.reset')}
              </button>
            </div>

            {/* Marke */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('catalog.brand')}</p>
              <div className="space-y-1">
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedBrand === brand
                        ? 'bg-red-800 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {brandLabel(brand)}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategorie */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('catalog.category')}</p>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-red-800 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {categoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Kraftstoff */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('catalog.fuel')}</p>
              <div className="space-y-1">
                {FUEL_TYPES.map(fuel => (
                  <button
                    key={fuel}
                    onClick={() => setSelectedFuel(fuel)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedFuel === fuel
                        ? 'bg-red-800 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {fuelLabel(fuel)}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('catalog.status')}</p>
              <div className="space-y-1">
                {STATUSES.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedStatus === status
                        ? 'bg-red-800 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {statusLabel(status)}
                  </button>
                ))}
              </div>
            </div>

            {/* Preis */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('catalog.price')}</p>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder={t('catalog.min')}
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
                <input
                  type="number"
                  placeholder={t('catalog.max')}
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
              </div>
            </div>

            {/* Jahr */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('catalog.year')}</p>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder={t('catalog.from')}
                  value={minYear}
                  onChange={e => setMinYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
                <input
                  type="number"
                  placeholder={t('catalog.to')}
                  value={maxYear}
                  onChange={e => setMaxYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-1">
          {/* Compare panel — expands downward inline (non-invasive), pushing the grid down */}
          <div className={`grid transition-all duration-300 ease-out ${showCompare && compareCount > 0 ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">{t('compare.title')}</h2>
                    <p className="text-xs text-gray-400">{t('compare.selected', { n: compareCount, max: MAX_COMPARE })}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {compareCount > 0 && (
                      <button onClick={clearCompare} className="text-xs text-red-800 hover:text-orange-500">
                        {t('compare.clearAll')}
                      </button>
                    )}
                    <button onClick={() => setShowCompare(false)} aria-label={t('common.close')} className="text-gray-400 hover:text-gray-900 text-xl leading-none">✕</button>
                  </div>
                </div>
                <div className="px-4 pb-2">
                  <CompareView vehicles={allVehicles} />
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-6">{t('catalog.vehiclesFound', { n: vehicles.length })}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((v: Vehicle) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </main>
        </div>
        <Footer />
    </div>
  )
}
