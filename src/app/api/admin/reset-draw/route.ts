import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'دسترسی غیرمجاز. فقط مدیر سیستم.' }, { status: 403 });
    }

    const db = await getDb();

    // Reset winner details and restore status to 'active'
    await db.query(`
      UPDATE Raffles
      SET 
        status = 'active',
        winnerTicketNumber = NULL,
        winnerUserId = NULL,
        winnerName = NULL,
        winnerAnnouncedAt = NULL
      WHERE id = 1
    `);

    return NextResponse.json({
      success: true,
      message: 'وضعیت قرعه‌کشی با موفقیت به حالت فعال و آماده قرعه‌کشی بازنشانی شد.',
    });
  } catch (error) {
    console.error('Reset draw error:', error);
    return NextResponse.json({ error: 'خطا در بازنشانی وضعیت قرعه‌کشی.' }, { status: 500 });
  }
}
