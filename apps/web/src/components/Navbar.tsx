import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
        <nav className="hidden md:flex gap-6">
          <button onClick={() => navigate('/fahrzeuge')} className={`text-sm transition-colors ${isActive('/fahrzeuge') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>Fahrzeuge</button>
          <button onClick={() => navigate('/unternehmen')} className={`text-sm transition-colors ${isActive('/unternehmen') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>Unternehmen</button>
          <button onClick={() => navigate('/karriere')} className={`text-sm transition-colors ${isActive('/karriere') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>Karriere</button>
          <button onClick={() => navigate('/kontakt')} className={`text-sm transition-colors ${isActive('/kontakt') ? 'text-red-800 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>Kontakt</button>
          <button onClick={() => navigate('/register')} className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors">Registrieren</button>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600 text-xl">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-gray-100 mt-4">
          <button onClick={() => { navigate('/fahrzeuge'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">Fahrzeuge</button>
          <button onClick={() => { navigate('/unternehmen'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">Unternehmen</button>
          <button onClick={() => { navigate('/karriere'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">Karriere</button>
          <button onClick={() => { navigate('/kontakt'); setMenuOpen(false) }} className="text-sm text-gray-500 hover:text-gray-900 text-left">Kontakt</button>
          <button onClick={() => navigate('/register')} className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors">Registrieren</button>
        </nav>
      )}
    </header>
  )
}