import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminNavbar from './admin/components/AdminNavbar'
import AdminSidebar from './admin/components/AdminSidebar'
import AdminDashboardPage from './admin/pages/AdminDashboardPage'
import AdminLoginPage from './admin/pages/AdminLoginPage'
import ManageBookingsPage from './admin/pages/ManageBookingsPage'
import ManageUsersPage from './admin/pages/ManageUsersPage'
import ManageVillasPage from './admin/pages/ManageVillasPage'
import ContactMessagesPage from './admin/pages/ContactMessagesPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import VillaDetailsPage from './pages/VillaDetailsPage'
import VillaListingPage from './pages/VillaListingPage'
import { isAdminAuthenticated } from './services/adminAuthService'

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col lg:flex-row">
        <AdminSidebar />
        <div className="flex-1">
          <AdminNavbar />
          <main className="p-5">{children}</main>
        </div>
      </div>
    </div>
  )
}

function ProtectedAdminRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/villas"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ManageVillasPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ManageBookingsPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ManageUsersPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/contact-messages"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ContactMessagesPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/villas"
          element={
            <AppLayout>
              <VillaListingPage />
            </AppLayout>
          }
        />
        <Route
          path="/villas/:villaId"
          element={
            <AppLayout>
              <VillaDetailsPage />
            </AppLayout>
          }
        />
        <Route
          path="/booking"
          element={
            <AppLayout>
              <BookingPage />
            </AppLayout>
          }
        />
        <Route
          path="/auth"
          element={
            <AppLayout>
              <AuthPage />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />
        <Route
          path="/about"
          element={
            <AppLayout>
              <AboutPage />
            </AppLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <AppLayout>
              <ContactPage />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
