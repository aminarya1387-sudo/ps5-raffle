import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'احراز هویت الزامی است.' }, { status: 401 });
    }

    const db = await getDb();
    const result = await db
      .request()
      .input('userId', sql.Int, user.userId)
      .query(`
        SELECT 
          t.id,
          t.ticketNumber,
          t.ticketCode,
          t.createdAt,
          r.title as raffleTitle,
          r.prizeName,
          r.status as raffleStatus,
          r.winnerTicketNumber,
          o.trackingCode,
          o.totalAmount
        FROM Tickets t
        JOIN Raffles r ON t.raffleId = r.id
        JOIN Orders o ON t.orderId = o.id
        WHERE t.userId = @userId
        ORDER BY t.id DESC
      `);

    return NextResponse.json({
      tickets: result.recordset,
    });
  } catch (error) {
    console.error('Fetch user tickets error:', error);
    return NextResponse.json({ error: 'خطا در دریافت لیست بلیت‌ها.' }, { status: 500 });
  }
}
