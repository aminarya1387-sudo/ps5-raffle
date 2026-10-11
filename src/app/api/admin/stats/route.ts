import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'دسترسی غیرمجاز. فقط مدیر سیستم.' }, { status: 403 });
    }

    const db = await getDb();

    // 1. Overview counts
    const usersCount = await db.request().query('SELECT COUNT(*) as count FROM Users WHERE role = \'user\'');
    const ordersStats = await db.request().query('SELECT COUNT(*) as count, ISNULL(SUM(totalAmount), 0) as totalRevenue FROM Orders WHERE status = \'paid\'');
    const ticketsCount = await db.request().query('SELECT COUNT(*) as count FROM Tickets');

    // 2. Active Raffle
    const raffleRes = await db.request().query('SELECT TOP 1 * FROM Raffles ORDER BY id ASC');
    const raffle = raffleRes.recordset[0];

    // 3. All Tickets list for admin inspection or live stream
    const allTicketsRes = await db.request().query(`
      SELECT TOP 500
        t.id,
        t.ticketNumber,
        t.ticketCode,
        t.createdAt,
        u.fullName,
        u.email,
        u.phoneNumber,
        o.trackingCode
      FROM Tickets t
      JOIN Users u ON t.userId = u.id
      JOIN Orders o ON t.orderId = o.id
      ORDER BY t.ticketNumber ASC
    `);

    return NextResponse.json({
      stats: {
        totalUsers: usersCount.recordset[0].count,
        totalOrders: ordersStats.recordset[0].count,
        totalRevenue: ordersStats.recordset[0].totalRevenue,
        totalIssuedTickets: ticketsCount.recordset[0].count,
        raffleStatus: raffle.status,
        winnerTicketNumber: raffle.winnerTicketNumber,
        winnerName: raffle.winnerName,
      },
      raffle,
      tickets: allTicketsRes.recordset,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'خطا در بارگذاری آمار مدیریت.' }, { status: 500 });
  }
}
