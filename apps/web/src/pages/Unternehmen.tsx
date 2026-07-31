import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useTranslation } from '../i18n/useTranslation'
import { useVehicleCount } from '../hooks/useVehicleCount'

export function Unternehmen() {
  const { t } = useTranslation()
  const vehicleCount = useVehicleCount()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
        <p className="text-red-800 text-lg mb-12">{t('about.subtitle')}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">{vehicleCount === null ? '…' : vehicleCount}</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">{t('landing.statVehicles')}</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">24+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">{t('landing.statExperience')}</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-800 mb-2">6x</p>
              <p className="text-gray-500 text-sm uppercase tracking-wider">{t('landing.statAward')}</p>
            </div>
          </div>

          <p>{t('about.p3')}</p>
        </div>
      </main>

      <Footer />

    </div>
  )
}
