import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import SejarahPage from './components/pages/SejarahPage';
import AdministrasiPage from './components/pages/AdministrasiPage';
import GalleryPage from './components/pages/GalleryPage';
import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/sejarah',
    element: <SejarahPage />,
  },
  {
    path: '/administrasi',
    element: <AdministrasiPage />,
  },
  {
    path: '/galeri',
    element: <GalleryPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
]);