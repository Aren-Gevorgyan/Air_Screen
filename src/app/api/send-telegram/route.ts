import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_API_BASE_URL = 'https://api.telegram.org';

const formatOrderMessage = (body: unknown): string => {
  if (!body || typeof body !== 'object') {
    return 'New request received, but body is not an object.';
  }

  const data = body as {
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
    [key: string]: unknown;
  };

  if (data.name || data.date || data.hour || data.phone || data.type) {
    const parts: string[] = [];

    parts.push('New Order');
    if (data.type) parts.push(`Type: ${data.type}`);
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
      parts.push(`Kalian: ${data.kalian ? 'Yes' : 'No'}`);
    }
    if (typeof data.romanticDinner === 'boolean') {
      parts.push(`Romantic dinner: ${data.romanticDinner ? 'Yes' : 'No'}`);
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
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing NEXT_PUBLIC_TELEGRAM_BOT_TOKEN or NEXT_PUBLIC_TELEGRAM_CHAT_ID environment variables.',
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



