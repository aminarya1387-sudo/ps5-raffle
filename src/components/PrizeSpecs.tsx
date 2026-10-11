'use client';

import React, { useState } from 'react';
import { Gamepad2, HardDrive, Cpu, ShieldCheck, Tv, Volume2, Check, Box, Award, Layers } from 'lucide-react';

export default function PrizeSpecs() {
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'warranty'>('specs');

  const technicalSpecs = [
    { label: 'مدل و سال ساخت', value: 'Sony PlayStation 5 Slim Standard Disc Edition (تولید ۲۰۲۴)' },
    { label: 'پارت نامبر و ریجن', value: 'CFI-2016A (ریجن اروپا ۲ - استانداردترین پارت نامبر ایران)' },
    { label: 'پردازنده مرکزی (CPU)', value: 'پردازنده ۸ هسته‌ای AMD Zen 2 با فرکانس متغیر ۳.۵ گیگاهرتز' },
    { label: 'پردازنده گرافیکی (GPU)', value: 'معماری سفارشی AMD RDNA 2 با توان ۱۰.۲۸ ترافلاپس و ۳۶ واحد پردازشی' },
    { label: 'حافظه رم (RAM)', value: '۱۶ گیگابایت حافظه فوق‌سریع GDDR6 با پهنای باند ۴۴۸ گیگابایت بر ثانیه' },
    { label: 'حافظه داخلی (SSD)', value: '۱ ترابایت NVMe SSD اختصاصی با سرعت خواندن ۵.۵ گیگابایت بر ثانیه' },
    { label: 'درایو نوری (Disc Drive)', value: 'درایو بلوری Ultra HD Blu-ray با پشتیبانی از دیسک‌های ۱۰۰ گیگابایتی' },
    { label: 'خروجی تصویر و ویدیو', value: 'پشتیبانی از رزولوشن‌های 4K با ۱۲۰ فریم بر ثانیه، خروجی 8K، HDR10 و VRR' },
    { label: 'فناوری رهگیری پرتو (Ray Tracing)', value: 'پشتیبانی سخت‌افزاری بلادرنگ برای بازتاب و سایه‌پردازی فوق‌العاده' },
    { label: 'فناوری صوتی', value: 'صدای ۳ بعدی اختصاصی Tempest 3D AudioTech' },
    { label: 'پورت‌ها و اتصالات', value: 'پورت HDMI 2.1، دو پورت USB-C پرسرعت، دو پورت USB-A، پورت شبکه LAN، وای‌فای ۶ و بلوتوث ۵.۱' },
  ];

  const boxContents = [
    { title: 'کنسول پلی‌استیشن ۵ اسلیم دیسک‌خور ۱ ترابایت (پلمپ کارخانه سونی)', count: '۱ دستگاه' },
    { title: 'دسته بازی بی‌سیم اصلی DualSense سفید (داخل جعبه کنسول)', count: '۱ عدد' },
    { title: 'دسته بازی بی‌سیم اضافه اورجینال DualSense سونی (آکبند در جعبه مجزا)', count: '۱ عدد' },
    { title: 'کابل رابط فوق‌سریع اورجینال Ultra High Speed HDMI 2.1', count: '۱ عدد' },
    { title: 'کابل شارژ و همگام‌سازی دسته USB-C به USB-C', count: '۱ عدد' },
    { title: 'کابل برق استاندارد اتصال به پریز', count: '۱ عدد' },
    { title: 'پایه‌های نگه‌دارنده افقی کنسول سونی', count: '۲ عدد' },
    { title: 'دفترچه‌های راهنمای کاربری و کارت گارانتی طلایی شرکتی ۱۸ ماهه', count: '۱ نسخه' },
    { title: 'فاکتور رسمی خرید به نام برنده همراه با مهر معتبر فروشگاه گیم‌کلاب', count: '۱ برگ' },
  ];

  const warrantyPoints = [
    { title: 'مدت زمان پوشش گارانتی', desc: '۱۸ ماه گارانتی کامل سخت‌افزاری معتبر از شرکت واردکننده رسمی با کد استعلام سامانه همتا و جامع تجارت.' },
    { title: 'تضمین اصالت کالا و قطعات', desc: 'کنسول و هر دو دسته کاملاً پلمپ، اصل سونی ژاپن و بدون تعویض قطعات جانبی هستند.' },
    { title: 'آنباکس در لایو یا حضور برنده', desc: 'پلمپ دستگاه برای اولین بار در پخش زنده اینستاگرام یا به صورت حضوری در دفتر تهران توسط خود برنده باز خواهد شد.' },
    { title: 'بیمه حمل و خسارت مرسوله', desc: 'در صورت ارسال به شهرستان‌ها، بسته با بیمه ارزش کامل ارسال شده و هرگونه آسیب احتمالی در مسیر بر عهده فروشگاه خواهد بود.' },
  ];

  return (
    <section id="specs" className="py-14 bg-[#0a0e16] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Human Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800/80 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0070d1]" />
              <span>مشخصات فنی و محتویات بسته</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              بررسی تخصصی پکیج PlayStation 5 Slim
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              مشخصات سخت‌افزاری، ریجن دستگاه و فهرست کامل متعلقاتی که به برنده قرعه‌کشی تقدیم خواهد شد.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#121824] px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>گارانتی طلایی ۱۸ ماهه معتبر</span>
          </div>
        </div>

        {/* Tab Controls (Authentic Iranian E-Commerce Tabs) */}
        <div className="flex items-center justify-start gap-2 mb-6 overflow-x-auto pb-2">
          <div className="flex p-1 rounded-xl bg-[#121824] border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'bg-[#0070d1] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>مشخصات فنی سخت‌افزار</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('box')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'box'
                  ? 'bg-[#0070d1] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>محتویات داخل جعبه ({boxContents.length} قلم)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('warranty')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'warranty'
                  ? 'bg-[#0070d1] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>گارانتی و شرایط تحویل</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Technical Specs Table */}
        {activeTab === 'specs' && (
          <div className="store-card overflow-hidden border border-slate-800">
            <div className="divide-y divide-slate-800 text-xs sm:text-sm">
              {technicalSpecs.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 p-4 hover:bg-[#151c2a] transition-colors">
                  <div className="sm:col-span-4 font-bold text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070d1]" />
                    <span>{item.label}</span>
                  </div>
                  <div className="sm:col-span-8 text-slate-400 mt-1 sm:mt-0 font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Box Contents */}
        {activeTab === 'box' && (
          <div className="store-card p-6 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Box className="w-4 h-4 text-sky-400" />
              <span>اقلام ارسالی به برنده به صورت پلمپ و با فاکتور رسمی:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {boxContents.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0e1420] border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 font-medium text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[11px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60 shrink-0 mr-2">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Warranty & Delivery */}
        {activeTab === 'warranty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warrantyPoints.map((item, idx) => (
              <div key={idx} className="store-card p-5 border border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
