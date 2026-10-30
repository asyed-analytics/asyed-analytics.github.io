import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Contact } from './pages/Contact'
import { Events } from './pages/Events'
import { Home } from './pages/Home'
import { Cookies, FinancialProtection, Privacy, Terms } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { Travel } from './pages/Travel'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="travel" element={<Travel />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="financial-protection" element={<FinancialProtection />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
