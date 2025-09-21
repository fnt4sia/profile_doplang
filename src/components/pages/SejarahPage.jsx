import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function SejarahPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Sejarah Dukuh Doplang</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Dukuh Doplang memiliki sejarah yang kaya dan mendalam, yang telah membentuk identitas 
              komunitas kami hingga hari ini. Didirikan pada [tahun], dukuh ini telah menjadi saksi 
              perkembangan dan perubahan yang signifikan di wilayah Kabupaten Klaten.
            </p>

            {/* Asal Usul Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Asal Usul Nama</h2>
              <p className="text-gray-600 mb-4">
                Nama "Doplang" berasal dari [penjelasan asal usul nama]. Menurut cerita turun-temurun,
                [cerita atau legenda terkait nama dukuh].
              </p>
            </section>

            {/* Perkembangan Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perkembangan Dukuh</h2>
              <p className="text-gray-600 mb-4">
                Sejak awal pendiriannya, Dukuh Doplang telah mengalami berbagai perkembangan signifikan:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Tahun [xxxx] - Pembangunan fasilitas pertama</li>
                <li>Tahun [xxxx] - Pengembangan infrastruktur</li>
                <li>Tahun [xxxx] - Modernisasi sistem pertanian</li>
                <li>Tahun [xxxx] - Peningkatan fasilitas pendidikan</li>
              </ul>
            </section>

            {/* Tokoh Penting Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tokoh-tokoh Penting</h2>
              <p className="text-gray-600 mb-4">
                Beberapa tokoh yang telah berkontribusi dalam pembangunan dan perkembangan Dukuh Doplang:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>[Nama Tokoh] - [Kontribusi/Peran]</li>
                <li>[Nama Tokoh] - [Kontribusi/Peran]</li>
                <li>[Nama Tokoh] - [Kontribusi/Peran]</li>
              </ul>
            </section>

            {/* Budaya dan Tradisi Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Budaya dan Tradisi</h2>
              <p className="text-gray-600">
                Dukuh Doplang kaya akan tradisi dan budaya yang masih dilestarikan hingga saat ini.
                Berbagai upacara adat dan kegiatan budaya rutin diselenggarakan untuk menjaga
                warisan leluhur dan memperkuat ikatan komunitas.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}