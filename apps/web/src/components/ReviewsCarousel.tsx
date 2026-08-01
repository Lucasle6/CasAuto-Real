import { useTranslation } from '../i18n/useTranslation'
import type { TranslationKey } from '../i18n/translations'

// Customer testimonials. Names/platforms are literals (proper nouns); only the
// review body is translated. `photo` is a generic portrait from randomuser.me
// (free placeholder faces) so the cards read as real people; the silhouette
// stays underneath as a fallback if the service is unreachable.
const REVIEWS: { name: string; platform: string; rating: number; key: TranslationKey; photo: string }[] = [
  { name: 'Thomas M.', platform: 'Google', rating: 5, key: 'landing.review1', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sarah K.', platform: 'AutoScout24', rating: 5, key: 'landing.review2', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Michael R.', platform: 'mobile.de', rating: 4, key: 'landing.review3', photo: 'https://randomuser.me/api/portraits/men/54.jpg' },
  { name: 'Julia B.', platform: 'Google', rating: 5, key: 'landing.review4', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Daniel K.', platform: 'AutoScout24', rating: 5, key: 'landing.review5', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Anna S.', platform: 'Google', rating: 4, key: 'landing.review6', photo: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { name: 'Markus L.', platform: 'mobile.de', rating: 5, key: 'landing.review7', photo: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { name: 'Elena V.', platform: 'Google', rating: 5, key: 'landing.review8', photo: 'https://randomuser.me/api/portraits/women/9.jpg' },
]

// A generic portrait, with a person silhouette underneath as a graceful
// fallback if the photo can't load.
function Avatar({ src }: { src: string }) {
  return (
    <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden relative bg-gray-100">
      <svg viewBox="0 0 24 24" fill="currentColor" className="absolute inset-0 w-full h-full p-2 text-gray-300" aria-hidden="true">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
      </svg>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </div>
  )
}

export function ReviewsCarousel() {
  const { t } = useTranslation()

  // The strip auto-scrolls forever. Rendering the list twice and translating by
  // exactly -50% loops seamlessly (the second half is identical to the first).
  // Hovering the section pauses it; the clones are hidden from screen readers.
  const loop = [...REVIEWS, ...REVIEWS]

  return (
    <section className="group relative py-20 bg-gray-50 overflow-hidden">
      <style>{`
        @keyframes reviews-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-track { animation: none !important; }
        }
      `}</style>

      {/* Fade the strip out at both edges so cards look like they slide off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

      <div
        className="reviews-track flex w-max group-hover:[animation-play-state:paused]"
        style={{ animation: 'reviews-marquee 40s linear infinite' }}
      >
        {loop.map((r, i) => (
          <article
            key={i}
            aria-hidden={i >= REVIEWS.length}
            className="shrink-0 w-56 h-64 mr-4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={r.photo} />
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
          </article>
        ))}
      </div>
    </section>
  )
}
