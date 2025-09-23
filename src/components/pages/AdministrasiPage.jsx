import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { supabase } from '../../lib/supabaseClient';

export default function AdministrasiPage() {
  const [loading, setLoading] = useState(true);
  const [strukturPemerintahan, setStrukturPemerintahan] = useState({
    kepalaDukuh: { title: 'Kepala Dukuh', name: 'Loading...' },
    levelDua: [],
    rukunTetangga: []
  });

  useEffect(() => {
    fetchOrganizationStructure();
  }, []);

  const fetchOrganizationStructure = async () => {
    try {
      const { data, error } = await supabase
        .from('organization_structure')
        .select('*')
        .order('level', { ascending: true })
        .order('order_number', { ascending: true });

      if (error) throw error;

      // Process the data into the structure we need
      const newStruct = {
        kepalaDukuh: { title: 'Kepala Dukuh', name: 'Loading...' },
        levelDua: [],
        rukunTetangga: []
      };

      data.forEach(item => {
        if (item.level === 1) {
          newStruct.kepalaDukuh = { title: item.position, name: item.name };
        } else if (item.level === 2) {
          newStruct.levelDua.push({ title: item.position, name: item.name });
        } else if (item.level === 3) {
          const rtNumber = item.position.match(/\d+/)[0];
          newStruct.rukunTetangga.push({ nomor: rtNumber, ketua: item.name });
        }
      });

      setStrukturPemerintahan(newStruct);
    } catch (error) {
      console.error('Error fetching organization structure:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Struktur Organisasi</h1>
            <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600">Dukuh Doplang Periode 2023-2026</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Kepala Dukuh - Top Level */}
              <section className="mb-24 relative">
                <div className="max-w-lg mx-auto relative">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-blue-50 transform -skew-y-3 rounded-3xl shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-200 text-center transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900 mt-4 mb-2">{strukturPemerintahan.kepalaDukuh.title}</h2>
                    <p className="text-xl text-blue-600 font-semibold">{strukturPemerintahan.kepalaDukuh.name}</p>
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="hidden lg:block absolute bottom-0 left-1/2 w-0.5 h-12 bg-blue-200 transform translate-y-full"></div>
              </section>

              {/* Level Dua - Second Layer */}
              <section className="mb-24 relative">
                <div className="hidden lg:block absolute top-0 left-1/2 w-[80%] h-0.5 bg-blue-200 transform -translate-x-1/2 -translate-y-12"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {strukturPemerintahan.levelDua.map((jabatan, index) => (
                    <div key={index} className="group">
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{jabatan.title}</h3>
                        <p className="text-blue-600 font-medium">{jabatan.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Rukun Tetangga - Bottom Layer */}
              <section>
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ketua Rukun Tetangga</h2>
                  <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {strukturPemerintahan.rukunTetangga.map((rt) => (
                    <div key={rt.nomor} className="transform transition-all duration-300 hover:-translate-y-2">
                      <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-100 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 transform translate-x-8 -translate-y-8 rotate-45"></div>
                        <div className="relative">
                          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-lg font-bold">{rt.nomor}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">RT {rt.nomor}</h3>
                          <p className="text-blue-600 font-medium">{rt.ketua}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}