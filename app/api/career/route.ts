import { NextRequest, NextResponse } from 'next/server';
import { validateCareerForm, sanitizeFormData } from '@/app/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = sanitizeFormData(body);

    const validation = validateCareerForm(data);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.errors[0]?.message },
        { status: 400 }
      );
    }

    // TODO: Интеграция с HR-системой (email, CRM, Telegram и т.д.)
    // Пока возвращаем успех — заказчик должен подключить свою логику
    console.log('Career application received:', { name: data.name, phone: data.phone, position: data.position });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Career API error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
