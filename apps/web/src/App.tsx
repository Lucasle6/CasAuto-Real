import { Routes, Route } from 'react-router-dom'
import { Catalog } from './pages/Catalog'
import { VehicleDetail } from './pages/VehicleDetail'
import { Dashboard } from './pages/admin/Dashboard'
import { VehicleForm } from './pages/admin/VehicleForm'
import { VehicleEdit } from './pages/admin/VehicleEdit'
import { Appointments } from './pages/admin/Appointments'
import { Kontakt } from './pages/Kontakt'
import { Unternehmen } from './pages/Unternehmen'
import { Karriere } from './pages/Karriere'
import { Landing } from './pages/Landing'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/admin/Login'
import { Register } from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/fahrzeuge" element={<Catalog />} />
      <Route path="/vehicles/:id" element={<VehicleDetail />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/unternehmen" element={<Unternehmen />} />
      <Route path="/karriere" element={<Karriere />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/vehicles/new" element={<ProtectedRoute requireAdmin><VehicleForm /></ProtectedRoute>} />
      <Route path="/admin/vehicles/:id/edit" element={<ProtectedRoute requireAdmin><VehicleEdit /></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute requireAdmin><Appointments /></ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App