import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useFavoritesStore } from '../store/favoritesStore'
import { useCompareStore } from '../store/compareStore'
import { useTranslation } from '../i18n/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'


export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { isAuthenticated, logout } = useAuthStore()
  const favoriteCount = useFavoritesStore(state => state.favoriteIds.length)
  const compareCount = useCompareStore(state => state.compareIds.length)

  function isActive(path: string) {
    return location.pathname === path
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1
          onClick={() => navigate('/')}
          className="text-2xl font-bold tracking-widest uppercase text-red-800 cursor-pointer select-none"
        >
          CasAuto Real
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <button onClick={() => navigate('/fahrzeuge')} className={`text-sm transition-colors ${isActive('/fahrzeuge') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>{t('nav.vehicles')}</button>
          <button onClick={() => navigate('/merkliste')} className={`text-sm transition-colors flex items-center gap-1.5 ${isActive('/merkliste') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>
            {t('nav.watchlist')}
            {favoriteCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
          <button onClick={() => navigate('/vergleich')} className={`text-sm transition-colors flex items-center gap-1.5 ${isActive('/vergleich') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>
            {t('nav.compare')}
            {compareCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
          <button onClick={() => navigate('/unternehmen')} className={`text-sm transition-colors ${isActive('/unternehmen') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>{t('nav.company')}</button>
          <button onClick={() => navigate('/karriere')} className={`text-sm transition-colors ${isActive('/karriere') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>{t('nav.careers')}</button>
          <button onClick={() => navigate('/kontakt')} className={`text-sm transition-colors ${isActive('/kontakt') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>{t('nav.contact')}</button>
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); navigate('/') }}
              className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors"
            >
              {t('nav.logout')}
            </button>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors"
            >
              {t('nav.register')}
            </button>
          )}
          <LanguageSwitcher />
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600 text-xl">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-gray-100 mt-4">
          <button onClick={() => { navigate('/fahrzeuge'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">{t('nav.vehicles')}</button>
          <button onClick={() => { navigate('/merkliste'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left flex items-center gap-1.5">
            {t('nav.watchlist')}
            {favoriteCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
          <button onClick={() => { navigate('/vergleich'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left flex items-center gap-1.5">
            {t('nav.compare')}
            {compareCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
          <button onClick={() => { navigate('/unternehmen'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">{t('nav.company')}</button>
          <button onClick={() => { navigate('/karriere'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">{t('nav.careers')}</button>
          <button onClick={() => { navigate('/kontakt'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">{t('nav.contact')}</button>
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); navigate('/') }}
              className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors"
            >
              {t('nav.logout')}
            </button>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors"
            >
              {t('nav.register')}
            </button>
          )}
          <div className="pt-1"><LanguageSwitcher /></div>
        </nav>
      )}
    </header>
  )
}
