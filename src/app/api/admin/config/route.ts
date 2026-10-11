import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'دسترسی غیرمجاز.' }, { status: 403 });
    }

    const { baseSoldTickets, totalTickets, ticketPrice, status } = await req.json();
    const db = await getDb();

    let statusClause = '';
    if (status) {
      if (status === 'active') {
        statusClause = `, status = 'active', winnerTicketNumber = NULL, winnerUserId = NULL, winnerName = NULL, winnerAnnouncedAt = NULL`;
      } else {
        statusClause = `, status = '${status}'`;
      }
    }

    const request = db.request();
    let updates = [];

    if (baseSoldTickets !== undefined) {
      request.input('soldTickets', sql.Int, parseInt(baseSoldTickets, 10));
      updates.push('soldTickets = @soldTickets');
    }
    if (totalTickets !== undefined) {
      request.input('totalTickets', sql.Int, parseInt(totalTickets, 10));
      updates.push('totalTickets = @totalTickets');
    }
    if (ticketPrice !== undefined) {
      request.input('ticketPrice', sql.BigInt, BigInt(ticketPrice));
      updates.push('ticketPrice = @ticketPrice');
    }

    if (updates.length > 0 || statusClause) {
      const updateStr = updates.length > 0 ? updates.join(', ') : 'id = 1';
      await request.query(`
        UPDATE Raffles
        SET ${updateStr} ${statusClause}
        WHERE id = 1
      `);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Config update error:', error);
    return NextResponse.json({ error: 'خطا در ذخیره تنظیمات.' }, { status: 500 });
  }
}
