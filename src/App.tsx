import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SiteLayout from './app/SiteLayout'
import HomePage from './public-site/home/HomePage'
import PublicSectionPage from './public-site/pages/PublicSectionPage'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminGuard from './admin/components/AdminGuard'
import DonationPage from './donation-portal/pages/DonationPage'
import DonationResultPage from './donation-portal/pages/DonationResultPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":section" element={<PublicSectionPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<AdminGuard />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/donate" element={<DonationPage />} />
        <Route path="/donation/result" element={<DonationResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}
