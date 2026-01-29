import { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getMainMenu } from '../../lib/wordpress-api';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Основное меню',
  description: 'Основное меню ресторана Meatra - классические блюда на любой вкус',
};

export const revalidate = 3600;

export default async function MainMenuPage() {
  const dishes = await getMainMenu();

  // Group dishes by category
  const dishesByCategory = dishes.reduce((acc: Record<string, typeof dishes>, dish) => {
    const category = dish.category || 'Прочее';
    if (!acc[category]) acc[category] = [];
    acc[category].push(dish);
    return acc;
  }, {});

  const categories = Object.keys(dishesByCategory);

  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px] w-full">
        {/* Hero Banner */}
        <section className="relative mx-4 my-6 rounded-[20px] overflow-hidden h-[318px] max-w-[1720px] mx-auto">
          <Image 
            src="/main_menu_foto.jpg" 
            alt="Основное меню" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-white uppercase text-[clamp(40px,7vw,56px)] font-bold text-center">
              ОСНОВНОЕ
              <br />
              МЕНЮ
            </h1>
          </div>
        </section>

        {/* Menu Content */}
        <section className="container-padding max-container py-8">
          <div className="bg-meatra-gray rounded-[20px] p-6">
            {categories.length > 0 ? (
              <div className="flex flex-col gap-12">
                {categories.map((category) => (
                  <div key={category} className="flex flex-col gap-6">
                    <h2 className="text-meatra-gold text-[clamp(24px,4vw,32px)] font-bold uppercase">
                      {category}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {dishesByCategory[category].map((dish) => (
                        <div 
                          key={dish.id}
                          className="flex justify-between items-start gap-4 pb-4 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex-1">
                            <h3 className="text-white text-[16px] sm:text-[18px] font-medium mb-1">
                              {dish.title}
                            </h3>
                            {dish.ingredients && (
                              <p className="text-gray-400 text-[14px] sm:text-[16px]">
                                {dish.ingredients}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            {dish.price && (
                              <span className="text-meatra-gold text-[16px] sm:text-[18px] font-bold whitespace-nowrap">
                                {dish.price}
                              </span>
                            )}
                            {dish.weight && (
                              <span className="text-gray-500 text-[12px] sm:text-[14px] whitespace-nowrap">
                                {dish.weight}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-[18px]">Меню скоро появится</p>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="bg-meatra-gray border-t border-gray-800 py-4 px-4 mt-8">
          <div className="max-w-[1720px] mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-4">
            <a href="/menu/main" className="text-meatra-gold text-[14px] sm:text-[16px] font-medium">
              Основное меню
            </a>
            <a href="/menu/game" className="text-white text-[14px] sm:text-[16px] hover:text-meatra-gold transition-colors duration-300">
              Меню из дичи
            </a>
            <a href="/menu/bar" className="text-white text-[14px] sm:text-[16px] hover:text-meatra-gold transition-colors duration-300">
              Винная карта
            </a>
          </div>
        </nav>
      </div>

      <Footer />
    </main>
  );
}
