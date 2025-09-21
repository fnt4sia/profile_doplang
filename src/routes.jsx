import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import SejarahPage from './components/pages/SejarahPage';
import AdministrasiPage from './components/pages/AdministrasiPage';
import GalleryPage from './components/pages/GalleryPage';

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
]);