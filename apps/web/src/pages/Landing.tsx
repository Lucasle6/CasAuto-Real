import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Newsletter } from '../components/Newsletter'
import { motion } from 'framer-motion'
import { ParticleBackground } from '../components/ParticleBackground'
import { useTranslation } from '../i18n/useTranslation'
import { useVehicleCount } from '../hooks/useVehicleCount'

// Black Mercedes-Benz C350 AVANTGARDE, CC BY-SA 4.0 (Wikimedia Commons):
// https://commons.wikimedia.org/wiki/File:Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG
const HERO_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG/1280px-Mercedes-Benz_C350_AVANTGARDE_(W204)_front.JPG'

export function Landing() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const vehicleCount = useVehicleCount()

  const reviews = [
    { name: 'Thomas M.', rating: 5, platform: 'Google', text: t('landing.review1') },
    { name: 'Sarah K.', rating: 5, platform: 'AutoScout24', text: t('landing.review2') },
    { name: 'Michael R.', rating: 4, platform: 'mobile.de', text: t('landing.review3') },
  ]

  const stats = [
    { value: vehicleCount === null ? '…' : String(vehicleCount), label: t('landing.statVehicles') },
    { value: '24+', label: t('landing.statExperience') },
    { value: '6x', label: t('landing.statAward') },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 text-white px-8 py-20 md:py-32 text-center">
        <div className="absolute inset-0">
          <img
            src={HERO_PHOTO}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover grayscale brightness-[0.45] contrast-125"
          />
          <div className="absolute inset-0 bg-linear-to-b from-gray-950/60 via-transparent to-gray-950" />
        </div>
        <ParticleBackground />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-sm uppercase tracking-widest mb-4"
            >
              {t('landing.heroEyebrow')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t('landing.heroTitle1')}<br />{t('landing.heroTitle2')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto"
            >
              {t('landing.heroSubtitle')}
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
              {t('landing.heroCta')}
            </motion.button>
          </div>

      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
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
          {reviews.map((r, i) => (
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
          <h3 className="text-3xl font-bold mb-2">{t('landing.newsletterTitle')}</h3>
          <p className="text-gray-400 mb-8">{t('landing.newsletterSubtitle')}</p>
          <Newsletter />
        </div>
      </section>

      {/*Footer*/}
      <Footer/>

    </div>
  )
}
