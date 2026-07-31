import useCanvasCursor from '../hooks/useCanvasCursor'

// Full-screen canvas overlay that draws the trailing cursor lines. It never
// captures pointer events, so it sits on top of the whole app while the real
// (native) cursor stays visible underneath - so you always know where you are.
export function CanvasCursor() {
  useCanvasCursor()
  return <canvas id="canvas" className="pointer-events-none fixed inset-0 z-[9998]" />
}
