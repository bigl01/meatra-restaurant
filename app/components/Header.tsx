'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, RESTAURANT_INFO } from '@/app/lib/config';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  variant?: 'default' | 'minimal';
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-meatra-dark border-b border-meatra-border-gray">
        <div className="mx-auto flex items-center justify-between w-full max-w-[1720px] h-[70px] md:h-[120px] px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0">
            <div className="relative w-[100px] md:w-[200px] h-[24px] md:h-[48px]">
              <Image 
                src="/logo.png" 
                alt={RESTAURANT_INFO.name}
                fill
                className="object-contain" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full gap-5 lg:gap-10 text-[clamp(14px,1.5vw,20px)] flex-grow justify-center font-geist-sans">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`hover:text-meatra-red transition-colors duration-300 ${
                  pathname === item.href ? 'text-meatra-gold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {variant === 'default' && (
              <>
                {/* Desktop Buttons */}
                <button 
                  onClick={() => window.open(RESTAURANT_INFO.social.yandexEda, '_blank')}
                  className="hidden md:block bg-meatra-gray rounded-[10px] w-[clamp(120px,20vw,276px)] h-[clamp(36px,5vw,48px)] hover:bg-meatra-border-gray transition-all duration-300 ease-out text-[clamp(12px,1.5vw,20px)] font-geist-sans whitespace-nowrap"
                >
                  Заказать доставку
                </button>
                <Link href="/booking" className="hidden md:block">
                  <button className="bg-meatra-red rounded-[10px] w-[clamp(130px,22vw,293px)] h-[clamp(36px,5vw,48px)] hover:bg-[#D33] transition-all duration-300 ease-out text-[clamp(12px,1.5vw,20px)] font-geist-sans whitespace-nowrap">
                    Забронировать стол
                  </button>
                </Link>

                {/* Mobile Buttons */}
                <Link href="/booking" className="md:hidden">
                  <button className="bg-meatra-gold text-meatra-dark text-[14px] font-medium px-4 py-2 rounded-[6px] hover:bg-[#E8B83A] transition-all duration-300">
                    Бронь
                  </button>
                </Link>
                <button
                  onClick={() => window.open(RESTAURANT_INFO.social.yandexEda, '_blank')}
                  className="md:hidden bg-meatra-red text-white text-[14px] font-medium px-4 py-2 rounded-[6px] hover:bg-[#D33] transition-all duration-300"
                >
                  Доставка
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden focus:outline-none flex flex-col gap-1 w-6 h-6 justify-center items-center"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
