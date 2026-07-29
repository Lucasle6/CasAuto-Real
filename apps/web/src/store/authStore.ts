import { create } from 'zustand'

// Reads the `role` claim out of the JWT payload. Same check ProtectedRoute does,
// centralized here so the navbar can show admin links without re-decoding.
function isAdminToken(token: string | null): boolean {
  if (!token) return false
  try {
    return JSON.parse(atob(token.split('.')[1])).role === 'admin'
  } catch {
    return false
  }
}

interface AuthStore {
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isAdmin: isAdminToken(localStorage.getItem('token')),
  login: (token: string) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: true, isAdmin: isAdminToken(token) })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false, isAdmin: false })
  },
}))
