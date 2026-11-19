import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLogin from '../../admin/pages/AdminLogin'
import AdminDashboard from '../../admin/pages/AdminDashboard'

export default function AdminLayout() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  )
}
