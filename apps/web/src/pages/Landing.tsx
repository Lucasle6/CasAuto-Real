import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Newsletter } from '../components/Newsletter'
import { motion } from 'framer-motion'
import { ParticleBackground } from '../components/ParticleBackground'

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
      <section className="relative overflow-hidden bg-gray-950 text-white px-8 py-20 md:py-32 text-center">
        <ParticleBackground />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-sm uppercase tracking-widest mb-4"
            >
              Berlin · Seit 2000
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Ihr Fahrzeug.<br />Ihre Wahl.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto"
            >
              Über 1.800 hochwertige Fahrzeuge aller führenden Hersteller — direkt aus Berlin.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/fahrzeuge')}
              className="bg-red-800 hover:bg-red-700 text-white px-8 py-3 rounded font-medium text-lg transition-colors"
            >
              Fahrzeuge entdecken
            </motion.button>
          </div>
        
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: '1.800+', label: 'Fahrzeuge' },
            { value: '24+', label: 'Jahre Erfahrung' },
            { value: '6x', label: 'AutoBild Award' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <p className="text-5xl font-bold text-red-800 mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-8 py-20 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-2">Newsletter</h3>
          <p className="text-gray-400 mb-8">Bleiben Sie über unsere neuesten Fahrzeuge und Angebote informiert.</p>
          <Newsletter />
        </div>
      </section>
      
      
      
      {/*Footer*/}
      <Footer/>
      
    </div>
  )
}