import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function GalleryPage() {
  // Sample gallery data - replace with actual images and descriptions
  const galleryItems = [
    {
      id: 1,
      title: 'Kegiatan Gotong Royong',
      category: 'Kegiatan Warga',
      imageUrl: '/images/gotong-royong.jpg',
      description: 'Warga bergotong royong membersihkan lingkungan dukuh'
    },
    {
      id: 2,
      title: 'Perayaan HUT RI',
      category: 'Acara',
      imageUrl: '/images/hut-ri.jpg',
      description: 'Perayaan HUT RI ke-80 di Dukuh Doplang'
    },
    // Add more gallery items here
  ];

  const categories = ['Semua', 'Kegiatan Warga', 'Acara', 'Fasilitas', 'Infrastruktur'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Galeri Dukuh Doplang</h1>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium 
                    ${index === 0 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  {/* Replace with actual image */}
                  <div className="w-full h-48 bg-gray-200"></div>
                </div>
                <div className="p-4">
                  <span className="text-sm text-blue-600 font-medium">{item.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {galleryItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400">
                <svg 
                  className="mx-auto h-12 w-12"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada foto</h3>
                <p className="mt-1 text-sm text-gray-500">Foto akan ditambahkan segera.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}