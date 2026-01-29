'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../types';
import { getImageUrl } from '../lib/utils';

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  if (products.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setExpandedProduct(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setExpandedProduct(null);
  };

  const toggleDescription = (id: number) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  return (
    <div className="w-full px-4">
      <h2 className="text-meatra-gold text-center text-[clamp(24px,4vw,36px)] font-bold mb-6">
        {title}
      </h2>

      {/* Mobile/Tablet Carousel */}
      <div className="md:hidden">
        <div className="relative flex justify-center items-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-meatra-gray/80 hover:bg-meatra-gray rounded-full p-2 transition-all"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-meatra-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Product Card */}
          <div className="w-[280px] sm:w-[340px]">
            <div className="relative w-full h-[280px] sm:h-[340px] rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src={getImageUrl(products[currentIndex].image)}
                alt={products[currentIndex].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="text-white text-center text-[clamp(20px,3vw,28px)] font-bold">
                    {products[currentIndex].name}
                  </h3>
                </div>
                <button
                  onClick={() => toggleDescription(products[currentIndex].id)}
                  className="bg-black/40 hover:bg-black/60 text-white rounded-[10px] px-4 py-2 transition-all"
                >
                  {expandedProduct === products[currentIndex].id ? 'Скрыть' : 'Подробнее'}
                </button>
              </div>
            </div>

            {/* Description */}
            {expandedProduct === products[currentIndex].id && (
              <div className="mt-3 p-4 bg-meatra-gray rounded-lg border border-meatra-border-gray animate-fadeIn">
                <p className="text-meatra-light-gray text-[14px] text-center">
                  {products[currentIndex].description}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-meatra-gray/80 hover:bg-meatra-gray rounded-full p-2 transition-all"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-meatra-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setExpandedProduct(null);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-meatra-gold w-6' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1720px] mx-auto">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative w-full h-[340px] rounded-[20px] overflow-hidden shadow-lg">
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="text-white text-center text-[24px] font-bold">
                    {product.name}
                  </h3>
                </div>
                <button
                  onClick={() => toggleDescription(product.id)}
                  className="bg-black/40 hover:bg-black/60 text-white rounded-[10px] px-4 py-2 transition-all"
                >
                  {expandedProduct === product.id ? 'Скрыть' : 'Подробнее'}
                </button>
              </div>
            </div>

            {expandedProduct === product.id && (
              <div className="mt-3 p-4 bg-meatra-gray rounded-lg border border-meatra-border-gray animate-fadeIn">
                <p className="text-meatra-light-gray text-[14px] text-center">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
