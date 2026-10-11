import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import sql from 'mssql';
import { signUserToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'لطفاً ایمیل و رمز عبور را وارد کنید.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db
      .request()
      .input('email', sql.NVarChar, email.trim().toLowerCase())
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { error: 'کاربری با این مشخصات یافت نشد.' },
        { status: 401 }
      );
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'رمز عبور وارد شده نادرست است.' },
        { status: 401 }
      );
    }

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
      maxAge: 60 * 60 * 24 * 7,
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
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'خطایی در ورود به سیستم رخ داد.' },
      { status: 500 }
    );
  }
}
