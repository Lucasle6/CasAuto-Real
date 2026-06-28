import { useNavigate } from 'react-router-dom'

export function Karriere() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 onClick={() => navigate('/')} className="text-2xl font-bold tracking-widest uppercase text-red-800 cursor-pointer">CasAuto Real</h1>
        <nav className="flex gap-6">
          <button onClick={() => navigate('/fahrzeuge')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Fahrzeuge</button>
          <button onClick={() => navigate('/unternehmen')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Unternehmen</button>
          <button onClick={() => navigate('/karriere')} className="text-sm text-red-800 font-medium">Karriere</button>
          <button onClick={() => navigate('/kontakt')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Kontakt</button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Karriere & Jobs</h2>
        <p className="text-red-800 text-lg mb-12">Werden Sie Teil unseres Teams</p>

        <div className="space-y-6">
          {[
            { title: 'Verkaufsberater (m/w/d)', type: 'Vollzeit', location: 'Berlin' },
            { title: 'KFZ-Mechatroniker (m/w/d)', type: 'Vollzeit', location: 'Berlin' },
            { title: 'Sachbearbeiter Verwaltung (m/w/d)', type: 'Teilzeit', location: 'Schönefeld' },
            { title: 'Fahrzeugaufbereiter (m/w/d)', type: 'Vollzeit', location: 'Ludwigsfelde' },
          ].map((job, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex justify-between items-center hover:border-red-800 transition-colors">
              <div>
                <h3 className="text-gray-900 font-semibold mb-1">{job.title}</h3>
                <div className="flex gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">{job.type}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">{job.location}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/kontakt')}
                className="text-sm px-4 py-2 rounded-md border border-red-800 text-red-800 hover:bg-red-50 transition-colors"
              >
                Bewerben
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}