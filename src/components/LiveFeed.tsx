'use client';

import React, { useState } from 'react';
import { Users, Ticket, Search, ShieldCheck, CheckCircle2, Database } from 'lucide-react';
import { formatNumberFa } from './HeroSection';

interface LiveFeedProps {
  recentTickets: any[];
}

export default function LiveFeed({ recentTickets = [] }: LiveFeedProps) {
  const [filterQuery, setFilterQuery] = useState('');

  // Fallback items if none loaded yet
  const displayItems = recentTickets.length > 0 ? recentTickets : [
    { ticketNumber: 18, ticketCode: 'PS5-00018', maskedName: 'گیمر ***', maskedPhone: '۰۹۳۵***۸۷۷', createdAt: 'امروز' },
    { ticketNumber: 17, ticketCode: 'PS5-00017', maskedName: 'گیمر ***', maskedPhone: '۰۹۳۵***۸۷۷', createdAt: 'امروز' },
    { ticketNumber: 16, ticketCode: 'PS5-00016', maskedName: 'امیر ***', maskedPhone: '۰۹۱۲***۲۳۳', createdAt: 'امروز' },
    { ticketNumber: 15, ticketCode: 'PS5-00015', maskedName: 'امیر ***', maskedPhone: '۰۹۱۲***۲۳۳', createdAt: 'امروز' },
  ];

  const filtered = displayItems.filter((t: any) =>
    String(t.ticketNumber).includes(filterQuery) ||
    t.ticketCode?.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.maskedPhone?.includes(filterQuery) ||
    t.maskedName?.includes(filterQuery)
  );

  return (
    <section id="live-feed" className="py-16 bg-[#0a0e16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>سامانه استعلام و شفافیت بلیت‌ها</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              آخرین بلیت‌های صادر شده در سامانه مسابقه
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              تمامی بلیت‌ها با شماره متوالی و کد رهگیری اختصاصی در سرور SQL Server ثبت و بلافاصله در این جدول قابل استعلام هستند.
            </p>
          </div>

          {/* Quick Search Tool */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="استعلام با شماره بلیت یا ۴ رقم موبایل..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#121824] border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#0070d1] focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3.5" />
          </div>
        </div>

        {/* Live List Table */}
        <div className="store-card overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-[#0e1420] text-xs text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">شماره بلیت</th>
                  <th className="py-3.5 px-6">کد رهگیری بلیت</th>
                  <th className="py-3.5 px-6">نام خریدار</th>
                  <th className="py-3.5 px-6">شماره همراه</th>
                  <th className="py-3.5 px-6 text-left">وضعیت در دیتابیس</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                      هیچ بلیتی با این مشخصات یافت نشد.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#151c2a] transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2 font-black text-amber-400 font-mono">
                          <Ticket className="w-3.5 h-3.5 text-sky-400" />
                          <span>#{formatNumberFa(item.ticketNumber)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#090d14] text-sky-300 border border-slate-700">
                          {item.ticketCode}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-slate-200">
                        {item.maskedName}
                      </td>
                      <td className="py-3.5 px-6 text-slate-400 font-mono text-xs">
                        {item.maskedPhone}
                      </td>
                      <td className="py-3.5 px-6 text-left">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ثبت قطعی
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & Privacy Footer Note */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>اطلاعات تماس شرکت‌کنندگان بر اساس قانون حفاظت از داده‌های شخصی ماسک شده است.</span>
          </div>
          <span>نمایش ۵۰ بلیت اخیر صادرشده در سامانه</span>
        </div>

      </div>
    </section>
  );
}
