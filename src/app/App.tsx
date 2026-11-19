import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import DonationLayout from './layouts/DonationLayout'
import HomePage from '../public-site/home/HomePage'
import PlaceholderPage from '../components/shared/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<PlaceholderPage title="About the Corps" />} />
        <Route path="/history" element={<PlaceholderPage title="History & Heritage" />} />
        <Route path="/generations" element={<PlaceholderPage title="Generations" />} />
        <Route path="/leadership" element={<PlaceholderPage title="Leadership" />} />
        <Route path="/honours" element={<PlaceholderPage title="Hall of Honour" />} />
        <Route path="/gallery" element={<PlaceholderPage title="Gallery" />} />
        <Route path="/events" element={<PlaceholderPage title="Events & Activities" />} />
        <Route path="/memories" element={<PlaceholderPage title="Corps Memories" />} />
        <Route path="/archives" element={<PlaceholderPage title="Archives & Research" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact the Corps" />} />
      </Route>

      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/support/*" element={<DonationLayout />} />

      <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
    </Routes>
  )
}
