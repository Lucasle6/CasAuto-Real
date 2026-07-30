import { create } from 'zustand'

// Decodes the JWT payload (no verification - that's the backend's job) for the
// claims the UI needs: the admin role and the user's email. Same idea as
// ProtectedRoute's role check, centralized so the navbar can reuse it.
function readToken(token: string | null): { isAdmin: boolean; email: string | null } {
  if (!token) return { isAdmin: false, email: null }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return { isAdmin: payload.role === 'admin', email: payload.email ?? payload.sub ?? null }
  } catch {
    return { isAdmin: false, email: null }
  }
}

interface AuthStore {
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  userEmail: string | null
  login: (token: string) => void
  logout: () => void
}

const initialToken = localStorage.getItem('token')
const initialClaims = readToken(initialToken)

export const useAuthStore = create<AuthStore>((set) => ({
  token: initialToken,
  isAuthenticated: !!initialToken,
  isAdmin: initialClaims.isAdmin,
  userEmail: initialClaims.email,
  login: (token: string) => {
    localStorage.setItem('token', token)
    const claims = readToken(token)
    set({ token, isAuthenticated: true, isAdmin: claims.isAdmin, userEmail: claims.email })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false, isAdmin: false, userEmail: null })
  },
}))
