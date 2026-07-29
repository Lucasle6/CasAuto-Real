import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'

export function Footer() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <footer className="mt-auto bg-gray-950 text-gray-400 px-8 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">CasAuto Real</h4>
          <p className="text-sm">Bessemerstraße 42A</p>
          <p className="text-sm">12103 Berlin</p>
        </div>
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">{t('footer.navigation')}</h4>
          <div className="space-y-2">
            <p onClick={() => navigate('/fahrzeuge')} className="text-sm cursor-pointer hover:text-white transition-colors">{t('nav.vehicles')}</p>
            <p onClick={() => navigate('/unternehmen')} className="text-sm cursor-pointer hover:text-white transition-colors">{t('nav.company')}</p>
            <p onClick={() => navigate('/karriere')} className="text-sm cursor-pointer hover:text-white transition-colors">{t('nav.careers')}</p>
            <p onClick={() => navigate('/kontakt')} className="text-sm cursor-pointer hover:text-white transition-colors">{t('nav.contact')}</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-4">{t('nav.contact')}</h4>
          <p className="text-sm">+49 30 800 935 833</p>
          <p className="text-sm">verkauf@autohaus-royal.de</p>
          <p className="text-sm mt-4">{t('footer.hoursWeek')}</p>
          <p className="text-sm">{t('footer.hoursSat')}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-xs">{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
