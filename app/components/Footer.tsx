'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RESTAURANT_INFO } from '@/app/lib/config';

export default function Footer() {
  return (
    <footer className="bg-meatra-dark text-white w-full px-4 md:px-[100px] py-8 md:py-[60px] mt-8 md:mt-[60px]">
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-[60px] border-t border-meatra-border-gray pt-4 md:pt-[40px]">
        {/* Logo and Description */}
        <div className="flex flex-col gap-4 md:gap-[20px] w-full md:max-w-[703px]">
          <div className="relative w-[clamp(120px,15vw,200px)] h-[clamp(24px,7.5vw,48px)] flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt={RESTAURANT_INFO.name}
              fill 
              className="object-contain" 
            />
          </div>
          <p className="text-meatra-light-gray font-geist-sans text-[clamp(14px,2.5vw,24px)] leading-[140%]">
            {RESTAURANT_INFO.tagline}
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-2 w-full md:w-[316px]">
          <h3 className="uppercase font-geist-sans text-[clamp(24px,5vw,36px)] leading-[100%] text-white">
            Контакты
          </h3>
          <div className="text-meatra-light-gray font-geist-sans text-[clamp(14px,2.5vw,20px)] leading-[150%]">
            <p>{RESTAURANT_INFO.address}</p>
            <a 
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`}
              className="hover:text-meatra-gold transition-colors"
            >
              {RESTAURANT_INFO.phone}
            </a>
            <br />
            <a 
              href={`mailto:${RESTAURANT_INFO.email}`}
              className="hover:text-meatra-gold transition-colors"
            >
              {RESTAURANT_INFO.email}
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex flex-col gap-2 w-full md:w-[303px]">
          <h3 className="uppercase font-geist-sans text-[clamp(24px,5vw,36px)] leading-[100%] text-white">
            Рабочее время
          </h3>
          <div className="text-meatra-light-gray font-geist-sans text-[clamp(14px,2.5vw,20px)] leading-[150%]">
            <p>{RESTAURANT_INFO.workingHours.weekdays}</p>
            <p>{RESTAURANT_INFO.workingHours.weekend}</p>
            <p>{RESTAURANT_INFO.workingHours.sunday}</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1720px] mx-auto mt-4 md:mt-[40px] border-t border-meatra-border-gray pt-2 md:pt-[20px]">
        <p className="text-[#666666] font-geist-sans text-[clamp(10px,1.5vw,16px)]">
          © {new Date().getFullYear()} {RESTAURANT_INFO.name}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
