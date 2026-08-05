import { create } from 'zustand'
import { useAuthStore } from './authStore'

const MAX_COMPARE = 3

// Namespaced per logged-in account (by email) rather than one shared key, so
// switching accounts in the same browser shows that account's own selection
// instead of whoever used the browser last. Still localStorage only - not
// synced to the backend, so it won't follow an account across devices.
function keyFor(email: string | null) {
  return `compareVehicleIds:${email ?? 'anon'}`
}

function loadCompareIds(email: string | null): string[] {
  try {
    const raw = localStorage.getItem(keyFor(email))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCompareIds(email: string | null, ids: string[]) {
  localStorage.setItem(keyFor(email), JSON.stringify(ids))
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
  compareIds: loadCompareIds(useAuthStore.getState().userEmail),
  isComparing: (id: string) => get().compareIds.includes(id),
  toggleCompare: (id: string) => {
    const email = useAuthStore.getState().userEmail
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
    saveCompareIds(email, next)
    set({ compareIds: next })
  },
  removeFromCompare: (id: string) => {
    const email = useAuthStore.getState().userEmail
    const next = get().compareIds.filter(existingId => existingId !== id)
    saveCompareIds(email, next)
    set({ compareIds: next })
  },
  clearCompare: () => {
    const email = useAuthStore.getState().userEmail
    saveCompareIds(email, [])
    set({ compareIds: [] })
  },
  // Drops IDs that no longer correspond to a real vehicle (e.g. deleted by
  // an admin) - without this, the navbar badge count drifts from what
  // /vergleich actually shows, forever, since nothing else removes them.
  pruneCompare: (existingIds: string[]) => {
    const email = useAuthStore.getState().userEmail
    const current = get().compareIds
    const next = current.filter(id => existingIds.includes(id))
    if (next.length !== current.length) {
      saveCompareIds(email, next)
      set({ compareIds: next })
    }
  },
}))

// Reload from the newly active account's own selection on login/logout/
// account switch - otherwise this store would keep showing the previous
// account's in-memory state until a full page reload.
useAuthStore.subscribe((state, prevState) => {
  if (state.userEmail !== prevState.userEmail) {
    useCompareStore.setState({ compareIds: loadCompareIds(state.userEmail) })
  }
})

export { MAX_COMPARE }
