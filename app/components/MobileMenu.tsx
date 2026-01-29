'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/app/lib/config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 bg-meatra-dark bg-opacity-95 z-40 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out md:hidden`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button 
          onClick={onClose} 
          className="text-white text-3xl hover:text-meatra-gold transition-colors"
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center gap-6 mt-10">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            onClick={onClose}
            className={`text-2xl font-medium transition-colors duration-300 ${
              pathname === item.href 
                ? 'text-meatra-gold' 
                : 'text-white hover:text-meatra-gold'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
