import { useCursorEffectStore } from '../store/cursorEffectStore'
import { useTranslation } from '../i18n/useTranslation'

// Small on/off switch for the canvas cursor-trail effect (off by default -
// see cursorEffectStore.ts). Mirrors LanguageSwitcher's trigger styling so
// the two "display preference" controls read as a matching pair in the nav.
export function CursorEffectToggle() {
  const enabled = useCursorEffectStore(state => state.enabled)
  const toggle = useCursorEffectStore(state => state.toggle)
  const { t } = useTranslation()

  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={t('nav.cursorEffect')}
      title={t('nav.cursorEffect')}
      className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-colors ${
        enabled ? 'text-red-500' : 'text-gray-400 hover:text-white'
      }`}
    >
      <span aria-hidden="true">✨</span>
      <span
        className={`w-7 h-4 rounded-full relative transition-colors ${enabled ? 'bg-red-800' : 'bg-gray-700'}`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-3.5' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  )
}
