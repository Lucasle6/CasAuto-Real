import { useEffect, useRef, useState } from 'react'
import { useLanguageStore } from '../store/languageStore'
import { LANGUAGES, type Lang } from '../i18n/translations'

// Flag per language. EN uses the UK flag; DE and ES their own.
const FLAGS: Record<Lang, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  es: '🇪🇸',
}

// Compact language switcher: a single trigger showing the current flag + code
// that opens a small dropdown of the three options. Choosing one updates the
// store (and localStorage), re-rendering everything using useTranslation.
export function LanguageSwitcher() {
  const lang = useLanguageStore((s) => s.lang)
  const setLang = useLanguageStore((s) => s.setLang)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking anywhere outside the switcher.
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sprache / Language / Idioma"
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
      >
        <span aria-hidden="true">{FLAGS[current.code]}</span>
        <span className="font-medium">{current.label}</span>
        <span aria-hidden="true" className={`text-[10px] transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1 w-32 py-1 z-50 bg-white rounded-md shadow-lg border border-gray-200"
        >
          {LANGUAGES.map(({ code, label }) => (
            <li key={code}>
              <button
                role="option"
                aria-selected={lang === code}
                onClick={() => {
                  setLang(code)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left transition-colors ${
                  lang === code ? 'text-red-800 font-semibold bg-red-50' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span aria-hidden="true">{FLAGS[code]}</span>
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
