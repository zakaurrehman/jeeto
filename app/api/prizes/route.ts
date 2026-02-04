import { NextResponse } from 'next/server';
import { prizes } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: prizes,
  });
}
