import { Routes, Route, Navigate } from 'react-router-dom'
import DonationPage from '../../donation-portal/pages/DonationPage'
import DonationResultPage from '../../donation-portal/pages/DonationResultPage'

export default function DonationLayout() {
  return (
    <Routes>
      <Route path="/" element={<DonationPage />} />
      <Route path="result" element={<DonationResultPage />} />
      <Route path="*" element={<Navigate to="/support" replace />} />
    </Routes>
  )
}
