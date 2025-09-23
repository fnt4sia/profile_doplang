import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Hero1 from '../../assets/Hero1.png';
import Hero2 from '../../assets/Hero2.png';
import Hero3 from '../../assets/Hero3.png';
import Hero4 from '../../assets/Hero4.png';
import { supabase } from '../../lib/supabaseClient';

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [statistics, setStatistics] = useState({
    totalPenduduk: 0,
    totalRW: 1,
    totalRT: 4,
    totalFasilitas: 0,
    totalMasjid: 0
  });
  const [loading, setLoading] = useState(true);
  const images = [Hero1, Hero2, Hero3, Hero4];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    fetchStatistics();
    return () => clearInterval(timer);
  }, []);

  const fetchStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('village_statistics')
        .select('total_population, total_rw, total_rt, total_facilities, total_mosques')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const latestStats = data[0];
        setStatistics({
          totalPenduduk: latestStats.total_population ?? 0,
          totalRW: latestStats.total_rw ?? 1,
          totalRT: latestStats.total_rt ?? 4,
          totalFasilitas: latestStats.total_facilities ?? 0,
          totalMasjid: latestStats.total_mosques ?? 0
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16">
        {/* Hero Section */}
        <div className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center pt-8 lg:pt-16 pb-4 lg:pb-8">
            {/* Image Section - Left */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full h-[300px] lg:h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-lg group">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                      ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img 
                      src={image}
                      alt={`Dukuh Doplang - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 
                        ${index === currentImageIndex 
                          ? 'bg-white w-4' 
                          : 'bg-white/50 hover:bg-white/75'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Navigation */}
                <button
                  onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Text Section - Right */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-[2.75rem] font-bold mb-6 text-blue-900">
                Selamat Datang di Dukuh Doplang
              </h1>
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
        <div className="py-4 lg:py-6 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 lg:mb-12">Statistik Dukuh Doplang</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto px-2 lg:px-4">
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
              <p className="text-3xl font-bold text-blue-600">{loading ? '...' : statistics.totalPenduduk}</p>
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
                  <p className="text-3xl font-bold text-blue-600">{loading ? '...' : statistics.totalRW}</p>
                  <p className="text-sm text-gray-500 mt-1">RW</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{loading ? '...' : statistics.totalRT}</p>
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
              <p className="text-3xl font-bold text-blue-600">{loading ? '...' : statistics.totalFasilitas}</p>
              <p className="text-sm text-gray-500 mt-1">Fasilitas Umum</p>
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
              <p className="text-3xl font-bold text-blue-600">{loading ? '...' : statistics.totalMasjid}</p>
              <p className="text-sm text-gray-500 mt-1">Tempat Ibadah</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="py-8 lg:py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
            {/* Text Content - Left */}
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Lokasi Dukuh Doplang</h2>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Dukuh Doplang terletak di wilayah Kalurahan Girikarto, Kecamatan Panggang, Kabupaten Gunungkidul, 
                Daerah Istimewa Yogyakarta. Dukuh ini berada di kawasan perbukitan karst Gunungkidul yang memiliki 
                karakteristik alam yang khas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Alamat Lengkap</h3>
                    <p className="text-gray-600">Dukuh Doplang, Kalurahan Girikarto, Kapanewon Panggang, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta, 55872</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Informasi Wilayah</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Terletak di wilayah Kalurahan Girikarto</li>
                      <li>• Bagian dari Kapanewon Panggang</li>
                      <li>• Ketinggian: ± 200-300 mdpl</li>
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
                    <h3 className="font-semibold text-gray-900">Akses dan Transportasi</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• ± 45 menit dari pusat Kota Wonosari</li>
                      <li>• Tersedia transportasi umum dari Terminal Dhaksinarga Wonosari</li>
                      <li>• Kondisi jalan: Beraspal baik</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container - Right */}
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15810.001857271781!2d110.61575695541992!3d-7.982777799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb355eb65b263%3A0x86c3eb686fcd2363!2sGirikarto%2C%20Panggang%2C%20Gunungkidul%20Regency%2C%20Special%20Region%20of%20Yogyakarta!5e0!3m2!1sen!2sid!4v1695459426447!5m2!1sen!2sid"
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