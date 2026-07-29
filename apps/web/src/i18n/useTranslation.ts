import { useLanguageStore } from '../store/languageStore'
import {
  translations,
  formatPrice,
  type TranslationKey,
  type Lang,
} from './translations'

type Vars = Record<string, string | number>

// Small hook mirroring the app's existing store usage. Returns the active
// language, a `t(key, vars?)` lookup (falling back to German, then the key
// itself, with {token} interpolation), and a locale-aware price formatter.
export function useTranslation() {
  const lang = useLanguageStore((s) => s.lang)

  function t(key: TranslationKey, vars?: Vars): string {
    let str = translations[lang][key] ?? translations.de[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      }
    }
    return str
  }

  function price(value: number | string): string {
    return formatPrice(value, lang)
  }

  return { t, price, lang: lang as Lang }
}
