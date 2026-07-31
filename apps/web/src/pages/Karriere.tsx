import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useTranslation } from '../i18n/useTranslation'

export function Karriere() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const jobs = [
    { title: t('careers.job1'), type: t('careers.fulltime'), location: 'Berlin' },
    { title: t('careers.job2'), type: t('careers.fulltime'), location: 'Berlin' },
    { title: t('careers.job3'), type: t('careers.parttime'), location: 'Schönefeld' },
    { title: t('careers.job4'), type: t('careers.fulltime'), location: 'Ludwigsfelde' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('careers.title')}</h2>
        <p className="text-red-800 text-lg mb-12">{t('careers.subtitle')}</p>

        <div className="space-y-6">
          {jobs.map((job, i) => (
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
                {t('careers.apply')}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />

    </div>
  )
}
