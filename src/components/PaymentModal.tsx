'use client';

import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Ticket, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatToman } from './HeroSection';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketCount: number;
  ticketPrice: number;
  user: any;
  onOpenAuth: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  ticketCount,
  ticketPrice,
  user,
  onOpenAuth,
  onSuccess,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = ticketCount * ticketPrice;

  const handlePay = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tickets/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketCount,
          raffleId: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطایی در ثبت سفارش رخ داد.');
      }

      setOrderResult(data);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti errors if any
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'خطا در پرداخت.');
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setOrderResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121824] p-6 sm:p-7 border border-slate-700 shadow-2xl">
        
        {/* Close Button */}
        {!loading && (
          <button
            onClick={orderResult ? handleDone : onClose}
            className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* State 1: Successful Order & Tickets Display */}
        {orderResult ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-xl font-black text-white mb-1">
              پرداخت با موفقیت انجام شد
            </h3>
            <p className="text-xs text-slate-300 mb-5">
              بلیت‌های شما با موفقیت در دیتابیس رسمی مسابقه پلی‌استیشن ۵ ثبت شدند.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-[#0e1420] rounded-xl p-4 border border-slate-800 text-xs mb-5 text-right space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">کد رهگیری بانکی:</span>
                <span className="font-mono text-sky-400 font-bold">{orderResult.trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">مبلغ پرداخت شده:</span>
                <span className="font-bold text-white">{formatToman(orderResult.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">تعداد بلیت‌های خریداری‌شده:</span>
                <span className="font-bold text-amber-400">{orderResult.ticketCount} بلیت</span>
              </div>
            </div>

            {/* Issued Tickets List */}
            <div className="mb-5 text-right">
              <span className="text-xs font-bold text-slate-300 block mb-2">
                شماره بلیت‌های اختصاصی صادر شده:
              </span>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {orderResult.tickets?.map((t: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#090d14] border border-slate-800 text-xs font-mono"
                  >
                    <span className="text-amber-400 font-bold">بلیت شماره #{t.ticketNumber}</span>
                    <span className="text-sky-300 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800">
                      {t.ticketCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleDone}
              className="btn-playstation w-full py-3 px-4 text-xs font-bold cursor-pointer"
            >
              مشاهده و بازگشت به صفحه اصلی
            </button>
          </div>
        ) : (
          /* State 2: Checkout & Payment Gateway Simulation */
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0070d1]/10 border border-[#0070d1]/20 text-[#38bdf8] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">
                  فاکتور پرداخت بانکی و صدور بلیت
                </h3>
                <p className="text-xs text-slate-400">
                  اتصال امن به درگاه شاپرک با پروتکل رمزنگاری SSL
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Invoice Breakdown */}
            <div className="bg-[#0e1420] rounded-xl p-4 border border-slate-800 space-y-2.5 mb-5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>رویداد:</span>
                <span className="font-bold text-white">قرعه‌کشی PlayStation 5 Slim دیسک‌خور + دسته اضافه</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>تعداد بلیت‌های انتخابی:</span>
                <span className="font-black text-sky-400">{ticketCount} بلیت</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>قیمت واحد هر بلیت:</span>
                <span>۲۰۰,۰۰۰ تومان</span>
              </div>
              <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-sm">
                <span className="font-bold text-white">مبلغ کل قابل پرداخت:</span>
                <span className="text-lg font-black text-amber-400">
                  {formatToman(totalAmount)}
                </span>
              </div>
            </div>

            {/* Gateway Badge Simulator */}
            <div className="p-3.5 rounded-xl bg-[#090d14] border border-slate-800 flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs">
                  ZP
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">درگاه پرداخت الکترونیک شاپرک</span>
                  <span className="text-[10px] text-slate-400">تایید شده توسط شاپرک و بانک مرکزی</span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                فعال
              </span>
            </div>

            {/* Action Button */}
            {!user ? (
              <button
                onClick={onOpenAuth}
                className="btn-playstation w-full py-3.5 px-4 text-xs font-bold cursor-pointer"
              >
                برای پرداخت، ابتدا وارد حساب خود شوید
              </button>
            ) : (
              <button
                id="btn-confirm-pay"
                onClick={handlePay}
                disabled={loading}
                className="btn-playstation w-full py-3.5 px-4 text-xs font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال اتصال به بانک و صدور بلیت...</span>
                  </>
                ) : (
                  <span>تأیید و پرداخت آزمایشی {formatToman(totalAmount)}</span>
                )}
              </button>
            )}

            <p className="text-center text-[10px] text-slate-500 mt-3">
              🛡️ در محیط دمو، به محض کلیک دکمه پرداخت تراکنش ثبت و بلیت‌ها در دیتابیس SQL Server ایجاد می‌شوند.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
