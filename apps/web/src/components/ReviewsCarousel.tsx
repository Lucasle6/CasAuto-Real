import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../i18n/useTranslation'
import type { TranslationKey } from '../i18n/translations'

// Customer testimonials. Names/platforms are literals (proper nouns); only the
// review body is translated, keyed into the dictionary.
const REVIEWS: { name: string; platform: string; rating: number; key: TranslationKey }[] = [
  { name: 'Thomas M.', platform: 'Google', rating: 5, key: 'landing.review1' },
  { name: 'Sarah K.', platform: 'AutoScout24', rating: 5, key: 'landing.review2' },
  { name: 'Michael R.', platform: 'mobile.de', rating: 4, key: 'landing.review3' },
  { name: 'Julia B.', platform: 'Google', rating: 5, key: 'landing.review4' },
  { name: 'Daniel K.', platform: 'AutoScout24', rating: 5, key: 'landing.review5' },
  { name: 'Anna S.', platform: 'Google', rating: 4, key: 'landing.review6' },
  { name: 'Markus L.', platform: 'mobile.de', rating: 5, key: 'landing.review7' },
  { name: 'Elena V.', platform: 'Google', rating: 5, key: 'landing.review8' },
]

// Soft tints so the generic avatars still feel like different people.
const AVATAR_BG = [
  'bg-red-100 text-red-400',
  'bg-blue-100 text-blue-400',
  'bg-emerald-100 text-emerald-400',
  'bg-amber-100 text-amber-400',
  'bg-purple-100 text-purple-400',
  'bg-teal-100 text-teal-400',
]

// A generic person silhouette - no real photos, no external requests.
function Avatar({ i }: { i: number }) {
  return (
    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${AVATAR_BG[i % AVATAR_BG.length]}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
      </svg>
    </div>
  )
}

export function ReviewsCarousel() {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)

  // Nudge the strip by most of a viewport-width of cards, letting scroll-snap
  // settle it onto a card edge.
  function scrollByCards(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="relative px-8 py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto relative">
        {/* Prev / next controls, hidden on touch-first small screens where the
            strip is simply swiped. */}
        <button
          onClick={() => scrollByCards(-1)}
          aria-label={t('reviews.prev')}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-red-800 hover:border-red-800 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={() => scrollByCards(1)}
          aria-label={t('reviews.next')}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 hover:text-red-800 hover:border-red-800 transition-colors"
        >
          ›
        </button>

        {/* Fade the strip out at both edges so cards look like they slide off. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.key}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="snap-start shrink-0 w-56 h-64 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar i={i} />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.platform}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3" aria-label={`${r.rating}/5`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j < r.rating ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">{t(r.key)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
