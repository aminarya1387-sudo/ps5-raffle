import nodemailer from 'nodemailer';

interface SendOtpOptions {
  to: string;
  code: string;
  type?: 'login' | 'register';
}

export async function sendOtpEmail({ to, code, type = 'login' }: SendOtpOptions): Promise<{ success: boolean; isMock?: boolean; error?: string }> {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `گیم‌کلاب ایران <${smtpUser || 'noreply@gameclub.ir'}>`;

  // Always log the generated OTP to console for debugging and testing
  console.log(`\n======================================================`);
  console.log(`[AUTH EMAIL OTP] کد تایید برای ایمیل ${to}: [ ${code} ]`);
  console.log(`======================================================\n`);

  // If SMTP credentials are not yet configured, gracefully succeed with mock mode
  if (!smtpUser || !smtpPass) {
    console.log('[EMAIL SERVICE] اطلاعات SMTP_USER یا SMTP_PASS در .env.local تنظیم نشده است. کد در کنسول نمایش داده شد.');
    return { success: true, isMock: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const titleText = type === 'register' ? 'تایید عضویت و ثبت‌نام در سامانه مسابقه' : 'کد یکبار مصرف ورود به حساب کاربری';

    const htmlContent = `
      <div dir="rtl" style="font-family: Tahoma, 'Segoe UI', Arial, sans-serif; background-color: #0c1017; color: #f1f5f9; padding: 30px; text-align: right; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #1e293b;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #38bdf8; margin: 0; font-size: 22px;">گیم‌کلاب ایران</h2>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 5px;">سامانه رسمی قرعه‌کشی کنسول سونی PlayStation 5 Slim</p>
        </div>

        <div style="background-color: #121824; border: 1px solid #222f46; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
          <h3 style="color: #ffffff; font-size: 16px; margin-top: 0; margin-bottom: 15px;">${titleText}</h3>
          <p style="color: #cbd5e1; font-size: 13px; line-height: 1.8; margin-bottom: 25px;">
            سلام، کد تایید یکبار مصرف شما جهت ورود و پیگیری بلیت‌های قرعه‌کشی آماده است:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background-color: #0070d1; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 14px 32px; border-radius: 12px; font-family: monospace;">
              ${code}
            </div>
            <p style="color: #94a3b8; font-size: 11px; margin-top: 10px;">این کد تا ۵ دقیقه آینده دارای اعتبار می‌باشد.</p>
          </div>

          <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; border-top: 1px solid #1e293b; padding-top: 15px; margin-bottom: 0;">
            توجه: این کد اختصاصی و محرمانه است. لطفاً آن را در اختیار افراد دیگر قرار ندهید. اگر شما این درخواست را ثبت نکرده‌اید، این ایمیل را نادیده بگیرید.
          </p>
        </div>

        <div style="text-align: center; color: #64748b; font-size: 11px;">
          پشتیبانی گیم‌کلاب: ۰۲۱-۶۶۷۵۹۸۲۱ | تهران، مجتمع تجاری چارسو
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to,
      subject: `کد تایید ورود به گیم‌کلاب: ${code}`,
      html: htmlContent,
    });

    console.log(`[EMAIL SERVICE] ایمیل با موفقیت به ${to} ارسال شد.`);
    return { success: true, isMock: false };
  } catch (error: any) {
    console.error('[EMAIL SERVICE ERROR]:', error);
    return { success: false, error: error.message };
  }
}
