'use client';

import React from 'react';
import Image from 'next/image';
import { Gamepad2, ShieldCheck, Cpu, Award, Zap, Users, CheckCircle2, ChevronRight, Truck, Box, PhoneCall, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  raffle: any;
  onBuyClick: () => void;
  onOpenTickets?: () => void;
}

export function formatToman(amount: number | string): string {
  const num = typeof amount === 'string' ? parseInt(amount, 10) : amount;
  return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
}

export function formatNumberFa(num: number | string): string {
  return new Intl.NumberFormat('fa-IR').format(Number(num));
}

export default function HeroSection({ raffle, onBuyClick, onOpenTickets }: HeroSectionProps) {
  const percentage = raffle?.percentage || '0.2';
  const sold = raffle?.soldTickets || 18;
  const total = raffle?.totalTickets || 10000;
  const remaining = raffle?.remainingTickets || (total - sold);

  return (
    <section id="overview" className="pt-6 pb-12 bg-[#0c1017] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 overflow-x-auto py-1">
          <a href="#" className="hover:text-slate-200">صفحه اصلی</a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 rotate-180" />
          <a href="#buy" className="hover:text-slate-200">جشنواره‌ها و مسابقات رسمی</a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 rotate-180" />
          <span className="text-slate-300 font-medium">قرعه‌کشی کنسول سونی PlayStation 5 Slim</span>
          <span className="text-slate-600 mr-2">|</span>
          <span className="text-slate-500 font-mono text-[11px]">شناسه رویداد: GC-PS5-2016</span>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Column: Campaign Information & Action Dashboard */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Live Campaign Status Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-[#0070d1]/15 text-[#38bdf8] border border-[#0070d1]/30 text-xs font-bold">
                کنسول بازی خانگی نسل نهم سونی
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>جشنواره فعال و در حال پذیرش</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                ریجن اروپا CFI-2016
              </span>
            </div>

            {/* Campaign Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
              قرعه‌کشی بزرگ کنسول سونی PlayStation 5 Slim <br />
              <span className="text-[#38bdf8] text-xl sm:text-2xl font-bold">
                نسخه دیسک‌خور ۱ ترابایت با دو دسته اورجینال DualSense
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              یک دستگاه کنسول سونی PlayStation 5 Slim آکبند و پلمپ کارخانه به همراه دو عدد دسته بازی بی‌سیم DualSense، کابل Ultra High Speed HDMI 2.1 و ۱۸ ماه گارانتی شرکتی طلایی. با خرید بلیت ۲۰۰ هزار تومانی، شماره بلیت یکتای خود را دریافت کرده و در لایو رسمی اینستاگرام شرکت کنید!
            </p>

            {/* Campaign Dashboard Card */}
            <div className="store-card-featured p-6 rounded-2xl mb-6 border border-[#232f48]">
              
              <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Users className="w-4 h-4 text-[#0070d1]" />
                  <span>وضعیت تکمیل ظرفیت بلیت‌ها:</span>
                </div>
                <div className="text-sky-400 font-black text-sm sm:text-base">
                  {percentage}٪ تکمیل شده ({formatNumberFa(sold)} از ۱۰,۰۰۰ بلیت)
                </div>
              </div>

              {/* Progress Bar Container with Milestones */}
              <div className="relative w-full h-4 bg-[#0a0e16] rounded-full overflow-hidden p-0.5 border border-slate-700/80 mb-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00439c] via-[#0070d1] to-[#38bdf8] transition-all duration-700 relative overflow-hidden"
                  style={{ width: `${Math.max(1, parseFloat(percentage))}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-soft-shimmer" />
                </div>
              </div>

              {/* Milestone Markers */}
              <div className="flex justify-between text-[10px] text-slate-500 mb-5 px-1 font-mono">
                <span>۰ بلیت</span>
                <span>۲,۵۰۰ بلیت (۲۵٪)</span>
                <span>۵,۰۰۰ بلیت (۵۰٪)</span>
                <span>۷,۵۰۰ بلیت (۷۵٪)</span>
                <span className="text-amber-400 font-bold">۱۰,۰۰۰ بلیت (برگزاری لایو)</span>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-center">
                <div className="p-2.5 rounded-xl bg-[#0e1420] border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">بلیت‌های صادرشده</div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    {formatNumberFa(sold)}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0e1420] border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">بلیت‌های باقی‌مانده</div>
                  <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">
                    {formatNumberFa(remaining)}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0e1420] border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">بهای هر بلیت</div>
                  <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
                    ۲۰۰,۰۰۰ تومان
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#buy"
                  id="btn-hero-buy"
                  className="btn-playstation w-full sm:flex-1 py-3.5 px-6 flex items-center justify-center gap-2 text-sm font-black cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current text-amber-300" />
                  <span>خرید بلیت مسابقه و ثبت در قرعه‌کشی</span>
                </a>

                {onOpenTickets && (
                  <button
                    type="button"
                    onClick={onOpenTickets}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>استعلام بلیت‌های من</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Specs Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>۱۸ ماه گارانتی شرکتی</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>شامل ۲ دسته DualSense</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>حافظه ۱ ترابایت SSD</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>درایو دیسک 4K UHD</span>
              </div>
            </div>

          </div>

          {/* Left Column: The Central PS5 High-Res Product Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full relative rounded-2xl overflow-hidden bg-[#121824] border border-slate-800 p-4 shadow-2xl">
              
              {/* Product Badges */}
              <div className="absolute top-6 right-6 z-10 flex flex-col gap-1.5 items-start">
                <span className="px-2.5 py-1 rounded bg-[#0070d1] text-white text-[11px] font-bold shadow">
                  پکیج رسمی سونی
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                  همراه با ۲ دسته اصلی
                </span>
              </div>

              {/* The Hero Image (Exact image the user loved) */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0a0e14] flex items-center justify-center p-3">
                <Image
                  src="/images/ps5.jpg"
                  alt="Sony PlayStation 5 Slim Standard Disc Edition + 2 Controllers"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* Product Identity Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#0e1420] border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Sony PlayStation 5 Slim (Disc Edition)</div>
                  <div className="text-[11px] text-slate-400">ریجن اروپا CFI-2016 • حافظه ۱ ترابایت پرسرعت</div>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                  پلمپ شرکتی
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Feature Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-slate-800/80">
          
          <div className="p-3.5 rounded-xl bg-[#0e1420] border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">ضمانت اصالت ۱۰۰٪ پلمپ سونی</div>
              <div className="text-[11px] text-slate-400 mt-0.5">ریجن ۲ اروپا با ۱۸ ماه گارانتی شرکتی</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1420] border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">تحویل چارسو یا ارسال پیشتاز</div>
              <div className="text-[11px] text-slate-400 mt-0.5">تحویل حضوری در تهران یا پست بیمه‌شده رایگان</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1420] border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">شفافیت کامل در پخش زنده</div>
              <div className="text-[11px] text-slate-400 mt-0.5">استخراج با گردونه استاندارد فیزیکی در لایو</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1420] border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">پشتیبانی و استعلام آنلاین</div>
              <div className="text-[11px] text-slate-400 mt-0.5">ثبت آنی در دیتابیس با صدور کد پیگیری</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
