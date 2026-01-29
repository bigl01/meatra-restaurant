import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { RESTAURANT_INFO } from './lib/config';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      {/* Add padding for fixed header */}
      <div className="pt-[70px] md:pt-[120px] w-full overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.jpg"
              alt="Meatra Restaurant"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-meatra-dark"></div>
          </div>
          
          <div className="relative z-10 container-padding max-container text-center">
            <h1 className="text-[clamp(36px,8vw,96px)] font-bold uppercase mb-6 animate-fadeIn">
              {RESTAURANT_INFO.name}
            </h1>
            <p className="text-[clamp(18px,3vw,32px)] mb-8 max-w-3xl mx-auto text-gray-200 animate-slideInLeft">
              {RESTAURANT_INFO.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideInRight px-4">
              <Link href="/menu">
                <button className="btn-primary w-full sm:w-auto min-w-[200px]">
                  Смотреть меню
                </button>
              </Link>
              <Link href="/booking">
                <button className="btn-secondary w-full sm:w-auto min-w-[200px]">
                  Забронировать стол
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 container-padding max-container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-[20px] overflow-hidden">
              <Image
                src="/gruppa-molodyh-ludei-tostov-bokaly 1.png"
                alt="О ресторане"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-6 text-meatra-gold">
                О нас
              </h2>
              <p className="text-[clamp(16px,2vw,20px)] leading-relaxed text-gray-300 mb-4">
                {RESTAURANT_INFO.name} - это место, где встречаются традиции и современность. 
                Мы специализируемся на приготовлении изысканных мясных блюд, используя только 
                лучшие ингредиенты и проверенные временем рецепты.
              </p>
              <p className="text-[clamp(16px,2vw,20px)] leading-relaxed text-gray-300 mb-6">
                Наша команда профессионалов создает незабываемую атмосферу и гарантирует 
                высочайший уровень обслуживания каждому гостю.
              </p>
              <Link href="/team">
                <button className="btn-outline w-full sm:w-auto">
                  Познакомиться с командой
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section className="py-16 md:py-24 bg-meatra-gray">
          <div className="container-padding max-container">
            <h2 className="section-title">Наше меню</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Main Menu */}
              <Link href="/menu/main">
                <div className="card group cursor-pointer h-[400px]">
                  <div className="relative h-[250px] rounded-[15px] overflow-hidden mb-4">
                    <Image
                      src="/main_menu.png"
                      alt="Основное меню"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-meatra-gold mb-2">Основное меню</h3>
                  <p className="text-gray-400">Классические блюда на любой вкус</p>
                </div>
              </Link>

              {/* Game Menu */}
              <Link href="/menu/game">
                <div className="card group cursor-pointer h-[400px]">
                  <div className="relative h-[250px] rounded-[15px] overflow-hidden mb-4">
                    <Image
                      src="/hunter_menu.png"
                      alt="Меню из дичи"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-meatra-gold mb-2">Меню из дичи</h3>
                  <p className="text-gray-400">Для настоящих гурманов</p>
                </div>
              </Link>

              {/* Wine List */}
              <Link href="/menu/bar">
                <div className="card group cursor-pointer h-[400px]">
                  <div className="relative h-[250px] rounded-[15px] overflow-hidden mb-4">
                    <Image
                      src="/vine.png"
                      alt="Винная карта"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-meatra-gold mb-2">Винная карта</h3>
                  <p className="text-gray-400">Изысканные напитки</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 md:py-24 container-padding max-container">
          <h2 className="section-title">События</h2>
          
          <div className="text-center mb-8">
            <p className="text-[clamp(16px,2vw,20px)] text-gray-300 mb-6">
              Следите за нашими специальными мероприятиями и акциями
            </p>
            <Link href="/events">
              <button className="btn-primary w-full sm:w-auto min-w-[200px]">
                Все события
              </button>
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24 bg-meatra-gray">
          <div className="container-padding max-container text-center">
            <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-6">
              Забронируйте столик
            </h2>
            <p className="text-[clamp(16px,2vw,20px)] text-gray-300 mb-8 max-w-2xl mx-auto">
              Гарантируем незабываемый вечер в атмосфере комфорта и изысканности
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link href="/booking">
                <button className="btn-secondary w-full sm:w-auto min-w-[200px]">
                  Забронировать
                </button>
              </Link>
              <Link href="/contacts">
                <button className="btn-outline w-full sm:w-auto min-w-[200px]">
                  Контакты
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
