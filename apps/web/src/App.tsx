import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Catalog } from './pages/Catalog'
import { VehicleDetail } from './pages/VehicleDetail'
import { Dashboard } from './pages/admin/Dashboard'
import { VehicleForm } from './pages/admin/VehicleForm'
import { VehicleEdit } from './pages/admin/VehicleEdit'
import { Appointments } from './pages/admin/Appointments'
import { Landing } from './pages/Landing'
import { Kontakt } from './pages/Kontakt'
import { Unternehmen } from './pages/Unternehmen'
import { Karriere } from './pages/Karriere'
import { Login } from './pages/admin/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CustomCursor } from './components/CustomCursor'

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
)

function App() {
  const location = useLocation()

  return (
    <>
    <CustomCursor />
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/fahrzeuge" element={<PageWrapper><Catalog /></PageWrapper>} />
        <Route path="/vehicles/:id" element={<PageWrapper><VehicleDetail /></PageWrapper>} />
        <Route path="/kontakt" element={<PageWrapper><Kontakt /></PageWrapper>} />
        <Route path="/unternehmen" element={<PageWrapper><Unternehmen /></PageWrapper>} />
        <Route path="/karriere" element={<PageWrapper><Karriere /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/admin" element={<ProtectedRoute requireAdmin><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin/vehicles/new" element={<ProtectedRoute requireAdmin><PageWrapper><VehicleForm /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin/vehicles/:id/edit" element={<ProtectedRoute requireAdmin><PageWrapper><VehicleEdit /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute requireAdmin><PageWrapper><Appointments /></PageWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
    </>
  )
}

export default App