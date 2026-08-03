import { useAuthStore } from '../store/authStore'

// fetch() with the admin JWT attached, for the handful of admin-only requests
// (vehicle create/edit/delete, appointment list) now that the backend
// actually enforces auth on those instead of only hiding them client-side.
export function authFetch(path: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}
