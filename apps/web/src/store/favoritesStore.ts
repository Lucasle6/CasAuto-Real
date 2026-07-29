import { create } from 'zustand'

const STORAGE_KEY = 'favoriteVehicleIds'

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFavorites(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

interface FavoritesStore {
  favoriteIds: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: loadFavorites(),
  isFavorite: (id: string) => get().favoriteIds.includes(id),
  toggleFavorite: (id: string) => {
    const current = get().favoriteIds
    const next = current.includes(id)
      ? current.filter(existingId => existingId !== id)
      : [...current, id]
    saveFavorites(next)
    set({ favoriteIds: next })
  },
}))
