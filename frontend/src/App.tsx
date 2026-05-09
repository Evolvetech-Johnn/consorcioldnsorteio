import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { RaffleFormPage } from './pages/RaffleFormPage'
import { LoginPage } from './pages/admin/LoginPage'
import { DashboardLayout } from './layouts/DashboardLayout'
import { DashboardOverview } from './pages/admin/DashboardOverview'
import { LeadsPage } from './pages/admin/LeadsPage'
import { CampaignsPage } from './pages/admin/CampaignsPage'
import { RafflePage } from './pages/admin/RafflePage'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/participar" element={<RaffleFormPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="raffles" element={<RafflePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
