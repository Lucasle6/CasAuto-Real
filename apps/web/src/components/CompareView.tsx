import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Vehicle } from '../types'
import { useCompareStore, MAX_COMPARE } from '../store/compareStore'
import { useTranslation } from '../i18n/useTranslation'
import { categoryLabels, fuelLabels, statusLabels } from '../i18n/translations'

// Fixed heights so the label column and every vehicle card line up row by row.
const HEADER_H = 'h-24'
const ROW_H = 'h-14'

// Body of the comparison (label column + one card per selected vehicle, or an
// empty state). Reused by the /vergleich page and the catalog's compare drawer.
// `vehicles` is the already-fetched list from the parent, so no extra request.
export function CompareView({ vehicles }: { vehicles: Vehicle[] }) {
  const navigate = useNavigate()
  const { t, price, lang } = useTranslation()
  const compareIds = useCompareStore(state => state.compareIds)
  const removeFromCompare = useCompareStore(state => state.removeFromCompare)
  const pruneCompare = useCompareStore(state => state.pruneCompare)

  // Drop selected IDs whose vehicle no longer exists (e.g. deleted in admin),
  // so the navbar badge stays accurate. Runs once the real list is available.
  useEffect(() => {
    if (vehicles.length) pruneCompare(vehicles.map(v => v.id))
  }, [vehicles, pruneCompare])

  const rows: { label: string; render: (v: Vehicle) => ReactNode; strong?: boolean }[] = [
    { label: t('compare.rowPrice'), render: v => price(v.price), strong: true },
    { label: t('compare.rowYear'), render: v => v.year },
    { label: t('catalog.category'), render: v => categoryLabels[lang][v.category] },
    { label: t('catalog.fuel'), render: v => fuelLabels[lang][v.fuelType] },
    {
      label: t('catalog.status'),
      render: v => (
        <span className={`text-xs px-2 py-1 rounded-full ${v.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {statusLabels[lang][v.status]}
        </span>
      ),
    },
  ]

  // Keep the order the user picked them in, not the fetch order.
  const compared = compareIds
    .map(id => vehicles.find(v => v.id === id))
    .filter((v): v is Vehicle => v !== undefined)

  if (compared.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-400">
        {t('compare.empty', { max: MAX_COMPARE })}
      </div>
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto px-1 pt-3 pb-4">
      {/* Label column (hidden on mobile - labels move inline into each card) */}
      <div className="shrink-0 hidden sm:flex flex-col w-28">
        <div className={HEADER_H} />
        {rows.map(row => (
          <div
            key={row.label}
            className={`${ROW_H} flex items-center text-xs uppercase tracking-wider text-gray-400 border-t border-transparent first:border-t-0`}
          >
            {row.label}
          </div>
        ))}
      </div>

      {/* One card per vehicle */}
      {compared.map(v => (
        <div
          key={v.id}
          className="relative flex-1 min-w-[200px] bg-white border border-green-200 rounded-xl shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:border-green-500 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] hover:z-10"
        >
          <div className={`${HEADER_H} px-5 flex items-start justify-between gap-2 bg-green-50/50 border-b border-green-100`}>
            <button
              onClick={() => navigate(`/vehicles/${v.id}`)}
              className="text-left pt-5 hover:text-red-800 transition-colors"
            >
              <div className="font-semibold text-gray-900 leading-tight">{v.brand}</div>
              <div className="text-gray-500 text-sm">{v.model}</div>
            </button>
            <button
              onClick={() => removeFromCompare(v.id)}
              aria-label={`${v.brand} ${v.model} ${t('compare.removeSuffix')}`}
              className="pt-5 text-gray-300 hover:text-red-800 transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {rows.map(row => (
            <div
              key={row.label}
              className={`${ROW_H} px-5 flex items-center gap-3 border-t border-gray-100 first:border-t-0`}
            >
              <span className="sm:hidden text-xs uppercase tracking-wider text-gray-400 w-24 shrink-0">{row.label}</span>
              <span className={row.strong ? 'text-red-800 font-bold text-lg' : 'text-gray-900 text-sm'}>
                {row.render(v)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
