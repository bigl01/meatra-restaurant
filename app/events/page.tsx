import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEvents } from '../lib/wordpress-api';
import { formatDate, stripHtml } from '../lib/utils';
import ImageWithFallback from '../components/ImageWithFallback';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'События',
  description: 'События и мероприятия ресторана Meatra - следите за нашими специальными акциями',
};

export const revalidate = 3600;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px] w-full">
        {/* Hero Section */}
        <section className="container-padding max-container py-12">
          <h1 className="section-title">СОБЫТИЯ</h1>
          <p className="text-center text-[clamp(16px,2vw,20px)] text-gray-300 mb-12 max-w-3xl mx-auto">
            Следите за нашими специальными мероприятиями и акциями
          </p>
        </section>

        {/* Events Grid */}
        <section className="container-padding max-container py-8">
          {events.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link 
                  key={event.id} 
                  href={`/events/${event.slug}`}
                  className="group"
                >
                  <div className="card cursor-pointer h-full">
                    {/* Event Image */}
                    <div className="relative h-[250px] rounded-[15px] overflow-hidden mb-4">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Event Info */}
                    <div className="flex flex-col gap-2">
                      <span className="text-meatra-gold text-[14px]">
                        {formatDate(event.date)}
                      </span>
                      <h3 className="text-white text-[clamp(18px,2vw,24px)] font-bold line-clamp-2 group-hover:text-meatra-gold transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-[14px] sm:text-[16px] line-clamp-3">
                        {stripHtml(event.description).slice(0, 150) || 'Описание события'}
                        {stripHtml(event.description).length > 150 ? '...' : ''}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-[clamp(24px,3vw,32px)] font-bold mb-4">
                События скоро появятся
              </h2>
              <p className="text-gray-400 text-[16px]">
                Мы готовим для вас интересные мероприятия
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="container-padding max-container py-16">
          <div className="bg-meatra-gray rounded-[20px] p-8 text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold mb-4">
              Не пропустите наши события!
            </h2>
            <p className="text-gray-300 text-[16px] sm:text-[18px] mb-6 max-w-2xl mx-auto">
              Подпишитесь на наши социальные сети, чтобы быть в курсе всех мероприятий
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4 max-w-md mx-auto">
              <Link href="/contacts" className="flex-1 sm:flex-initial">
                <button className="btn-primary w-full sm:w-auto sm:min-w-[180px]">
                  Контакты
                </button>
              </Link>
              <Link href="/booking" className="flex-1 sm:flex-initial">
                <button className="btn-secondary w-full sm:w-auto sm:min-w-[180px]">
                  Забронировать
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
