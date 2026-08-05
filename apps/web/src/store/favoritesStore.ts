import { create } from 'zustand'
import { useAuthStore } from './authStore'

// Namespaced per logged-in account (by email) rather than one shared key, so
// switching accounts in the same browser shows that account's own list
// instead of whoever used the browser last. Still localStorage only - not
// synced to the backend, so it won't follow an account across devices.
function keyFor(email: string | null) {
  return `favoriteVehicleIds:${email ?? 'anon'}`
}

function loadFavorites(email: string | null): string[] {
  try {
    const raw = localStorage.getItem(keyFor(email))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFavorites(email: string | null, ids: string[]) {
  localStorage.setItem(keyFor(email), JSON.stringify(ids))
}

interface FavoritesStore {
  favoriteIds: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  pruneFavorites: (existingIds: string[]) => void
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: loadFavorites(useAuthStore.getState().userEmail),
  isFavorite: (id: string) => get().favoriteIds.includes(id),
  toggleFavorite: (id: string) => {
    const email = useAuthStore.getState().userEmail
    const current = get().favoriteIds
    const next = current.includes(id)
      ? current.filter(existingId => existingId !== id)
      : [...current, id]
    saveFavorites(email, next)
    set({ favoriteIds: next })
  },
  // Drops IDs that no longer correspond to a real vehicle (e.g. deleted by
  // an admin) - without this, the navbar badge count drifts from what
  // /merkliste actually shows, forever, since nothing else removes them.
  pruneFavorites: (existingIds: string[]) => {
    const email = useAuthStore.getState().userEmail
    const current = get().favoriteIds
    const next = current.filter(id => existingIds.includes(id))
    if (next.length !== current.length) {
      saveFavorites(email, next)
      set({ favoriteIds: next })
    }
  },
}))

// Reload from the newly active account's own list on login/logout/account
// switch - otherwise this store would keep showing the previous account's
// in-memory state until a full page reload.
useAuthStore.subscribe((state, prevState) => {
  if (state.userEmail !== prevState.userEmail) {
    useFavoritesStore.setState({ favoriteIds: loadFavorites(state.userEmail) })
  }
})
