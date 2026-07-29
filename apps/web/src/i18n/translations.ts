import type { Vehicle } from '../types'

// Supported UI languages. 'de' is the source/fallback language.
export type Lang = 'de' | 'en' | 'es'

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

// Flat, namespaced UI strings. Keep 'de' complete - it is the fallback, and its
// keys define the TranslationKey type, so every language is checked against it.
export const translations = {
  de: {
    'nav.vehicles': 'Fahrzeuge',
    'nav.watchlist': 'Merkliste',
    'nav.compare': 'Vergleich',
    'nav.company': 'Unternehmen',
    'nav.careers': 'Karriere',
    'nav.contact': 'Kontakt',
    'nav.logout': 'Abmelden',
    'nav.register': 'Registrieren',
    'card.addFavorite': 'Zur Merkliste hinzufügen',
    'card.removeFavorite': 'Von der Merkliste entfernen',
    'card.addCompare': 'Zum Vergleich hinzufügen',
    'card.removeCompare': 'Vom Vergleich entfernen',
    'card.compare': 'Vergleichen',
  },
  en: {
    'nav.vehicles': 'Vehicles',
    'nav.watchlist': 'Watchlist',
    'nav.compare': 'Compare',
    'nav.company': 'Company',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.logout': 'Log out',
    'nav.register': 'Register',
    'card.addFavorite': 'Add to watchlist',
    'card.removeFavorite': 'Remove from watchlist',
    'card.addCompare': 'Add to comparison',
    'card.removeCompare': 'Remove from comparison',
    'card.compare': 'Compare',
  },
  es: {
    'nav.vehicles': 'Vehículos',
    'nav.watchlist': 'Favoritos',
    'nav.compare': 'Comparar',
    'nav.company': 'Empresa',
    'nav.careers': 'Empleo',
    'nav.contact': 'Contacto',
    'nav.logout': 'Cerrar sesión',
    'nav.register': 'Registrarse',
    'card.addFavorite': 'Añadir a favoritos',
    'card.removeFavorite': 'Quitar de favoritos',
    'card.addCompare': 'Añadir a comparar',
    'card.removeCompare': 'Quitar de comparar',
    'card.compare': 'Comparar',
  },
} satisfies Record<Lang, Record<string, string>>

export type TranslationKey = keyof (typeof translations)['de']

// Backend enum values are stored in English (see types.ts). These map each value
// to its display label per language; the raw value is still used for any logic.
export const fuelLabels: Record<Lang, Record<Vehicle['fuelType'], string>> = {
  de: { Gasoline: 'Benzin', Diesel: 'Diesel', Hybrid: 'Hybrid', Electric: 'Elektro' },
  en: { Gasoline: 'Gasoline', Diesel: 'Diesel', Hybrid: 'Hybrid', Electric: 'Electric' },
  es: { Gasoline: 'Gasolina', Diesel: 'Diésel', Hybrid: 'Híbrido', Electric: 'Eléctrico' },
}

export const statusLabels: Record<Lang, Record<Vehicle['status'], string>> = {
  de: { Available: 'Verfügbar', Reserved: 'Reserviert', Sold: 'Verkauft' },
  en: { Available: 'Available', Reserved: 'Reserved', Sold: 'Sold' },
  es: { Available: 'Disponible', Reserved: 'Reservado', Sold: 'Vendido' },
}

export const categoryLabels: Record<Lang, Record<Vehicle['category'], string>> = {
  de: { New: 'Neu', Used: 'Gebraucht' },
  en: { New: 'New', Used: 'Used' },
  es: { New: 'Nuevo', Used: 'Usado' },
}

const priceLocale: Record<Lang, string> = { de: 'de-DE', en: 'en-US', es: 'es-ES' }

// The backend serializes the MySQL DECIMAL price as a string (e.g. "35000.00"),
// so coerce before formatting - String.toLocaleString would otherwise return it
// verbatim ("€35000.00"). Falls back to the raw value if it isn't a number.
export function formatPrice(price: number | string, lang: Lang): string {
  const n = typeof price === 'number' ? price : Number(price)
  if (Number.isNaN(n)) return String(price)
  return new Intl.NumberFormat(priceLocale[lang], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}
