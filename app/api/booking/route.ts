import { NextRequest, NextResponse } from 'next/server';
import { validateBookingForm, sanitizeFormData } from '@/app/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = sanitizeFormData(body);

    const validation = validateBookingForm(data);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.errors[0]?.message },
        { status: 400 }
      );
    }

    // TODO: Интеграция с системой бронирования (email, CRM, Telegram и т.д.)
    // Пока возвращаем успех — заказчик должен подключить свою логику
    console.log('Booking received:', { name: data.name, phone: data.phone, date: data.date, time: data.time, guests: data.guests });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
