import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getTeamMembers } from '../lib/wordpress-api';
import TeamGrid from './TeamGrid';

export const metadata: Metadata = {
  title: 'Команда',
  description: 'Познакомьтесь с командой ресторана Meatra',
};

export const revalidate = 3600;

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="min-h-screen bg-meatra-dark text-white">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px]">
        <section className="py-12 md:py-16 container-padding max-container">
          <h1 className="section-title">КОМАНДА MEATRA</h1>
          <p className="text-center text-[clamp(16px,2vw,20px)] text-gray-300 mb-12">
            Познакомьтесь с нами поближе
          </p>
          
          <TeamGrid teamMembers={teamMembers} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
