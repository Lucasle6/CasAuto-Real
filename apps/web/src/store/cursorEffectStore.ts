import { create } from 'zustand'

const STORAGE_KEY = 'cursorEffectEnabled'

interface CursorEffectStore {
  enabled: boolean
  toggle: () => void
}

// Same manual-persistence pattern as languageStore.ts / favoritesStore.ts.
// Off by default - the trailing-line effect is a nice-to-have, not something
// everyone expects, and can read as a rendering glitch if you don't know
// it's intentional.
export const useCursorEffectStore = create<CursorEffectStore>((set, get) => ({
  enabled: localStorage.getItem(STORAGE_KEY) === 'true',
  toggle: () => {
    const next = !get().enabled
    localStorage.setItem(STORAGE_KEY, String(next))
    set({ enabled: next })
  },
}))
