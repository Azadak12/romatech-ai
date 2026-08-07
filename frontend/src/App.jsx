import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
