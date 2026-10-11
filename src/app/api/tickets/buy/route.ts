import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'برای خرید بلیت ابتدا باید وارد حساب کاربری خود شوید.' },
        { status: 401 }
      );
    }

    const { ticketCount, raffleId } = await req.json();
    const count = parseInt(ticketCount, 10);

    if (isNaN(count) || count < 1 || count > 50) {
      return NextResponse.json(
        { error: 'تعداد بلیت نامعتبر است (بین ۱ تا ۵۰ بلیت).' },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // Get raffle
    const raffleRes = await db
      .request()
      .input('id', sql.Int, raffleId || 1)
      .query('SELECT * FROM Raffles WHERE id = @id');

    if (raffleRes.recordset.length === 0) {
      return NextResponse.json({ error: 'قرعه‌کشی یافت نشد.' }, { status: 404 });
    }

    const raffle = raffleRes.recordset[0];
    if (raffle.status !== 'active') {
      return NextResponse.json(
        { error: 'فروش بلیت‌های این قرعه‌کشی در حال حاضر متوقف شده است.' },
        { status: 400 }
      );
    }

    const pricePerTicket = Number(raffle.ticketPrice);
    const totalAmount = pricePerTicket * count;

    // Simulate gateway tracking code
    const trackingCode = 'SHP-' + Math.floor(10000000 + Math.random() * 90000000);
    const gatewayRefId = 'ZRP-' + Date.now();

    // Use SQL Server Transaction to safely reserve and issue ticket numbers
    const transaction = new sql.Transaction(db);
    await transaction.begin();

    try {
      // 1. Create Order
      const orderReq = new sql.Request(transaction);
      const orderRes = await orderReq
        .input('userId', sql.Int, user.userId)
        .input('raffleId', sql.Int, raffle.id)
        .input('ticketCount', sql.Int, count)
        .input('totalAmount', sql.BigInt, totalAmount)
        .input('status', sql.NVarChar, 'paid')
        .input('trackingCode', sql.NVarChar, trackingCode)
        .input('gatewayRefId', sql.NVarChar, gatewayRefId)
        .query(`
          INSERT INTO Orders (userId, raffleId, ticketCount, totalAmount, status, trackingCode, gatewayRefId, paidAt)
          OUTPUT INSERTED.id
          VALUES (@userId, @raffleId, @ticketCount, @totalAmount, @status, @trackingCode, @gatewayRefId, GETDATE())
        `);

      const orderId = orderRes.recordset[0].id;

      // 2. Find max existing ticketNumber for this raffle
      const maxTicketReq = new sql.Request(transaction);
      const maxTicketRes = await maxTicketReq
        .input('raffleId', sql.Int, raffle.id)
        .query('SELECT ISNULL(MAX(ticketNumber), 0) as maxNum FROM Tickets WHERE raffleId = @raffleId');

      let currentMax = maxTicketRes.recordset[0].maxNum;

      const createdTickets = [];

      for (let i = 0; i < count; i++) {
        currentMax += 1;
        const ticketCode = `PS5-${String(currentMax).padStart(5, '0')}`;

        const ticketReq = new sql.Request(transaction);
        await ticketReq
          .input('raffleId', sql.Int, raffle.id)
          .input('userId', sql.Int, user.userId)
          .input('orderId', sql.Int, orderId)
          .input('ticketNumber', sql.Int, currentMax)
          .input('ticketCode', sql.NVarChar, ticketCode)
          .query(`
            INSERT INTO Tickets (raffleId, userId, orderId, ticketNumber, ticketCode)
            VALUES (@raffleId, @userId, @orderId, @ticketNumber, @ticketCode)
          `);

        createdTickets.push({
          ticketNumber: currentMax,
          ticketCode,
        });
      }

      await transaction.commit();

      return NextResponse.json({
        success: true,
        orderId,
        trackingCode,
        totalAmount,
        ticketCount: count,
        tickets: createdTickets,
      });
    } catch (txError) {
      await transaction.rollback();
      throw txError;
    }
  } catch (error: any) {
    console.error('Purchase ticket error:', error);
    return NextResponse.json(
      { error: 'خطایی در پردازش خرید و صدور بلیت رخ داد.' },
      { status: 500 }
    );
  }
}
