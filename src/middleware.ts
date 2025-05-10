// Example: Next.js middleware (or similar)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log("🚀 ~ middleware ~ req:", req)
  try {
    // Middleware logic here
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
