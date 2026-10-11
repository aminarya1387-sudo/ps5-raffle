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

    const { raffleId, manualTicketNumber, mode } = await req.json();
    const db = await getDb();

    // Check if tickets exist
    const ticketsRes = await db
      .request()
      .input('raffleId', sql.Int, raffleId || 1)
      .query('SELECT t.ticketNumber, t.userId, u.fullName, u.phoneNumber FROM Tickets t JOIN Users u ON t.userId = u.id WHERE t.raffleId = @raffleId');

    if (ticketsRes.recordset.length === 0) {
      return NextResponse.json(
        { error: 'هنوز هیچ بلیتی در این قرعه‌کشی به ثبت نرسیده است.' },
        { status: 400 }
      );
    }

    let winningRecord: any = null;

    if (mode === 'manual' && manualTicketNumber) {
      const targetNum = parseInt(manualTicketNumber, 10);
      winningRecord = ticketsRes.recordset.find((t) => t.ticketNumber === targetNum);
      if (!winningRecord) {
        return NextResponse.json(
          { error: `بلیتی با شماره ${manualTicketNumber} در سیستم پیدا نشد.` },
          { status: 404 }
        );
      }
    } else {
      // Random draw among all purchased tickets
      const randomIndex = Math.floor(Math.random() * ticketsRes.recordset.length);
      winningRecord = ticketsRes.recordset[randomIndex];
    }

    // Update Raffle in SQL Server
    await db
      .request()
      .input('raffleId', sql.Int, raffleId || 1)
      .input('winnerTicketNumber', sql.Int, winningRecord.ticketNumber)
      .input('winnerUserId', sql.Int, winningRecord.userId)
      .input('winnerName', sql.NVarChar, winningRecord.fullName)
      .query(`
        UPDATE Raffles
        SET 
          winnerTicketNumber = @winnerTicketNumber,
          winnerUserId = @winnerUserId,
          winnerName = @winnerName,
          winnerAnnouncedAt = GETDATE(),
          status = 'completed'
        WHERE id = @raffleId
      `);

    return NextResponse.json({
      success: true,
      winner: {
        ticketNumber: winningRecord.ticketNumber,
        fullName: winningRecord.fullName,
        phoneNumber: winningRecord.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Draw winner error:', error);
    return NextResponse.json({ error: 'خطا در ثبت برنده قرعه‌کشی.' }, { status: 500 });
  }
}
