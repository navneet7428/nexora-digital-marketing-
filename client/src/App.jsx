import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Cursor   from './components/Cursor';
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import Services from './pages/Services';
import Process  from './pages/Process';
import Contact  from './pages/Contact';
import AdminLogin     from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function ProtectedRoute({ children }) {
  const { admin, checking } = useAuth();
  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--blue)', letterSpacing: '3px' }}>[ AUTHENTICATING... ]</p>
    </div>
  );
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Cursor />
      <ScrollToTop />
      <PublicLayout>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process"  element={<Process />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="*"     element={<Navigate to="/" replace />} />
        </Routes>
      </PublicLayout>
    </AuthProvider>
  );
}
