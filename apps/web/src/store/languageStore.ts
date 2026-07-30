import { create } from 'zustand'
import type { Lang } from '../i18n/translations'

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' || stored === 'es' || stored === 'de' ? stored : 'de'
}

interface LanguageStore {
  lang: Lang
  setLang: (lang: Lang) => void
}

// Same manual-persistence pattern as authStore.ts / favoritesStore.ts:
// the chosen language is kept in localStorage so it survives reloads.
export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: initialLang(),
  setLang: (lang: Lang) => {
    localStorage.setItem(STORAGE_KEY, lang)
    set({ lang })
  },
}))
