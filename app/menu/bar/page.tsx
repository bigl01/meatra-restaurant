import { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Винная карта',
  description: 'Винная карта ресторана Meatra - большое разнообразие изысканных напитков',
};

export const revalidate = 3600;

export default async function BarMenuPage() {
  // TODO: Add API call when bar menu endpoint is ready
  const dishes: any[] = [];

  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px] w-full">
        {/* Hero Banner */}
        <section className="relative mx-4 my-6 rounded-[20px] overflow-hidden h-[318px] max-w-[1720px] mx-auto">
          <Image 
            src="/vine_card.svg" 
            alt="Винная карта" 
            fill 
            className="object-cover" 
          />
        </section>

        {/* Menu Content */}
        <section className="container-padding max-container py-8">
          <div className="bg-meatra-gray rounded-[20px] p-6">
            <div className="text-center py-12">
              <h2 className="text-meatra-gold text-[clamp(28px,4vw,42px)] font-bold uppercase mb-4">
                ВИННАЯ КАРТА
              </h2>
              <p className="text-gray-300 text-[16px] sm:text-[18px] mb-8 max-w-2xl mx-auto">
                Большое разнообразие изысканных напитков
              </p>
              <p className="text-gray-400 text-[16px]">
                Винная карта скоро будет доступна
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="bg-meatra-gray border-t border-gray-800 py-4 px-4 mt-8">
          <div className="max-w-[1720px] mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-4">
            <a href="/menu/main" className="text-white text-[14px] sm:text-[16px] hover:text-meatra-gold transition-colors duration-300">
              Основное меню
            </a>
            <a href="/menu/game" className="text-white text-[14px] sm:text-[16px] hover:text-meatra-gold transition-colors duration-300">
              Меню из дичи
            </a>
            <a href="/menu/bar" className="text-meatra-gold text-[14px] sm:text-[16px] font-medium">
              Винная карта
            </a>
          </div>
        </nav>
      </div>

      <Footer />
    </main>
  );
}
