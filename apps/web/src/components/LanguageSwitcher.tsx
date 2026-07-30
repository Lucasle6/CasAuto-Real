import { useLanguageStore } from '../store/languageStore'
import { LANGUAGES } from '../i18n/translations'

// Compact DE / EN / ES switcher. The active language is highlighted; choosing
// one updates the store (and localStorage), re-rendering everything using useTranslation.
export function LanguageSwitcher() {
  const lang = useLanguageStore((s) => s.lang)
  const setLang = useLanguageStore((s) => s.setLang)

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Sprache / Language / Idioma">
      {LANGUAGES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="text-gray-300 mr-1 select-none">·</span>}
          <button
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`text-xs px-1 py-0.5 rounded transition-colors ${
              lang === code ? 'text-red-800 font-semibold' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  )
}
