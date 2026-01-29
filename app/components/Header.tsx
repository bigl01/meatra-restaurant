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
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-meatra-dark border-b border-meatra-border-gray">
        <div className="mx-auto flex items-center justify-between w-full max-w-[1720px] h-[60px] sm:h-[70px] lg:h-[90px] px-2 sm:px-4 lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0 min-w-0">
            <div className="relative w-[80px] sm:w-[100px] lg:w-[160px] h-[20px] sm:h-[24px] lg:h-[38px]">
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
          <nav className="hidden lg:flex items-center h-full gap-4 xl:gap-8 text-[14px] xl:text-[16px] flex-grow justify-center font-geist-sans max-w-[600px]">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`hover:text-meatra-red transition-colors duration-300 whitespace-nowrap ${
                  pathname === item.href ? 'text-meatra-gold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 min-w-0">
            {variant === 'default' && (
              <>
                {/* Desktop Buttons - только на больших экранах */}
                <button 
                  onClick={() => window.open(RESTAURANT_INFO.social.yandexEda, '_blank')}
                  className="hidden xl:block bg-meatra-gray rounded-[8px] px-4 py-2 h-[38px] hover:bg-meatra-border-gray transition-all duration-300 text-[14px] font-geist-sans whitespace-nowrap"
                >
                  Доставка
                </button>
                <Link href="/booking" className="hidden xl:block">
                  <button className="bg-meatra-red rounded-[8px] px-4 py-2 h-[38px] hover:bg-[#D33] transition-all duration-300 text-[14px] font-geist-sans whitespace-nowrap">
                    Забронировать
                  </button>
                </Link>

                {/* Mobile/Tablet Buttons - компактные */}
                <Link href="/booking" className="xl:hidden">
                  <button className="bg-meatra-gold text-meatra-dark text-[11px] sm:text-[12px] font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-[6px] hover:bg-[#E8B83A] transition-all duration-300 whitespace-nowrap">
                    Бронь
                  </button>
                </Link>
                <button
                  onClick={() => window.open(RESTAURANT_INFO.social.yandexEda, '_blank')}
                  className="xl:hidden bg-meatra-red text-white text-[11px] sm:text-[12px] font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-[6px] hover:bg-[#D33] transition-all duration-300 whitespace-nowrap"
                >
                  Еда
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden focus:outline-none flex flex-col gap-1 w-5 h-5 justify-center items-center ml-1 flex-shrink-0"
              aria-label="Toggle menu"
            >
              <div className="w-4 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
              <div className="w-4 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
              <div className="w-4 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
