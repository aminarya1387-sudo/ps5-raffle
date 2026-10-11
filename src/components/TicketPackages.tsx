'use client';

import React, { useState } from 'react';
import { Ticket, CheckCircle2, Plus, Minus, CreditCard, ShieldCheck, FileText, Sparkles, QrCode } from 'lucide-react';
import { formatToman, formatNumberFa } from './HeroSection';

interface TicketPackagesProps {
  onSelectTickets: (count: number) => void;
  ticketPrice: number;
}

export default function TicketPackages({ onSelectTickets, ticketPrice = 200000 }: TicketPackagesProps) {
  const [selectedCount, setSelectedCount] = useState<number>(3);

  const presets = [
    { count: 1, label: '۱ بلیت' },
    { count: 2, label: '۲ بلیت' },
    { count: 3, label: '۳ بلیت' },
    { count: 5, label: '۵ بلیت' },
    { count: 10, label: '۱۰ بلیت' },
  ];

  const handleCustomChange = (delta: number) => {
    const next = selectedCount + delta;
    if (next >= 1 && next <= 50) {
      setSelectedCount(next);
    }
  };

  const totalPrice = selectedCount * ticketPrice;

  return (
    <section id="buy" className="py-14 bg-[#0a0e16] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Human Section Header (Iranian E-Commerce Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0070d1]" />
              <span>سامانه صدور بلیت‌های رسمی مسابقه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              خرید بلیت رسمی شرکت در قرعه‌کشی PlayStation 5
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              بهای مصوب هر بلیت ۲۰۰,۰۰۰ تومان است. بلیت‌ها بلافاصله پس از پرداخت اینترنتی با کد رهگیری اختصاصی در دیتابیس ثبت و صادر می‌شوند.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#121824] px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ظرفیت مسابقه: ۱۰,۰۰۰ بلیت رسمی</span>
          </div>
        </div>

        {/* The Realistic Perforated Ticket Voucher Card */}
        <div className="relative rounded-2xl bg-[#121927] border border-[#222f46] shadow-2xl overflow-hidden mb-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Right Side (Col 1-8): Main Interactive Ticket Selection */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
              
              {/* Ticket Top Meta */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <Ticket className="w-4 h-4 text-[#0070d1]" />
                    <span>بلیت الکترونیکی ورود به جدول قرعه‌کشی رسمی</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 bg-[#090d14] px-2.5 py-1 rounded border border-slate-800">
                    رویداد: GC-PS5-SLIM-2024
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    تعیین تعداد بلیت‌های درخواستی
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    می‌توانید از گزینه‌های سریع زیر انتخاب کنید یا تعداد دلخواه را با دکمه‌های + و - تنظیم نمایید:
                  </p>
                </div>

                {/* Quick Presets Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
                  {presets.map((p) => {
                    const isSelected = selectedCount === p.count;
                    return (
                      <button
                        key={p.count}
                        type="button"
                        onClick={() => setSelectedCount(p.count)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#0070d1]/15 border-[#0070d1] text-white shadow-md'
                            : 'bg-[#0e1420] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#131b2b]'
                        }`}
                      >
                        <span className="text-sm font-black">{p.label}</span>
                        <span className="text-[11px] text-slate-400 font-mono mt-1">
                          {formatNumberFa(p.count * 200)} هزار
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Quantity Stepper */}
                <div className="p-4 rounded-xl bg-[#0e1420] border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <div className="text-xs text-slate-300 font-medium">
                    تنظیم دقیق تعداد بلیت (حداکثر ۵۰ بلیت در هر فاکتور):
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      id="btn-decrement-tickets"
                      onClick={() => handleCustomChange(-1)}
                      disabled={selectedCount <= 1}
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white flex items-center justify-center transition-all cursor-pointer text-lg font-bold"
                      aria-label="کاهش تعداد بلیت"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="w-16 text-center">
                      <span className="text-xl font-black text-white font-mono">
                        {formatNumberFa(selectedCount)}
                      </span>
                      <span className="text-[11px] text-slate-400 block -mt-1 font-medium">بلیت</span>
                    </div>

                    <button
                      type="button"
                      id="btn-increment-tickets"
                      onClick={() => handleCustomChange(1)}
                      disabled={selectedCount >= 50}
                      className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white flex items-center justify-center transition-all cursor-pointer text-lg font-bold"
                      aria-label="افزایش تعداد بلیت"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation & Checkout Bar */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">مبلغ کل فاکتور:</span>
                    <div className="text-2xl font-black text-emerald-400">
                      {formatToman(totalPrice)}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      ({formatNumberFa(selectedCount)} بلیت × ۲۰۰,۰۰۰ تومان) • بدون مالیات و کارمزد
                    </span>
                  </div>

                  <button
                    type="button"
                    id="btn-checkout-tickets"
                    onClick={() => onSelectTickets(selectedCount)}
                    className="btn-playstation py-3.5 px-7 flex items-center justify-center gap-2 text-sm font-black cursor-pointer shadow-lg shrink-0"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>پرداخت شاپرک و صدور {formatNumberFa(selectedCount)} بلیت</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Left Side (Col 9-12): Perforated Customer Receipt Stub */}
            <div className="lg:col-span-4 relative bg-[#0d121c] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-dashed border-slate-700">
              
              {/* Notch Cuts for Perforation Effect */}
              <div className="hidden lg:block ticket-notch-top" />
              <div className="hidden lg:block ticket-notch-bottom" />

              <div>
                {/* Official Stamp & Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="official-stamp px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                    تایید اصالت قرعه‌کشی
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">رسید الکترونیکی</span>
                </div>

                <div className="text-xs text-slate-300 font-bold mb-3">
                  مشخصات جایزه رویداد:
                </div>
                
                <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 text-xs text-slate-300 space-y-1.5 mb-5">
                  <div className="font-bold text-white">Sony PlayStation 5 Slim 1TB</div>
                  <div className="text-[11px] text-slate-400">• ریجن ۲ اروپا (CFI-2016A)</div>
                  <div className="text-[11px] text-slate-400">• همراه ۲ دسته بی‌سیم DualSense</div>
                  <div className="text-[11px] text-emerald-400 font-medium">• ۱۸ ماه گارانتی شرکتی طلایی</div>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>شماره‌های اختصاصی:</span>
                    <span className="font-bold text-sky-400 font-mono">
                      {formatNumberFa(selectedCount)} شماره متوالی یکتا
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>نحوه تحویل:</span>
                    <span className="text-slate-200">حضوری در تهران / پیشتاز رایگان</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>ثبت در سامانه:</span>
                    <span className="text-emerald-400 font-medium">ثبت آنی و سیستمی</span>
                  </div>
                </div>
              </div>

              {/* Security Barcode Simulation */}
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <div className="h-10 flex items-center justify-between gap-1 px-2 py-1 bg-white/5 rounded">
                  <span className="barcode-line w-1" />
                  <span className="barcode-line w-0.5" />
                  <span className="barcode-line w-1.5" />
                  <span className="barcode-line w-0.5" />
                  <span className="barcode-line w-1" />
                  <span className="barcode-line w-2" />
                  <span className="barcode-line w-0.5" />
                  <span className="barcode-line w-1" />
                  <span className="barcode-line w-1.5" />
                  <span className="barcode-line w-0.5" />
                  <span className="barcode-line w-2" />
                  <span className="barcode-line w-1" />
                  <span className="barcode-line w-0.5" />
                  <span className="barcode-line w-1.5" />
                  <span className="barcode-line w-1" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1.5 px-1">
                  <span>GC-PS5-VALID-TICKET</span>
                  <span>کد امنیتی SHA-256</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Reassurance Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>اتصال مستقیم به شبکه پرداخت شاپرک (رمزنگاری امن)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-sky-400 shrink-0" />
            <span>صدور آنی فاکتور رسمی با شماره بلیت‌های اختصاصی</span>
          </div>
          <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>امکان استعلام آنلاین بلیت‌ها در هر لحظه با شماره همراه</span>
          </div>
        </div>

      </div>
    </section>
  );
}
