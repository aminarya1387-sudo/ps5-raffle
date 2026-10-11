import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'قرعه‌کشی بزرگ پلی‌استیشن ۵ (Sony PS5 Slim 1TB) | گیم‌کلاب ایران',
  description: 'تنها با ۲۰۰,۰۰۰ تومان در بزرگ‌ترین و شفاف‌ترین قرعه‌کشی کنسول بازی PS5 اسلیم با دسته اضافه اورجینال شرکت کنید. ثبت آنی بلیت در دیتابیس رسمی با کد پیگیری.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
