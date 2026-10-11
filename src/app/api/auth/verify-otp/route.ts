import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import { signUserToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, code, fullName, phoneNumber } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'لطفاً ایمیل و کد تایید ۶ رقمی را وارد کنید.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    const db = await getDb();

    // Verify OTP in EmailOtps table
    const otpResult = await db
      .request()
      .input('email', sql.NVarChar, cleanEmail)
      .input('code', sql.NVarChar, cleanCode)
      .query(`
        SELECT TOP 1 id, expiresAt, used 
        FROM EmailOtps 
        WHERE email = @email AND code = @code AND used = 0
        ORDER BY id DESC
      `);

    if (otpResult.recordset.length === 0) {
      return NextResponse.json(
        { error: 'کد تایید وارد شده نادرست است یا قبلاً استفاده شده است.' },
        { status: 400 }
      );
    }

    const otpRecord = otpResult.recordset[0];
    const now = new Date();
    if (new Date(otpRecord.expiresAt) < now) {
      return NextResponse.json(
        { error: 'اعتبار این کد تایید منقضی شده است. لطفاً کد جدید دریافت کنید.' },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await db
      .request()
      .input('id', sql.Int, otpRecord.id)
      .query('UPDATE EmailOtps SET used = 1 WHERE id = @id');

    // Find or create user
    const userQuery = await db
      .request()
      .input('email', sql.NVarChar, cleanEmail)
      .query('SELECT id, fullName, email, role, phoneNumber FROM Users WHERE email = @email');

    let user: any = null;

    if (userQuery.recordset.length > 0) {
      user = userQuery.recordset[0];

      // Update phone or name if provided and missing
      if (phoneNumber && !user.phoneNumber) {
        await db
          .request()
          .input('id', sql.Int, user.id)
          .input('phone', sql.NVarChar, phoneNumber.trim())
          .query('UPDATE Users SET phoneNumber = @phone WHERE id = @id');
        user.phoneNumber = phoneNumber.trim();
      }
    } else {
      // New user auto-registration via email OTP
      const defaultName = fullName?.trim() || cleanEmail.split('@')[0];
      const randomPassword = Math.random().toString(36).slice(-12) + 'Secret!';
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(randomPassword, salt);

      const insertResult = await db
        .request()
        .input('fullName', sql.NVarChar, defaultName)
        .input('email', sql.NVarChar, cleanEmail)
        .input('passwordHash', sql.NVarChar, passwordHash)
        .input('phoneNumber', sql.NVarChar, phoneNumber?.trim() || null)
        .input('role', sql.NVarChar, 'user')
        .query(`
          INSERT INTO Users (fullName, email, passwordHash, phoneNumber, role)
          OUTPUT INSERTED.id, INSERTED.fullName, INSERTED.email, INSERTED.role
          VALUES (@fullName, @email, @passwordHash, @phoneNumber, @role)
        `);

      user = insertResult.recordset[0];
    }

    // Issue JWT Token
    const token = signUserToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { error: 'خطایی در تایید کد رخ داد. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}
