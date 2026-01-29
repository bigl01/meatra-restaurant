import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactsClient from './ContactsClient';
import { RESTAURANT_INFO } from '../lib/config';

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Контакты ресторана ${RESTAURANT_INFO.name} - адрес, телефон, email, часы работы`,
};

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-meatra-dark text-white">
      <Header />
      
      <div className="pt-[70px] md:pt-[120px]">
        <ContactsClient />
      </div>

      <Footer />
    </main>
  );
}
