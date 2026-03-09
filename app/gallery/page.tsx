import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Галерея',
  description: 'Фотографии ресторана Meatra - атмосфера и интерьер',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px] w-full">
        <section className="container-padding max-container py-16 md:py-24">
          <h1 className="section-title">Галерея</h1>
          <div className="text-center py-16">
            <p className="text-gray-400 text-[18px] mb-6">
              Галерея фотографий скоро появится
            </p>
            <p className="text-meatra-light-gray text-[14px]">
              Здесь будут фотографии интерьера, блюд и мероприятий ресторана
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
