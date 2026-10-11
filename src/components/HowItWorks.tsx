'use client';

import React from 'react';
import { CreditCard, Database, Video, Gift, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '۱',
      title: 'انتخاب بلیت و پرداخت آنلاین',
      desc: 'تعداد بلیت مورد نظر خود را انتخاب کرده و هزینه را از طریق درگاه امن شاپرک با کلیه کارت‌های عضو شتاب پرداخت نمایید.',
      icon: <CreditCard className="w-5 h-5 text-sky-400" />,
      tag: 'پرداخت امن شاپرک',
    },
    {
      step: '۲',
      title: 'صدور آنی شماره‌های متوالی',
      desc: 'شماره بلیت‌های اختصاصی شما فوراً در دیتابیس رسمی ثبت شده و از طریق پنل کاربری و بخش استعلام بلیت‌ها قابل مشاهده خواهند بود.',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      tag: 'ثبت در دیتابیس SQL',
    },
    {
      step: '۳',
      title: 'پخش زنده و استخراج شماره برنده',
      desc: 'با تکمیل ظرفیت ۱۰,۰۰۰ بلیت، مراسم قرعه‌کشی با گردونه فیزیکی استاندارد در لایو اینستاگرام با حضور ناظر مستقل برگزار می‌گردد.',
      icon: <Video className="w-5 h-5 text-amber-400" />,
      tag: 'لایو رسمی اینستاگرام',
    },
    {
      step: '۴',
      title: 'تماس زنده و تحویل رایگان کنسول',
      desc: 'در حین برنامه زنده با برنده تماس گرفته شده و کنسول PS5 پلمپ با ۲ دسته و گارانتی ۱۸ ماهه حضوری یا با پست پیشتاز رایگان تحویل می‌شود.',
      icon: <Gift className="w-5 h-5 text-purple-400" />,
      tag: 'تحویل پلمپ و با فاکتور',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 bg-[#0c1017] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800/80 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0070d1]" />
              <span>راهنمای گام به گام شرکت در مسابقه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مراحل شرکت در قرعه‌کشی و دریافت جایزه
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              تمامی مراحل با بالاترین استانداردهای شفافیت، نظارت رسمی و احترام به حقوق کاربران طراحی شده است.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-medium hidden md:block">
            زمان برگزاری: بلافاصله پس از تکمیل ظرفیت
          </div>
        </div>

        {/* 4 Connected Chronological Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#121824] border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0e1420] border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="w-7 h-7 rounded-full bg-[#162032] border border-slate-700 text-white font-mono font-black text-xs flex items-center justify-center">
                    {item.step}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50 inline-block mb-2">
                  {item.tag}
                </span>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>گام {item.step} از ۴</span>
                {idx < steps.length - 1 && (
                  <span className="text-slate-600 hidden lg:inline">
                    <ChevronLeft className="w-4 h-4 text-slate-500" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Footer Banner */}
        <div className="mt-6 p-4 rounded-xl bg-[#0f1522] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>نیاز به راهنمایی بیشتر دارید؟ همکاران ما در دفتر چارسو آماده پاسخگویی تلفنی هستند:</span>
          </div>
          <a
            href="tel:02166759821"
            className="text-sky-400 font-mono font-bold hover:underline shrink-0"
          >
            ۰۲۱-۶۶۷۵۹۸۲۱
          </a>
        </div>

      </div>
    </section>
  );
}
