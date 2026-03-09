import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getEventBySlug, getEvents } from '../../lib/wordpress-api';
import { formatDate } from '../../lib/utils';
import ImageWithFallback from '../../components/ImageWithFallback';
import Link from 'next/link';

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Событие не найдено' };
  return {
    title: event.title,
    description: event.description.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export const revalidate = 3600;

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px] w-full">
        <section className="container-padding max-container py-8">
          <Link href="/events" className="text-meatra-gold hover:text-[#E8B83A] text-sm mb-6 inline-block">
            ← Все события
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] rounded-[20px] overflow-hidden mb-8">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            <span className="text-meatra-gold text-[14px] block mb-2">
              {formatDate(event.date)}
            </span>
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold mb-6">
              {event.title}
            </h1>
            <div 
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.galleryImages.map((img, i) => (
                  <div key={i} className="relative h-[200px] rounded-[15px] overflow-hidden">
                    <ImageWithFallback
                      src={img}
                      alt={`${event.title} - фото ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>
      </div>

      <Footer />
    </main>
  );
}
