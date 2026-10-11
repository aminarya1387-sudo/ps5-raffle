import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import sql from 'mssql';
import { signUserToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { fullName, email, password, phoneNumber } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'لطفاً نام کامل، ایمیل و رمز عبور را وارد کنید.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const existing = await db
      .request()
      .input('email', sql.NVarChar, email.trim().toLowerCase())
      .query('SELECT id FROM Users WHERE email = @email');

    if (existing.recordset.length > 0) {
      return NextResponse.json(
        { error: 'این ایمیل قبلاً در سامانه ثبت شده است.' },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const insertResult = await db
      .request()
      .input('fullName', sql.NVarChar, fullName.trim())
      .input('email', sql.NVarChar, email.trim().toLowerCase())
      .input('passwordHash', sql.NVarChar, passwordHash)
      .input('phoneNumber', sql.NVarChar, phoneNumber?.trim() || null)
      .input('role', sql.NVarChar, 'user')
      .query(`
        INSERT INTO Users (fullName, email, passwordHash, phoneNumber, role)
        OUTPUT INSERTED.id, INSERTED.fullName, INSERTED.email, INSERTED.role
        VALUES (@fullName, @email, @passwordHash, @phoneNumber, @role)
      `);

    const user = insertResult.recordset[0];
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'خطایی در ثبت‌نام رخ داد. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}
