import { useEffect, useState } from 'react'
import type { Vehicle } from '../types'
import { VehicleCard } from '../components/VehicleCard'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'

const BRANDS = ['All', 'BMW', 'Mercedes', 'Audi', 'Volkswagen']
const CATEGORIES = ['All', 'New', 'Used']
const FUEL_TYPES = ['All', 'Gasoline', 'Diesel', 'Hybrid', 'Electric']
const STATUSES = ['All', 'Available', 'Reserved']

export function Catalog() {
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
  const navigate = useNavigate()

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 
        onClick={() => navigate('/')} 
        className="text-2xl font-bold tracking-widest uppercase cursor-pointer select-none text-red-800">
          CasAuto Real
          </h1>
        <button
          onClick={() => navigate('/admin')}
          className="text-sm px-4 py-2 rounded-md border border-green-700 text-green-700 hover:bg-green-100 transition-colors"
        >
          Log In
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 bg-white shadow-sm mb-2"
        >
          {showFilters ? 'Filtros verbergen ✕' : 'Filter anzeigen ☰'}
        </button>
        {/* Sidebar */}
        <aside className={`w-full md:w-64 md:shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm uppercase tracking-widest text-gray-400">Filter</h2>
              <button onClick={resetFilters} className="text-xs text-red-800 hover:text-orange-500">
                Reset
              </button>
            </div>

            {/* Marke */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Marke</p>
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
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategorie */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Kategorie</p>
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
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Kraftstoff */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Kraftstoff</p>
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
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Status</p>
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
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Preis */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Preis (€)</p>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
              </div>
            </div>

            {/* Jahr */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Jahr</p>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Von"
                  value={minYear}
                  onChange={e => setMinYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-800 text-sm"
                />
                <input
                  type="number"
                  placeholder="Bis"
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
          <p className="text-gray-400 text-sm mb-6">{vehicles.length} Fahrzeuge gefunden</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((v: Vehicle) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </main>
        {/* Footer */}
        
        
        
        </div>
        <Footer />
    </div>
  )
}