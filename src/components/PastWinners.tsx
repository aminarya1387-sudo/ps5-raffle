'use client';

import React from 'react';
import Image from 'next/image';
import { Award, CheckCircle2, Calendar, MapPin, Video, ExternalLink } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function PastWinners() {
  const winners = [
    {
      round: 'دوره سوم مسابقات (آبان ۱۴۰۴)',
      prize: 'کنسول بازی Nintendo Switch OLED (سفید)',
      winnerName: 'آقای محمدرضا نادری',
      city: 'تهران (تحویل حضوری در دفتر چارسو)',
      ticketCode: 'SW-03189',
      image: '/images/past_winner.jpg',
      quote: '«باورم نمی‌شد با خرید ۲ تا بلیت برنده بشم! برای تحویل رفتم دفتر چارسو، همونجا پلمپ دستگاه باز شد و تحویل دادن. دمشون گرم.»',
    },
    {
      round: 'دوره دوم مسابقات (شهریور ۱۴۰۴)',
      prize: 'مانیتور گیمینگ ASUS TUF 27 Inch 165Hz',
      winnerName: 'خانم مهسا کاظمی',
      city: 'اصفهان (ارسال رایگان پست پیشتاز بیمه‌شده)',
      ticketCode: 'TUF-01980',
      image: null,
      quote: '«دستگاه با بسته‌بندی عالی و فاکتور رسمی به دستم رسید. توی لایو باهام تماس گرفتن خیلی حس خوبی بود.»',
    },
    {
      round: 'دوره اول مسابقات (تیر ۱۴۰۴)',
      prize: 'هدست واقعیت مجازی Sony PlayStation VR2',
      winnerName: 'آقای آرش طاهری',
      city: 'شیراز (ارسال با تیپاکس هوایی)',
      ticketCode: 'VR-00624',
      image: null,
      quote: '«مراسم قرعه‌کشی رو کامل توی لایو دیدم. همه چی شفاف و دقیق بود. به همه پیشنهاد می‌کنم شرکت کنن.»',
    },
  ];

  return (
    <section id="past-winners" className="py-16 bg-[#0c1017] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>شفافیت و سابقه برگزاری مسابقات</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              برندگان دوره‌های قبلی جشنواره‌های گیم‌کلاب
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              تمامی قرعه‌کشی‌ها به صورت زنده برگزار شده و هدایا همراه با فاکتور رسمی و گارانتی معتبر تحویل برندگان گرامی گردیده است.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all shrink-0 w-fit"
          >
            <InstagramIcon className="w-4 h-4 text-rose-400" />
            <span>مشاهده ویدیوهای تحویل در هایلایت اینستاگرام</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Featured Past Winner with Real Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center store-card p-6 sm:p-8 border border-slate-800 mb-10">
          
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-[#0a0e14]">
              <Image
                src="/images/past_winner.jpg"
                alt="تحویل جایزه به برنده دوره قبل گیم‌کلاب"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] text-slate-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>تحویل حضوری در دفتر چارسو</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>دوره سوم مسابقات رسمی • آبان ۱۴۰۴</span>
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              تحویل کنسول Nintendo Switch OLED به {winners[0].winnerName}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>تهران (صادقیه)</span>
              </span>
              <span>•</span>
              <span>شماره بلیت برنده: <strong className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded">{winners[0].ticketCode}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">تحویل حضوری و رسمی</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-[#0a0e14] p-4 rounded-xl border border-slate-800/80">
              {winners[0].quote}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Video className="w-3.5 h-3.5 text-sky-400" />
                <span>ویدیوی ضبط‌شده مراسم قرعه‌کشی در آرشیو پیج موجود است.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Other Previous Winners Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {winners.slice(1).map((item, idx) => (
            <div key={idx} className="store-card p-5 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold text-amber-400/90">{item.round}</span>
                  <span className="font-mono bg-[#0a0e14] px-2 py-0.5 rounded border border-slate-800 text-[11px] text-slate-300">
                    بلیت: {item.ticketCode}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  جایزه: {item.prize}
                </h4>
                <div className="text-xs text-slate-400 mb-3">
                  برنده: <strong className="text-slate-200">{item.winnerName}</strong> • {item.city}
                </div>
                <p className="text-xs text-slate-300 italic bg-[#0a0e14] p-3 rounded-lg border border-slate-800/80">
                  {item.quote}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> تحویل قطعی با فاکتور و ضمانت
                </span>
                <span>استعلام شده در سامانه</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
