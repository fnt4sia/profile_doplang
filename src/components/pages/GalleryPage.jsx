import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { supabase } from '../../lib/supabaseClient';

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: qErr } = await supabase
        .from('gallery_items')
        .select('id, title, description, image_url, created_at') // no category
        .order('created_at', { ascending: false });

      if (qErr) throw qErr;
      setGalleryItems(data || []);
    } catch (err) {
      console.error('Error fetching gallery items:', err);
      setError(err?.message || 'Gagal memuat galeri. Coba muat ulang.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Galeri Dukuh Doplang</h1>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : (
            <>
              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="w-full h-48 bg-gray-100">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title || 'Galeri'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-gray-400"
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
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title || 'Tanpa Judul'}
                      </h3>
                      {item.created_at && (
                        <p className="text-gray-500 text-sm mt-1">
                          {formatDate(item.created_at)}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                          {item.description}
                        </p>
                      )}
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
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
