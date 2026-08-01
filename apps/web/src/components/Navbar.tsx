import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useFavoritesStore } from '../store/favoritesStore'
import { useCompareStore } from '../store/compareStore'
import { useTranslation } from '../i18n/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'


export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { isAuthenticated, isAdmin, userEmail, logout } = useAuthStore()
  const favoriteCount = useFavoritesStore(state => state.favoriteIds.length)
  const compareCount = useCompareStore(state => state.compareIds.length)

  function isActive(path: string) {
    return location.pathname === path
  }

  const linkClass = (path: string) =>
    `text-sm transition-colors ${isActive(path) ? 'text-red-500 font-medium' : 'text-gray-400 hover:text-white'}`

  // Admins get quick links back to the admin panel (which otherwise has no entry
  // point from the public site); everyone else gets the marketing pages.
  function go(path: string) {
    navigate(path)
    setMenuOpen(false)
  }

  const secondaryLinks = isAdmin
    ? [
        { path: '/admin', label: t('nav.dashboard') },
        { path: '/admin/appointments', label: t('nav.appointments') },
      ]
    : [
        { path: '/unternehmen', label: t('nav.company') },
        { path: '/karriere', label: t('nav.careers') },
        { path: '/kontakt', label: t('nav.contact') },
      ]

  const authButton = isAuthenticated ? (
    // On desktop the email is absolutely positioned above the button so it never
    // pushes the logout button out of line; on mobile it just stacks above it.
    <div className="relative flex flex-col items-start gap-1 md:block md:gap-0">
      <span className="text-[11px] leading-none text-gray-500 whitespace-nowrap md:absolute md:bottom-full md:right-0 md:mb-1">
        {t('nav.loggedInAs')} <span className="text-gray-300 font-medium">{userEmail}</span>
      </span>
      <button
        onClick={() => { logout(); go('/') }}
        className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-500 hover:bg-red-950 transition-colors"
      >
        {t('nav.logout')}
      </button>
    </div>
  ) : (
    <button
      onClick={() => go('/register')}
      className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-500 hover:bg-red-950 transition-colors"
    >
      {t('nav.register')}
    </button>
  )

  return (
    <header className="bg-gray-950 border-b border-gray-800 px-8 py-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          aria-label="CasAuto Real, zur Startseite"
          className="cursor-pointer select-none bg-transparent border-0 p-0"
        >
          <Logo variant="reversed" nameSize={22} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <button onClick={() => go('/fahrzeuge')} className={linkClass('/fahrzeuge')}>{t('nav.vehicles')}</button>
          <button onClick={() => go('/merkliste')} className={`${linkClass('/merkliste')} flex items-center gap-1.5`}>
            {t('nav.watchlist')}
            {favoriteCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
          <button onClick={() => go('/vergleich')} className={`${linkClass('/vergleich')} flex items-center gap-1.5`}>
            {t('nav.compare')}
            {compareCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
          {secondaryLinks.map(link => (
            <button key={link.path} onClick={() => go(link.path)} className={linkClass(link.path)}>{link.label}</button>
          ))}
          {authButton}
          <LanguageSwitcher />
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-300 text-xl">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-gray-800 mt-4">
          <button onClick={() => go('/fahrzeuge')} className="text-sm text-gray-400 hover:text-white text-left">{t('nav.vehicles')}</button>
          <button onClick={() => go('/merkliste')} className="text-sm text-gray-400 hover:text-white text-left flex items-center gap-1.5">
            {t('nav.watchlist')}
            {favoriteCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
          <button onClick={() => go('/vergleich')} className="text-sm text-gray-400 hover:text-white text-left flex items-center gap-1.5">
            {t('nav.compare')}
            {compareCount > 0 && (
              <span className="bg-red-800 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
          {secondaryLinks.map(link => (
            <button key={link.path} onClick={() => go(link.path)} className="text-sm text-gray-400 hover:text-white text-left">{link.label}</button>
          ))}
          {authButton}
          <div className="pt-1"><LanguageSwitcher /></div>
        </nav>
      )}
    </header>
  )
}
