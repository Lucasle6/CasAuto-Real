import { useNavigate } from 'react-router-dom'

export function Unternehmen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 onClick={() => navigate('/')} className="text-2xl font-bold tracking-widest uppercase text-red-800 cursor-pointer">CasAuto Real</h1>
        <nav className="flex gap-6">
          <button onClick={() => navigate('/fahrzeuge')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Fahrzeuge</button>
          <button onClick={() => navigate('/unternehmen')} className="text-sm text-red-800 font-medium">Unternehmen</button>
          <button onClick={() => navigate('/karriere')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Karriere</button>
          <button onClick={() => navigate('/kontakt')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Kontakt</button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Über uns</h2>
        <p className="text-red-800 text-lg mb-12">Ihr Partner für hochwertige Fahrzeuge seit 2000</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <div className="grid grid-cols-3 gap-6 py-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">1.800+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Fahrzeuge</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">24+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">6x</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">AutoBild Award</p>
            </div>
          </div>

          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
      </main>
    </div>
  )
}