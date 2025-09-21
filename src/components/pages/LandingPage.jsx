import React from "react";
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16">
        {/* Hero Section */}
        <div className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 pb-16">
            {/* Image Section - Left */}
            <div className="order-2 lg:order-1">
              <div className="w-full h-[400px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                {/* Placeholder for image - replace src with your actual village image */}
                <img 
                  src="/placeholder-village.jpg" 
                  alt="Dukuh Doplang"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Section - Right */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-[2.75rem] font-bold mb-6 text-blue-900">Selamat Datang di Dukuh Doplang</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Jelajahi keindahan, budaya, dan komunitas Dukuh Doplang. Temukan sejarah kami, bertemu dengan masyarakat kami, dan lihat apa yang membuat desa kami unik.
              </p>
              <a 
                href="#about" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
              >
                Pelajari Lebih Lanjut Tentang Dukuh Doplang
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="py-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Statistik Dukuh Doplang</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {/* Card 1 - Total Penduduk */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Penduduk</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-gray-500 mt-1">Total Penduduk</p>
            </div>

            {/* Card 2 - Rukun Warga */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">RW & RT</h3>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-3xl font-bold text-blue-600">1</p>
                  <p className="text-sm text-gray-500 mt-1">RW</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">4</p>
                  <p className="text-sm text-gray-500 mt-1">RT</p>
                </div>
              </div>
            </div>

            {/* Card 3 - Fasilitas */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Fasilitas</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">1</p>
              <p className="text-sm text-gray-500 mt-1">Lapangan Voli</p>
            </div>

            {/* Card 4 - Masjid */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Masjid</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-500 mt-1">Tempat Ibadah</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Text Content - Left */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Lokasi Dukuh Doplang</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Dukuh Doplang terletak di wilayah strategis Kabupaten Klaten, Jawa Tengah. Dengan akses yang mudah 
                dan lokasi yang nyaman, dukuh kami dapat dicapai melalui beberapa rute utama.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Alamat</h3>
                    <p className="text-gray-600">Dukuh Doplang, Desa [Nama Desa], Kecamatan [Nama Kecamatan], Kabupaten Klaten, Jawa Tengah</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Batas Wilayah</h3>
                    <ul className="text-gray-600 list-disc list-inside ml-2 space-y-1">
                      <li>Utara: [Nama Wilayah]</li>
                      <li>Selatan: [Nama Wilayah]</li>
                      <li>Timur: [Nama Wilayah]</li>
                      <li>Barat: [Nama Wilayah]</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Akses</h3>
                    <p className="text-gray-600">Dapat diakses melalui [detail rute atau jalan utama terdekat]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container - Right */}
            <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              {/* You can replace this with your actual map implementation (Google Maps, OpenStreetMap, etc.) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=..." // Add your Google Maps embed URL here
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}