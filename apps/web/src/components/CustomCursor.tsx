import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const frameRef = useRef<number>(0)
  const targetPos = useRef({ x: 0, y: 0 })
  const location = useLocation()

  useEffect(() => {
  if (location.pathname === '/fahrzeuge') {
    document.body.classList.remove('custom-cursor-active')
  } else {
    document.body.classList.add('custom-cursor-active')
  }
  return () => document.body.classList.remove('custom-cursor-active')
}, [location.pathname])


  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      targetPos.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      const isClickable = target.closest('button, a, [role="button"]')
      setIsHovering(!!isClickable)
    }

    function animate() {
      setPosition(targetPos.current)
      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

      if (location.pathname === '/fahrzeuge') return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block mix-blend-difference"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
      }}
    >
      <div
        className={`rounded-full border-2 border-white transition-all duration-150 ${
          isHovering ? 'w-10 h-10 bg-white/20' : 'w-6 h-6'
        }`}
      />
    </div>
  )
}