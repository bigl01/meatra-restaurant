'use client';

import { useState } from 'react';
import { Vacancy } from '../types';
import { RESTAURANT_INFO } from '../lib/config';
import { stripHtml } from '../lib/utils';

const STATIC_BENEFITS = [
  {
    id: 1,
    title: 'ГИБКИЙ ГРАФИК',
    description: 'Сменный график работы позволяет легко совмещать работу в ресторане с учебой или другими занятиями.'
  },
  {
    id: 2,
    title: 'РАЗВИТИЕ КОММУНИКАТИВНЫХ НАВЫКОВ',
    description: 'Работа в ресторанной сфере – это отличная возможность прокачать навыки общения.'
  },
  {
    id: 3,
    title: 'КАРЬЕРНЫЙ РОСТ',
    description: 'Широкие возможности для профессионального роста от базовой позиции до управляющего.'
  },
  {
    id: 4,
    title: 'БОНУСЫ',
    description: 'Социальный пакет, питание и другие льготы для сотрудников.'
  }
];

interface CareerClientProps {
  vacancies: Vacancy[];
}

export default function CareerClient({ vacancies }: CareerClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Анкета успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '', position: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitMessage('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-meatra-gray to-meatra-dark text-center container-padding">
        <h1 className="text-[clamp(32px,6vw,56px)] font-bold uppercase mb-6">
          ПРИСОЕДИНЯЙТЕСЬ К КОМАНДЕ
        </h1>
        <div className="w-48 h-px bg-white mx-auto mb-6"></div>
        <p className="text-[clamp(16px,2vw,20px)] text-gray-300 max-w-2xl mx-auto">
          Мы ищем талантливых профессионалов, готовых создавать незабываемые впечатления для наших гостей.
        </p>
      </section>

      {/* Vacancies */}
      <section id="vacancies" className="py-12 container-padding max-container">
        <h2 className="section-title">ОТКРЫТЫЕ ВАКАНСИИ</h2>
        
        {vacancies.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className="card">
                <h3 className="text-meatra-gold text-xl font-bold mb-3">
                  {stripHtml(vacancy.title)}
                </h3>
                <p className="text-meatra-text-gray text-sm leading-relaxed">
                  {stripHtml(vacancy.description).substring(0, 200)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            На данный момент открытых вакансий нет
          </div>
        )}
      </section>

      {/* Benefits */}
      <section className="py-12 bg-meatra-gray">
        <div className="container-padding max-container">
          <h2 className="section-title">ПРЕИМУЩЕСТВА РАБОТЫ С НАМИ</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATIC_BENEFITS.map((benefit) => (
              <div key={benefit.id} className="card">
                <h3 className="text-meatra-gold text-lg font-bold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-meatra-text-gray text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 container-padding max-container">
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-meatra-gray to-meatra-dark rounded-[20px] p-8">
          <h2 className="text-center text-[clamp(24px,4vw,36px)] font-bold mb-2">
            ПРИСОЕДИНЯЙТЕСЬ К КОМАНДЕ <span className="text-meatra-red">{RESTAURANT_INFO.name.toUpperCase()}</span>
          </h2>
          
          <div className="text-center mb-6 space-y-2">
            <p className="text-meatra-gold font-bold">Или напишите в директ</p>
            <p>{RESTAURANT_INFO.social.instagram}</p>
            <p className="text-meatra-gold font-bold mt-4">Позвоните нам:</p>
            <p className="font-bold">{RESTAURANT_INFO.phone}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-meatra-gold text-xl font-bold mb-3 text-center">
              ЗАПОЛНИТЕ АНКЕТУ
            </h3>
            <p className="text-center text-sm mb-6">и мы свяжемся с вами</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-meatra-gold text-sm font-bold mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div>
                <label className="block text-meatra-gold text-sm font-bold mb-2">
                  Номер для связи
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field"
                  placeholder="+375 (__) ___ __ __"
                  required
                />
              </div>

              <div>
                <label className="block text-meatra-gold text-sm font-bold mb-2">
                  Должность
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="input-field"
                  required
                >
                  <option value="">Выберите должность</option>
                  {vacancies.map(v => (
                    <option key={v.id} value={stripHtml(v.title)}>
                      {stripHtml(v.title)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить анкету'}
              </button>

              {submitMessage && (
                <p className={`text-center text-sm ${
                  submitMessage.includes('успешно') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
