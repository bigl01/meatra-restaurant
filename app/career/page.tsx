import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getVacancies } from '../lib/wordpress-api';
import CareerClient from './CareerClient';

export const metadata: Metadata = {
  title: 'Карьера',
  description: 'Работа в ресторане Meatra - открытые вакансии и возможности',
};

export const revalidate = 3600;

export default async function CareerPage() {
  const vacancies = await getVacancies();

  return (
    <main className="min-h-screen bg-meatra-dark text-white">
      <Header />
      
      <div className="pt-[70px] md:pt-[120px]">
        <CareerClient vacancies={vacancies} />
      </div>

      <Footer />
    </main>
  );
}
