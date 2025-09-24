import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Jelajahi',
      links: [
        { name: 'Beranda', href: '/' },
        { name: 'Sejarah', href: '/sejarah' },
        { name: 'Administrasi', href: '/administrasi' },
        { name: 'Galeri', href: '/galeri' },
      ],
    },
    {
      title: 'Informasi',
      links: [
        { name: 'Fasilitas', href: '#fasilitas' },
        { name: 'Kontak', href: '#hubungi' },
        { name: 'Lokasi', href: '#lokasi' },
      ],
    },
  ];

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Branding and Description */}
          <div className="lg:w-1/3">
            <div className="space-y-4 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold">DOPLANG</h3>
              <p className="text-blue-200 text-sm">
                Dukuh yang berada di Kabupaten Gunungkidul, DIY. 
                Membangun masyarakat yang sejahtera dan bermartabat.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:w-1/3 grid grid-cols-2 gap-8 lg:gap-16 lg:pl-16">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith('#') ? (
                        <a
                          href={link.href}
                          className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-blue-200">
              © {currentYear} Dukuh Doplang. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-sm text-blue-200 hover:text-white transition-colors duration-200">
                Kebijakan Privasi
              </a>
              <a href="#terms" className="text-sm text-blue-200 hover:text-white transition-colors duration-200">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}