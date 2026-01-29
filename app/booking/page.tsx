'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validateBookingForm, BookingFormData } from '../lib/validators';
import { RESTAURANT_INFO } from '../lib/config';

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    comment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'guests' ? parseInt(value) : value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      const newErrors: Record<string, string> = {};
      validation.errors.forEach(error => {
        newErrors[error.field] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        comment: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-meatra-dark text-white overflow-x-hidden w-full">
      <Header />
      
      <div className="pt-[60px] sm:pt-[70px] lg:pt-[90px] w-full">
        {/* Hero Section */}
        <section className="container-padding max-container py-12">
          <h1 className="section-title">БРОНИРОВАНИЕ СТОЛИКА</h1>
          <p className="text-center text-[clamp(16px,2vw,20px)] text-gray-300 mb-8 max-w-3xl mx-auto">
            Забронируйте столик в нашем ресторане
          </p>
        </section>

        {/* Booking Form */}
        <section className="container-padding max-container py-8">
          <div className="max-w-2xl mx-auto bg-meatra-gray rounded-[20px] p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white text-[16px] font-medium mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Иван Иванов"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-white text-[16px] font-medium mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+375 (29) 123-45-67"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-white text-[16px] font-medium mb-2">
                    Дата *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  {errors.date && (
                    <p className="text-red-500 text-[14px] mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="block text-white text-[16px] font-medium mb-2">
                    Время *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                  {errors.time && (
                    <p className="text-red-500 text-[14px] mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-white text-[16px] font-medium mb-2">
                  Количество гостей *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'гость' : 'гостей'}</option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.guests}</p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block text-white text-[16px] font-medium mb-2">
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="input-field min-h-[100px] resize-vertical"
                  placeholder="Особые пожелания или комментарии..."
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-400 font-medium">
                    ✅ Бронирование отправлено! Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
                  <p className="text-red-400 font-medium">
                    ❌ Ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Забронировать'}
              </button>

              <p className="text-gray-400 text-[14px] text-center">
                Или позвоните нам: <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, '')}`} className="text-meatra-gold hover:underline">{RESTAURANT_INFO.phone}</a>
              </p>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
