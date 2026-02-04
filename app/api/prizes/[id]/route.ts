import { NextResponse } from 'next/server';
import { prizes } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const prize = prizes.find((p) => p.id === id);

  if (!prize) {
    return NextResponse.json(
      { success: false, error: 'Prize not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: prize,
  });
}
