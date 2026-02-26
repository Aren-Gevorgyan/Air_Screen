import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_API_BASE_URL = 'https://api.telegram.org';

const formatOrderMessage = (body: unknown): string => {
  if (!body || typeof body !== 'object') {
    return 'New request received, but body is not an object.';
  }

  const data = body as {
    orderId?: string;
    userId?: string;
    name?: string;
    date?: string;
    hour?: string;
    type?: string;
    phone?: string;
    firstOponent?: string;
    secondOponent?: string;
    popcornCount?: number | string;
    kalian?: boolean;
    romanticDinner?: boolean;
    guestCount?: number;
    watchType?: string;
    totalPrice?: number;
    isEdited?: boolean;
    isDeleted?: boolean;
    [key: string]: unknown;
  };

  if (data.isDeleted || data.name || data.date || data.hour || data.phone || data.type) {
    const parts: string[] = [];

    if (data.isDeleted) {
      parts.push('Order has been deleted');
    } else if (data.isEdited) {
      parts.push('Order has been edited');
    } else {
      parts.push('New Order');
    }
    if (data.orderId) parts.push(`Order ID: ${data.orderId}`);
    if (data.userId) parts.push(`User ID: ${data.userId}`);
    if (data.type) parts.push(`Type: ${data.type}`);
    if (data.watchType)
      parts.push(`Watch type: ${data.watchType === 'general' ? 'General' : 'Individual'}`);
    if (typeof data.guestCount === 'number')
      parts.push(`Guests: ${data.guestCount}`);
    if (data.name) parts.push(`Name: ${data.name}`);
    if (data.firstOponent || data.secondOponent) {
      parts.push(
        `Opponents: ${data.firstOponent ?? '-'} vs ${data.secondOponent ?? '-'}`
      );
    }
    if (data.date) parts.push(`Date: ${data.date}`);
    if (data.hour) parts.push(`Hour: ${data.hour}`);
    if (data.phone) parts.push(`Phone: ${data.phone}`);
    if (typeof data.popcornCount !== 'undefined') {
      parts.push(`Popcorn count: ${data.popcornCount}`);
    }
    if (typeof data.kalian === 'boolean') {
      parts.push(`Hookah: ${data.kalian ? 'Yes' : 'No'}`);
    }
    if (typeof data.romanticDinner === 'boolean') {
      parts.push(`Romantic dinner: ${data.romanticDinner ? 'Yes' : 'No'}`);
    }
    if (typeof data.totalPrice === 'number') {
      parts.push(`Total price: ${data.totalPrice.toLocaleString('en-US')} AMD`);
    }

    return parts.join('\n');
  }

  const lines = Object.entries(data).map(
    ([key, value]) =>
      `${key}: ${
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      }`
  );

  if (!lines.length) {
    return 'New request received with empty body.';
  }

  return `New request:\n${lines.join('\n')}`;
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.',
      },
      { status: 500 }
    );
  }

  let text = 'Test message from Next.js';

  if (request.headers.get('content-type')?.includes('application/json')) {
    try {
      const body = await request.json();

      if (typeof body?.text === 'string' && body.text.trim()) {
        text = body.text;
      } else if (body) {
        text = formatOrderMessage(body);
      }
    } catch {
      text = 'Test message from Next.js';
    }
  }

  const url = `${TELEGRAM_API_BASE_URL}/bot${botToken}/sendMessage`;

  try {
    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();

      return NextResponse.json(
        { success: false, error: 'Failed to send Telegram message', details: errorText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected error while sending Telegram message',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};



