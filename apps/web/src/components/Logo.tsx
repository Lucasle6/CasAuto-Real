// CasAuto Real logo, implemented from the brand handoff (Modernist design
// system). Colors, type and proportions are the handoff's exact tokens and are
// intentionally hardcoded here - the logo owns its brand values regardless of
// the surrounding UI palette.

const INK = '#201e1d' // frame on light backgrounds
const GROUND = '#f3f2f2' // frame + wordmark on dark/reversed
const ACCENT = '#ec3013' // centre point + separator rule, never changes
const ACCENT_700 = '#ae1800' // REAL tag on light ground
const ACCENT_300 = '#ffc4b8' // REAL tag on dark ground

type Variant = 'primary' | 'reversed' | 'stacked' | 'wordmark' | 'mark'

// Corner tick rectangles of the 64x64 authentication frame.
const TICKS: [number, number, number, number][] = [
  [6, 6, 18, 3], [6, 6, 3, 18], [40, 6, 18, 3], [55, 6, 3, 18],
  [6, 55, 18, 3], [6, 40, 3, 18], [40, 55, 18, 3], [55, 40, 3, 18],
]

function Mark({ frame, size }: { frame: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="block shrink-0" aria-hidden="true">
      {TICKS.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={frame} />
      ))}
      <rect x="29" y="29" width="6" height="6" fill={ACCENT} />
    </svg>
  )
}

function Wordmark({ nameColor, tagColor, nameSize }: { nameColor: string; tagColor: string; nameSize: number }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: Math.round(nameSize * 0.3),
        lineHeight: 1,
        fontFamily: '"Archivo", system-ui, sans-serif',
      }}
    >
      <span style={{ fontWeight: 800, fontSize: nameSize, letterSpacing: '-0.02em', color: nameColor }}>CasAuto</span>
      <span aria-hidden="true" style={{ width: 2, alignSelf: 'stretch', background: ACCENT }} />
      <span style={{ fontWeight: 700, fontSize: Math.round(nameSize * 0.4), letterSpacing: '0.16em', color: tagColor }}>
        REAL
      </span>
    </span>
  )
}

export function Logo({
  variant = 'primary',
  nameSize = 38,
  className,
}: {
  variant?: Variant
  nameSize?: number
  className?: string
}) {
  const reversed = variant === 'reversed'
  const frame = reversed ? GROUND : INK
  const nameColor = reversed ? GROUND : INK
  const tagColor = reversed ? ACCENT_300 : ACCENT_700
  const markSize = Math.round(nameSize * 1.45)

  const common = { role: 'img', 'aria-label': 'CasAuto Real', className } as const

  if (variant === 'mark') {
    return (
      <span {...common} style={{ display: 'inline-flex' }}>
        <Mark frame={frame} size={markSize} />
      </span>
    )
  }

  if (variant === 'wordmark') {
    return (
      <span {...common} style={{ display: 'inline-flex' }}>
        <Wordmark nameColor={nameColor} tagColor={tagColor} nameSize={nameSize} />
      </span>
    )
  }

  if (variant === 'stacked') {
    return (
      <span
        {...common}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: Math.round(nameSize * 0.3) }}
      >
        <Mark frame={frame} size={markSize} />
        <Wordmark nameColor={nameColor} tagColor={tagColor} nameSize={nameSize} />
      </span>
    )
  }

  // primary + reversed: horizontal lockup, flush left
  return (
    <span {...common} style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(nameSize * 0.42) }}>
      <Mark frame={frame} size={markSize} />
      <Wordmark nameColor={nameColor} tagColor={tagColor} nameSize={nameSize} />
    </span>
  )
}
