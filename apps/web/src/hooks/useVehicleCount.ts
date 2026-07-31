import { useEffect, useState } from 'react'

// Live count of vehicles in stock, used wherever marketing copy claims a
// number (landing hero/stats, about page) so it can't drift out of sync
// with what's actually in the database.
export function useVehicleCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(res => res.json())
      .then((data: unknown[]) => setCount(data.length))
  }, [])

  return count
}
