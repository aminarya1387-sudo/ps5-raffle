import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import sql from 'mssql';
import { sendOtpEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, type = 'login' } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate secure 6-digit numeric code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const db = await getDb();

    // Expire previous unused codes for this email
    await db
      .request()
      .input('email', sql.NVarChar, cleanEmail)
      .query(`
        UPDATE EmailOtps 
        SET used = 1 
        WHERE email = @email AND used = 0
      `);

    // Insert new OTP record (valid for 5 minutes)
    await db
      .request()
      .input('email', sql.NVarChar, cleanEmail)
      .input('code', sql.NVarChar, code)
      .query(`
        INSERT INTO EmailOtps (email, code, expiresAt, used)
        VALUES (@email, @code, DATEADD(minute, 5, GETDATE()), 0)
      `);

    // Send the email via nodemailer
    const emailResult = await sendOtpEmail({
      to: cleanEmail,
      code,
      type: type === 'register' ? 'register' : 'login',
    });

    return NextResponse.json({
      success: true,
      message: 'کد تایید ۶ رقمی به آدرس ایمیل شما ارسال شد.',
      isMock: emailResult.isMock || false,
    });
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { error: 'خطایی در ارسال کد تایید رخ داد. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}
