import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

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
      <Navbar />
      {/* Hero */}
      <section className="bg-gray-950 text-white px-8 py-20 md:py-32 text-center">
        <p className="text-red-500 text-sm uppercase tracking-widest mb-4">Berlin · Seit 2000</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Ihr Fahrzeug.<br />Ihre Wahl.</h2>
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto">Über 1.800 hochwertige Fahrzeuge aller führenden Hersteller — direkt aus Berlin.</p>
        <button
          onClick={() => navigate('/fahrzeuge')}
          className="bg-red-800 hover:bg-red-700 text-white px-8 py-3 rounded font-medium text-lg transition-colors"
        >
          Fahrzeuge entdecken
        </button>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      
      
      
      {/*Footer*/}
      <Footer/>
      
    </div>
  )
}