import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function AdministrasiPage() {
  const strukturOrganisasi = [
    {
      title: 'Kepala Dukuh',
      name: '[Nama Kepala Dukuh]',
      periode: '2020 - 2025'
    },
    {
      title: 'Ketua RW',
      name: '[Nama Ketua RW]',
      periode: '2022 - 2025'
    }
  ];

  const dataRT = [
    {
      nomor: '01',
      ketua: '[Nama Ketua RT 01]',
      wilayah: '[Detail Wilayah RT 01]',
      jumlahKK: 45
    },
    {
      nomor: '02',
      ketua: '[Nama Ketua RT 02]',
      wilayah: '[Detail Wilayah RT 02]',
      jumlahKK: 38
    },
    {
      nomor: '03',
      ketua: '[Nama Ketua RT 03]',
      wilayah: '[Detail Wilayah RT 03]',
      jumlahKK: 42
    },
    {
      nomor: '04',
      ketua: '[Nama Ketua RT 04]',
      wilayah: '[Detail Wilayah RT 04]',
      jumlahKK: 40
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Administrasi Dukuh Doplang</h1>

          {/* Struktur Organisasi */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Struktur Organisasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strukturOrganisasi.map((jabatan, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{jabatan.title}</h3>
                  <p className="text-gray-600">{jabatan.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Periode: {jabatan.periode}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data RT */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Rukun Tetangga (RT)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataRT.map((rt) => (
                <div key={rt.nomor} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">RT {rt.nomor}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {rt.jumlahKK} KK
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-gray-700">Ketua:</span>{' '}
                      <span className="text-gray-600">{rt.ketua}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Wilayah:</span>{' '}
                      <span className="text-gray-600">{rt.wilayah}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Layanan Administrasi */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Layanan Administrasi</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Jam Pelayanan</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Senin - Jumat: 08.00 - 15.00 WIB</li>
                    <li>Sabtu: 08.00 - 12.00 WIB</li>
                    <li>Minggu & Hari Libur: Tutup</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Jenis Layanan</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Surat Pengantar KTP</li>
                    <li>Surat Pengantar KK</li>
                    <li>Surat Keterangan Domisili</li>
                    <li>Surat Keterangan Tidak Mampu</li>
                    <li>Dan lain-lain</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}