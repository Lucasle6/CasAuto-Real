import { create } from 'zustand'

const STORAGE_KEY = 'compareVehicleIds'
const MAX_COMPARE = 3

function loadCompareIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCompareIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

interface CompareStore {
  compareIds: string[]
  isComparing: (id: string) => boolean
  toggleCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  pruneCompare: (existingIds: string[]) => void
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  compareIds: loadCompareIds(),
  isComparing: (id: string) => get().compareIds.includes(id),
  toggleCompare: (id: string) => {
    const current = get().compareIds
    let next: string[]
    if (current.includes(id)) {
      next = current.filter(existingId => existingId !== id)
    } else if (current.length >= MAX_COMPARE) {
      // Keep it responsive instead of silently refusing: drop the oldest
      // selection to make room for the new one.
      next = [...current.slice(1), id]
    } else {
      next = [...current, id]
    }
    saveCompareIds(next)
    set({ compareIds: next })
  },
  removeFromCompare: (id: string) => {
    const next = get().compareIds.filter(existingId => existingId !== id)
    saveCompareIds(next)
    set({ compareIds: next })
  },
  clearCompare: () => {
    saveCompareIds([])
    set({ compareIds: [] })
  },
  // Drops IDs that no longer correspond to a real vehicle (e.g. deleted by
  // an admin) - without this, the navbar badge count drifts from what
  // /vergleich actually shows, forever, since nothing else removes them.
  pruneCompare: (existingIds: string[]) => {
    const current = get().compareIds
    const next = current.filter(id => existingIds.includes(id))
    if (next.length !== current.length) {
      saveCompareIds(next)
      set({ compareIds: next })
    }
  },
}))

export { MAX_COMPARE }
