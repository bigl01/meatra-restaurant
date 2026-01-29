'use client';

import { useEffect, useState } from 'react';
import { RESTAURANT_INFO } from '../lib/config';

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function ContactsClient() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    
    if (existingScript) {
      if (window.ymaps) {
        initMap();
      } else {
        existingScript.addEventListener('load', initMap);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
      initMap();
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initMap = () => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      const existingMap = document.querySelector('#yandex-map .ymaps-map');
      if (existingMap) return;

      try {
        const map = new window.ymaps.Map('yandex-map', {
          center: [RESTAURANT_INFO.coordinates.lat, RESTAURANT_INFO.coordinates.lng],
          zoom: 17,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        const placemark = new window.ymaps.Placemark(
          [RESTAURANT_INFO.coordinates.lat, RESTAURANT_INFO.coordinates.lng],
          {
            hintContent: `Ресторан ${RESTAURANT_INFO.name}`,
            balloonContent: `${RESTAURANT_INFO.address}<br/>Ресторан ${RESTAURANT_INFO.name}`,
          },
          {
            preset: 'islands#redIcon',
          }
        );

        map.geoObjects.add(placemark);
      } catch (error) {
        console.error('Error initializing Yandex Map:', error);
      }
    });
  };

  const openInYandexMaps = () => {
    const url = `https://yandex.by/maps/?ll=${RESTAURANT_INFO.coordinates.lng}%2C${RESTAURANT_INFO.coordinates.lat}&mode=whatshere&z=17`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Contact Info Section */}
      <section className="mx-4 my-6 rounded-[20px] bg-meatra-gray p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">
          {/* Contacts */}
          <div>
            <h2 className="text-meatra-gold text-[clamp(24px,4vw,36px)] font-bold mb-6 uppercase">
              Контакты
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-meatra-text-gray text-sm mb-1">Адрес</p>
                <p className="text-white text-[clamp(16px,2vw,20px)]">{RESTAURANT_INFO.address}</p>
              </div>
              <div>
                <p className="text-meatra-text-gray text-sm mb-1">Телефон</p>
                <a 
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`}
                  className="text-white text-[clamp(16px,2vw,20px)] hover:text-meatra-gold transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div>
                <p className="text-meatra-text-gray text-sm mb-1">Email</p>
                <a 
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-white text-[clamp(16px,2vw,20px)] hover:text-meatra-gold transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-meatra-gold text-[clamp(24px,4vw,36px)] font-bold mb-6 uppercase">
              Часы работы
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-meatra-text-gray text-sm">Пн–Чт:</span>
                <span className="text-white text-[clamp(16px,2vw,20px)]">11:00 – 23:00</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-meatra-text-gray text-sm">Пт–Сб:</span>
                <span className="text-white text-[clamp(16px,2vw,20px)]">11:00 – 01:00</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-meatra-text-gray text-sm">Вс:</span>
                <span className="text-white text-[clamp(16px,2vw,20px)]">11:00 – 23:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="mx-4 my-6 rounded-[20px] overflow-hidden border border-meatra-border-gray h-[400px] md:h-[500px]">
        <div id="yandex-map" className="w-full h-full">
          {!mapLoaded && (
            <div className="w-full h-full flex items-center justify-center bg-meatra-gray">
              <p className="text-gray-400">Загрузка карты...</p>
            </div>
          )}
        </div>
      </div>

      {/* Open in Yandex Maps Button */}
      <div className="mx-4 mb-8">
        <button
          onClick={openInYandexMaps}
          className="w-full md:w-auto bg-meatra-gray hover:bg-meatra-border-gray text-white px-8 py-4 rounded-[10px] transition-all font-bold text-[clamp(14px,2vw,18px)]"
        >
          📍 Открыть в Яндекс.Картах
        </button>
      </div>
    </>
  );
}
