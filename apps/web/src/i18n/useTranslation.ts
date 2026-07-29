import { useLanguageStore } from '../store/languageStore'
import {
  translations,
  formatPrice,
  type TranslationKey,
  type Lang,
} from './translations'

// Small hook mirroring the app's existing store usage. Returns the active
// language, a `t(key)` lookup (falling back to German, then the key itself),
// and a locale-aware price formatter bound to the current language.
export function useTranslation() {
  const lang = useLanguageStore((s) => s.lang)

  function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations.de[key] ?? key
  }

  function price(value: number | string): string {
    return formatPrice(value, lang)
  }

  return { t, price, lang: lang as Lang }
}
