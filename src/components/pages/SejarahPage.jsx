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
            {/* Pengantar */}
            <p className="text-gray-600 mb-6">
              Dukuh Doplang memiliki sejarah lisan yang kuat dan menjadi bagian penting dari
              identitas masyarakat setempat. Cerita turun-temurun menyebutkan bahwa kawasan ini
              dahulu bernama <span className="font-semibold">Ngenthak</span> dan kemudian dikenal
              sebagai <span className="font-semibold">Doplang</span> setelah sebuah peristiwa
              terkait perjalanan Sunan Kalijaga.
            </p>

            {/* Asal Usul Nama */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Asal Usul Nama “Doplang”</h2>
              <p className="text-gray-600 mb-4">
                Menurut tradisi lisan yang dihimpun dari <span className="font-semibold">Karyanta</span>,
                dahulu Sunan Kalijaga melakukan perjalanan dan singgah di Ngenthak. Kedatangan beliau
                disambut baik oleh para santri/murid. Seusai makan siang, mereka beristirahat di tempat
                teduh lalu <em>ndepaplang</em>/<em>ndhaplang</em> (merentangkan tangan) untuk{' '}
                <em>ngendoke</em> (mengendurkan otot). Dari kebiasaan istirah itu kemudian lahir sebutan
                <span className="font-semibold"> “Doplang”</span>: “<span className="font-semibold">Do</span>”
                berasal dari kata <em>ngendoke</em>, dan “<span className="font-semibold">Plang</span>”
                dari kata <em>ndepaplang</em>/<em>ndhaplang</em>. Seiring waktu, nama tersebut melekat dan
                Ngenthak lebih dikenal sebagai Doplang.
              </p>
            </section>

            {/* Jejak Sunan Kalijaga */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Jejak Sunan Kalijaga</h2>
              <p className="text-gray-600">
                Kisah perubahan nama ini terkait erat dengan figur Sunan Kalijaga—salah satu tokoh
                Wali Songo yang terkenal menggunakan kesenian tradisional seperti wayang dan gamelan
                dalam dakwahnya. Bagi warga, singgahnya beliau di kawasan ini menjadi penanda historis
                sekaligus spiritual yang diceritakan lintas generasi sebagai asal-usul nama Doplang.
              </p>
            </section>

            {/* Perkembangan Dukuh */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perkembangan Dukuh</h2>
              <p className="text-gray-600 mb-4">
                Setelah nama Doplang dikenal, wilayah ini berkembang mengikuti kebutuhan warganya.
                Tahap-tahap penting diingat masyarakat berupa:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Penguatan permukiman dan penggarapan lahan pertanian.</li>
                <li>Perbaikan infrastruktur dasar (jalan lingkungan, sarana air, dan fasilitas umum).</li>
                <li>Peningkatan layanan sosial—pendidikan, keagamaan, dan kegiatan kemasyarakatan.</li>
              </ul>
            </section>

            {/* Budaya dan Tradisi */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Budaya dan Tradisi</h2>
              <p className="text-gray-600">
                Tradisi gotong royong, pengajian, serta perayaan hari-hari besar keagamaan dan adat
                tetap dirawat sebagai pengikat kebersamaan warga. Cerita asal-usul nama Doplang
                juga kerap dituturkan kembali pada kegiatan-kegiatan komunal sebagai pengingat
                jati diri dan rasa memiliki terhadap dukuh.
              </p>
            </section>

            {/* Sumber & Catatan */}
            <section className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sumber &amp; Catatan</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>
                  Tradisi lisan masyarakat Doplang; dihimpun dari <span className="font-semibold">Karyanta</span>.
                </li>
                <li className="text-sm text-gray-500">
                  Catatan: Di Jawa Tengah/Jawa ada beberapa wilayah bernama “Doplang” dengan sejarah
                  berbeda. Penulisan ini merujuk pada tradisi lisan Doplang setempat.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
