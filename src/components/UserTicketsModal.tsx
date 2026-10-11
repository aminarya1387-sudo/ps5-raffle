'use client';

import React, { useEffect, useState } from 'react';
import { X, Ticket, Sparkles, Loader2, QrCode, Calendar, Gamepad2 } from 'lucide-react';
import { formatNumberFa } from './HeroSection';

interface UserTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToBuy: () => void;
}

export default function UserTicketsModal({ isOpen, onClose, onGoToBuy }: UserTicketsModalProps) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchTickets();
    }
  }, [isOpen]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/tickets');
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#121824] p-6 sm:p-7 border border-slate-700 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0070d1]/10 border border-[#0070d1]/20 text-[#38bdf8] flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">بلیت‌های ثبت‌شده شما</h3>
              <p className="text-xs text-slate-400">فهرست بلیت‌های قطعی شما در سرور دیتابیس مسابقه</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 py-4 pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-sky-400 mb-3" />
              <span className="text-xs">در حال بارگذاری بلیت‌های شما...</span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Ticket className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">هنوز بلیتی ثبت نکرده‌اید!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                شما هنوز در قرعه‌کشی کنسول پلی‌استیشن ۵ خریدی ثبت نکرده‌اید. با خرید حداقل ۱ بلیت در جدول قرعه‌کشی ثبت نام کنید.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onGoToBuy();
                }}
                className="btn-playstation px-6 py-2.5 text-xs font-bold cursor-pointer"
              >
                خرید بلیت مسابقه PS5
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl p-4 bg-[#0e1420] border border-slate-800 relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">کد رهگیری بلیت:</span>
                      <span className="font-mono text-sm font-black text-sky-400">
                        {t.ticketCode}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
                      #{formatNumberFa(t.ticketNumber)}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 font-semibold mb-3 flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>پلی‌استیشن ۵ اسلیم ۱TB</span>
                  </div>

                  {/* Barcode Mock */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-slate-500 text-[10px]">
                      {t.trackingCode}
                    </span>
                    <span className="text-emerald-400 font-medium text-[10px]">
                      فعال در جدول قرعه‌کشی
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {tickets.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>تعداد کل بلیت‌های فعال: <strong className="text-white font-bold">{tickets.length} بلیت</strong></span>
            <button
              onClick={() => {
                onClose();
                onGoToBuy();
              }}
              className="text-sky-400 hover:text-sky-300 font-bold transition-colors cursor-pointer"
            >
              + خرید بلیت بیشتر
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
