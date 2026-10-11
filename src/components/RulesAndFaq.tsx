'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Video, Gift, Award, FileText, CheckCircle2, Lock } from 'lucide-react';

export default function RulesAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const guarantees = [
    {
      title: 'نظارت رسمی و استخراج زنده برنده',
      desc: 'استخراج شماره بلیت برنده منحصراً در لایو اینستاگرام با استفاده از گردونه استاندارد فیزیکی و با حضور ناظر مستقل انجام می‌پذیرد تا فرآیند به صورت ۱۰۰٪ شفاف و بدون دخالت نرم‌افزاری باشد.',
      icon: <Video className="w-5 h-5 text-sky-400" />,
    },
    {
      title: 'تماس مستقیم و احراز هویت در لایو',
      desc: 'همزمان با بیرون آمدن گوی‌های شماره بلیت، در پخش زنده با شماره همراه برنده تماس برقرار شده و مکالمه پخش می‌شود. تطبیق شماره بلیت و اطلاعات ثبت‌شده در سیستم مبنای تایید است.',
      icon: <Award className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'تحویل پلمپ کارخانه با ضمانت ۱۸ ماهه',
      desc: 'کنسول پلی‌استیشن ۵ اسلیم به همراه ۲ دسته و کارت گارانتی طلایی ۱۸ ماهه، یا به صورت حضوری در دفتر تهران تحویل داده شده و یا با پست پیشتاز بیمه‌شده رایگان ارسال می‌گردد.',
      icon: <Gift className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const faqs = [
    {
      q: 'قرعه‌کشی دقیقاً چه زمانی و با چه شرایطی برگزار می‌شود؟',
      a: 'به محض تکمیل ظرفیت ۱۰,۰۰۰ بلیت مصوب، فرآیند فروش در سامانه متوقف شده و تاریخ و ساعت دقیق برگزاری مراسم زنده در صفحه اصلی سایت و پیج اینستاگرام اطلاع‌رسانی می‌شود (حداکثر ظرف ۴۸ ساعت پس از تکمیل ظرفیت).',
    },
    {
      q: 'مراسم استخراج شماره برنده به چه شکل انجام می‌شود؟',
      a: 'مراسم به صورت پخش زنده با حضور ناظر مستقل و معتبر انجام می‌گیرد. از گردونه قرعه‌کشی استاندارد فیزیکی جهت استخراج گوی‌های شماره بلیت استفاده خواهد شد تا هیچ‌گونه شک و شبهه‌ای باقی نماند.',
    },
    {
      q: 'آیا امکان خرید همزمان چند بلیت توسط یک کاربر وجود دارد؟',
      a: 'بله، هر کاربر می‌تواند هر تعداد بلیت که تمایل دارد (۱، ۳، ۵، ۱۰ یا بیشتر) خریداری نماید. برای هر خرید، شماره بلیت‌های مستقل و متوالی با کد رهگیری اختصاصی صادر شده و در دیتابیس ثبت می‌شود.',
    },
    {
      q: 'نحوه تحویل کنسول PS5 به برنده چگونه خواهد بود؟',
      a: 'در صورت حضور برنده در تهران، تحویل به صورت حضوری در دفتر مرکزی واقع در مجتمع تجاری چارسو انجام می‌شود. برای برندگان سایر استان‌ها، کنسول با بسته‌بندی ضدضربه و پست پیشتاز بیمه‌شده (با سقف ارزش کامل کالا) به صورت کاملاً رایگان ارسال می‌گردد.',
    },
    {
      q: 'آیا برای تحویل جایزه، مبلغی تحت عنوان مالیات یا هزینه پست دریافت می‌شود؟',
      a: 'خیر، هیچ‌گونه وجهی تحت هیچ عنوان (مالیات، کارمزد، هزینه پست یا بیمه) از برنده مسابقه دریافت نخواهد شد و تمامی هزینه‌ها بر عهده فروشگاه گیم‌کلاب ایران است.',
    },
    {
      q: 'چگونه می‌توانم بلیت‌های خریداری‌شده خود را دوباره مشاهده کنم؟',
      a: 'در بالای همین صفحه روی دکمه «استعلام بلیت‌های من» کلیک کنید و شماره موبایل خود را وارد نمایید. کلیه شماره بلیت‌ها و کدهای رهگیری صادرشده برای شما بلافاصله نمایش داده خواهند شد.',
    },
  ];

  return (
    <section id="faq" className="py-14 bg-[#0a0e16] border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800/80 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0070d1]" />
              <span>پاسخگویی و رفع ابهامات</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              پرسش‌های متداول شرکت‌کنندگان
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              پاسخ به متداول‌ترین سوالات درباره ثبت بلیت‌ها، زمان قرعه‌کشی و شرایط تحویل جایزه.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#121824] px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>تعهدات رسمی و حقوقی فروشگاه</span>
          </div>
        </div>

        {/* 3 Trust Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {guarantees.map((item, idx) => (
            <div key={idx} className="store-card p-5 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0e1420] border border-slate-800 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ضمانت اجرایی قطعی</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="store-card border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#0070d1]" />
                    <span>{faq.q}</span>
                  </span>
                  <span className="p-1 rounded-lg bg-[#0e1420] text-slate-400 shrink-0 border border-slate-800">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 bg-[#090d14]/40 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
