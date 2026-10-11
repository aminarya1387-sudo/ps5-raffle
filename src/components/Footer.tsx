'use client';

import React from 'react';
import { Gamepad2, ShieldCheck, Phone, Mail, Award, MapPin, Send, Clock, CheckCircle2, CreditCard, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#090d14] pt-14 pb-10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1: Store Intro & Official Address */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0070d1] text-white shadow-md">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-white">
                  فروشگاه تخصصی گیم‌کلاب ایران
                </span>
                <span className="text-[11px] text-slate-400 block font-medium">
                  عرضه تخصصی کنسول‌های بازی، لوازم جانبی و جشنواره‌های رسمی
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              فروشگاه گیم‌کلاب ایران با بیش از ۵ سال سابقه فعالیت در مجتمع تجاری چارسو تهران، واردکننده و توزیع‌کننده مستقیم کنسول‌های بازی اورجینال سونی، مایکروسافت و نینتندو در ایران است. تمامی رویدادها با مجوز رسمی و ارائه فاکتور معتبر برگزار می‌گردند.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>دفتر مرکزی و تحویل حضوری: تهران، خیابان جمهوری، تقاطع حافظ، مجتمع تجاری چارسو، طبقه ۲، واحد ۴۱۰ (کد پستی: ۱۱۳۵۶۳۳۵۱۱)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تلفن تماس فروشگاه: ۰۲۱-۶۶۷۵۹۸۲۱ | ۰۲۱-۶۶۷۵۹۸۲۲ (ساعت ۱۰ الی ۲۰)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ساعات کاری و پاسخگویی: شنبه تا چهارشنبه ۱۰:۰۰ الی ۲۰:۰۰ | پنج‌شنبه‌ها ۱۰:۰۰ الی ۱۶:۰۰</span>
              </div>
            </div>
          </div>

          {/* Col 2: Live Stream & Social Verification */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              کانال‌های رسمی اطلاع‌رسانی
            </h4>

            <div className="space-y-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#121824] hover:bg-[#162030] border border-slate-800 text-xs transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-white block">پخش زنده قرعه‌کشی</span>
                  <span className="text-[10px] text-slate-400 font-mono">@gameclub_official</span>
                </div>
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#121824] hover:bg-[#162030] border border-slate-800 text-xs transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#229ed9] flex items-center justify-center text-white shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">کانال رسمی تلگرام</span>
                  <span className="text-[10px] text-slate-400 font-mono">t.me/gameclub_iran</span>
                </div>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-slate-300 font-bold block">پوشش بیمه مرسولات:</span>
              <p>کلیه بسته‌های ارسالی به شهرستان‌ها با بیمه ارزش کامل تعهد شده توسط شرکت ملی پست ارسال می‌شوند.</p>
            </div>
          </div>

          {/* Col 3: Real Trust Badges (Enamad, Samandehi, Senf, Shaparak) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              مجوزها و تاییدیه‌های رسمی
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Enamad */}
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-1 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white">اینماد ۲ ستاره</span>
                <span className="text-[10px] text-slate-500">وزارت صمت</span>
              </div>

              {/* Samandehi */}
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-1 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white">نشان ساماندهی</span>
                <span className="text-[10px] text-slate-500">وزارت ارشاد</span>
              </div>

              {/* Senf */}
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center mb-1 text-sky-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white">اتحادیه رایانه</span>
                <span className="text-[10px] text-slate-500">پروانه کسب تهران</span>
              </div>

              {/* Shaparak */}
              <div className="p-3 rounded-xl bg-[#121824] border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center mb-1 text-purple-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white">درگاه شاپرک</span>
                <span className="text-[10px] text-slate-500">بانک مرکزی ایران</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#121824] border border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>پشتیبانی و پیگیری ۲۴ ساعته تا زمان تحویل جایزه</span>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© کلیه حقوق مادی و معنوی این وب‌سایت برای فروشگاه گیم‌کلاب ایران محفوظ است.</p>
          <p className="text-[11px]">
            فعالیت این سایت منطبق بر قوانین جمهوری اسلامی ایران و قانون تجارت الکترونیکی است.
          </p>
        </div>

      </div>
    </footer>
  );
}
