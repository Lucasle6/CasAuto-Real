import { useNavigate } from 'react-router-dom'

const REVIEWS = [
  {
    name: 'Thomas M.',
    rating: 5,
    platform: 'Google',
    text: 'Sehr professioneller Service. Das Team hat mir geholfen, das perfekte Fahrzeug zu finden. Absolute Empfehlung!',
  },
  {
    name: 'Sarah K.',
    rating: 5,
    platform: 'AutoScout24',
    text: 'Tolle Auswahl und faire Preise. Der Kauf war unkompliziert und schnell abgewickelt. Sehr zufrieden!',
  },
  {
    name: 'Michael R.',
    rating: 4,
    platform: 'mobile.de',
    text: 'Gute Beratung und transparente Abwicklung. Würde jederzeit wieder hier kaufen.',
  },
]

export function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-red-800">CasAuto Real</h1>
        <nav className="flex gap-6">
          <button onClick={() => navigate('/fahrzeuge')} className="text-sm text-gray-500 hover:text-red-900 transition-colors">Fahrzeuge</button>
          <button onClick={() => navigate('/unternehmen')} className="text-sm text-gray-500 hover:text-red-900 transition-colors">Unternehmen</button>
          <button onClick={() => navigate('/karriere')} className="text-sm text-gray-500 hover:text-red-900 transition-colors">Karriere</button>
          <button onClick={() => navigate('/kontakt')} className="text-sm text-gray-500 hover:text-red-900 transition-colors">Kontakt</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gray-950 text-white px-8 py-32 text-center">
        <p className="text-red-500 text-sm uppercase tracking-widest mb-4">Berlin · Seit 2000</p>
        <h2 className="text-6xl font-bold mb-6">Ihr Fahrzeug.<br />Ihre Wahl.</h2>
        <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">Über 1.800 hochwertige Fahrzeuge aller führenden Hersteller — direkt aus Berlin.</p>
        <button
          onClick={() => navigate('/fahrzeuge')}
          className="bg-red-800 hover:bg-red-700 text-white px-8 py-3 rounded font-medium text-lg transition-colors"
        >
          Fahrzeuge entdecken
        </button>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-5xl font-bold text-red-800 mb-2">1.800+</p>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Fahrzeuge</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-red-800 mb-2">24+</p>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Jahre Erfahrung</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-red-800 mb-2">6x</p>
            <p className="text-gray-400 text-sm uppercase tracking-wider">AutoBild Award</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-2">Was unsere Kunden sagen</h3>
          <p className="text-gray-400 text-center mb-12">Tausende zufriedene Kunden auf allen Plattformen</p>
          <div className="grid grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.platform}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 px-8 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">CasAuto Real</h4>
            <p className="text-sm">Bessemerstraße 42A</p>
            <p className="text-sm">12103 Berlin</p>
          </div>
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Navigation</h4>
            <div className="space-y-2">
              <p onClick={() => navigate('/fahrzeuge')} className="text-sm cursor-pointer hover:text-white transition-colors">Fahrzeuge</p>
              <p onClick={() => navigate('/unternehmen')} className="text-sm cursor-pointer hover:text-white transition-colors">Unternehmen</p>
              <p onClick={() => navigate('/karriere')} className="text-sm cursor-pointer hover:text-white transition-colors">Karriere</p>
              <p onClick={() => navigate('/kontakt')} className="text-sm cursor-pointer hover:text-white transition-colors">Kontakt</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Kontakt</h4>
            <p className="text-sm">+49 30 800 935 833</p>
            <p className="text-sm">verkauf@autohaus-royal.de</p>
            <p className="text-sm mt-4">Mo–Fr: 09:00 – 19:00 Uhr</p>
            <p className="text-sm">Sa: 09:00 – 16:00 Uhr</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs">© 2026 CasAuto Real GmbH · Datenschutz · Impressum</p>
        </div>
      </footer>
    </div>
  )
}