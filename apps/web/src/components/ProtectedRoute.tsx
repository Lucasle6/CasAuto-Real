import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface Props {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { isAuthenticated, token } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  if (requireAdmin) {
    // Decodifica el token para ver el rol
    const payload = JSON.parse(atob(token!.split('.')[1]))
    if (payload.role !== 'admin') return <Navigate to="/" replace />
  }

  return children
}