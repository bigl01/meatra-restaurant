import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProducts } from '../lib/wordpress-api';
import ProductCarousel from './ProductCarousel';

export const metadata: Metadata = {
  title: 'Меню',
  description: 'Меню ресторана Meatra - специальные предложения, основные блюда и напитки',
};

export const revalidate = 3600; // Revalidate every hour

export default async function MenuPage() {
  // Fetch all products
  const allProducts = await getProducts({ perPage: 100 });
  
  // Filter products by type
  const specialOffers = allProducts.filter(p => p.type === 'special');
  const popularDishes = allProducts.filter(p => p.type === 'dish');
  const popularDrinks = allProducts.filter(p => p.type === 'drink');

  return (
    <main className="min-h-screen bg-meatra-dark text-white">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px]">
        {/* Hero Banner */}
        <section className="relative mx-4 my-6 rounded-[20px] overflow-hidden h-[318px]">
          <Image 
            src="/main_page_menu.jpg" 
            alt="Меню Meatra" 
            fill 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-white uppercase text-[clamp(40px,7vw,72px)] font-bold text-center">
              МЕНЮ
            </h1>
          </div>
        </section>

        {/* Special Offers */}
        {specialOffers.length > 0 && (
          <section className="py-8">
            <ProductCarousel 
              products={specialOffers}
              title="СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ"
            />
          </section>
        )}

        {/* Main Menu Card */}
        <section className="mx-4 my-6 relative rounded-[20px] overflow-hidden h-[318px]">
          <Image 
            src="/main_menu.png" 
            alt="Основное меню" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 flex flex-col justify-between items-start p-5 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-[clamp(16px,2vw,20px)]">
              Классические блюда, каждый найдет то, что ему по душе
            </p>
            <Link href="/menu/main">
              <button className="text-white rounded-[6px] backdrop-blur-[5px] bg-white/20 hover:bg-white/30 transition flex items-center justify-center px-6 py-2">
                Подробнее
              </button>
            </Link>
          </div>
        </section>

        {/* Popular Dishes */}
        {popularDishes.length > 0 && (
          <section className="py-8">
            <ProductCarousel 
              products={popularDishes}
              title="ПОПУЛЯРНЫЕ БЛЮДА"
            />
          </section>
        )}

        {/* Hunter Menu Card */}
        <section className="mx-4 my-6 relative rounded-[20px] overflow-hidden h-[318px]">
          <Image 
            src="/menu_hunter.svg" 
            alt="Меню из дичи" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 flex flex-col justify-between items-start p-5 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-[clamp(16px,2vw,20px)]">
              Почувствуйте вкус дикой природы. Для настоящих гурманов
            </p>
            <Link href="/menu/game">
              <button className="text-white rounded-[6px] backdrop-blur-[5px] bg-white/20 hover:bg-white/30 transition flex items-center justify-center px-6 py-2">
                Подробнее
              </button>
            </Link>
          </div>
        </section>

        {/* Popular Drinks */}
        {popularDrinks.length > 0 && (
          <section className="py-8">
            <ProductCarousel 
              products={popularDrinks}
              title="ПОПУЛЯРНЫЕ НАПИТКИ"
            />
          </section>
        )}

        {/* Wine Card */}
        <section className="mx-4 my-6 relative rounded-[20px] overflow-hidden h-[318px]">
          <Image 
            src="/vine_card.svg" 
            alt="Винная карта" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 flex flex-col justify-between items-start p-5 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-[clamp(16px,2vw,20px)]">
              Большое разнообразие изысканных напитков
            </p>
            <Link href="/menu/bar">
              <button className="text-white rounded-[6px] backdrop-blur-[5px] bg-white/20 hover:bg-white/30 transition flex items-center justify-center px-6 py-2">
                Подробнее
              </button>
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
