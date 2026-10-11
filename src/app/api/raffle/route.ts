import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    
    // Get active raffle
    const raffleResult = await db
      .request()
      .query('SELECT TOP 1 * FROM Raffles ORDER BY id ASC');

    if (raffleResult.recordset.length === 0) {
      return NextResponse.json({ error: 'قرعه‌کشی یافت نشد.' }, { status: 404 });
    }

    const raffle = raffleResult.recordset[0];

    // Get count of actually sold tickets from Tickets table
    const ticketsCountResult = await db
      .request()
      .input('raffleId', raffle.id)
      .query('SELECT COUNT(*) as realSold FROM Tickets WHERE raffleId = @raffleId');
    
    const realSold = ticketsCountResult.recordset[0]?.realSold || 0;
    // Total displayed is base seed sold + real sold
    const effectiveSold = Math.min(raffle.soldTickets + realSold, raffle.totalTickets);

    // Get latest recent ticket purchases for public social proof feed
    const recentTicketsResult = await db
      .request()
      .input('raffleId', raffle.id)
      .query(`
        SELECT TOP 50 
          t.ticketNumber, 
          t.ticketCode, 
          t.createdAt, 
          u.fullName,
          u.phoneNumber
        FROM Tickets t
        JOIN Users u ON t.userId = u.id
        WHERE t.raffleId = @raffleId
        ORDER BY t.id DESC
      `);

    const recentTickets = recentTicketsResult.recordset.map((item) => {
      // Obfuscate name and phone for privacy
      const maskedName = item.fullName.split(' ')[0] + ' ***';
      const maskedPhone = item.phoneNumber 
        ? item.phoneNumber.slice(0, 4) + '***' + item.phoneNumber.slice(-3)
        : '۰۹۱۲***' + Math.floor(100 + Math.random() * 899);

      return {
        ticketNumber: item.ticketNumber,
        ticketCode: item.ticketCode,
        createdAt: item.createdAt,
        maskedName,
        maskedPhone,
      };
    });

    return NextResponse.json({
      raffle: {
        ...raffle,
        soldTickets: effectiveSold,
        percentage: ((effectiveSold / raffle.totalTickets) * 100).toFixed(1),
        remainingTickets: Math.max(0, raffle.totalTickets - effectiveSold),
        specs: raffle.prizeSpecs ? JSON.parse(raffle.prizeSpecs) : {},
      },
      recentTickets,
    });
  } catch (error) {
    console.error('Fetch raffle error:', error);
    return NextResponse.json({ error: 'خطا در دریافت اطلاعات قرعه‌کشی.' }, { status: 500 });
  }
}
