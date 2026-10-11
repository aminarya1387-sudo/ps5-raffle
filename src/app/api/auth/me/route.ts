import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function GET() {
  try {
    const payload = await getCurrentUser();
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    const db = await getDb();
    const result = await db
      .request()
      .input('id', sql.Int, payload.userId)
      .query('SELECT id, fullName, email, phoneNumber, role, createdAt FROM Users WHERE id = @id');

    if (result.recordset.length === 0) {
      return NextResponse.json({ user: null });
    }

    // Get user tickets count
    const ticketsCountResult = await db
      .request()
      .input('userId', sql.Int, payload.userId)
      .query('SELECT COUNT(*) as count FROM Tickets WHERE userId = @userId');

    return NextResponse.json({
      user: {
        ...result.recordset[0],
        ticketsCount: ticketsCountResult.recordset[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null });
  }
}
