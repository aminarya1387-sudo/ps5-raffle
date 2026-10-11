'use client';

import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Users, DollarSign, Ticket, Award, Search, Shuffle, CheckCircle, Loader2, RotateCcw } from 'lucide-react';
import { formatToman, formatNumberFa } from './HeroSection';
import confetti from 'canvas-confetti';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRaffleUpdated: () => void;
}

export default function AdminModal({ isOpen, onClose, onRaffleUpdated }: AdminModalProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [manualTicket, setManualTicket] = useState('');
  const [drawMode, setDrawMode] = useState<'random' | 'manual'>('random');
  const [drawing, setDrawing] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [drawResult, setDrawResult] = useState<any>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAdminStats();
    }
  }, [isOpen]);

  const fetchAdminStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDraw = async () => {
    setDrawing(true);
    setActionError(null);
    setDrawResult(null);

    try {
      const res = await fetch('/api/admin/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raffleId: 1,
          mode: drawMode,
          manualTicketNumber: manualTicket ? parseInt(manualTicket, 10) : undefined,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(resJson.error || 'خطایی رخ داد.');
      }

      setDrawResult(resJson.winner);

      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
        });
      } catch (e) {}

      fetchAdminStats();
      onRaffleUpdated();
    } catch (err: any) {
      setActionError(err.message || 'خطا در قرعه‌کشی.');
    } finally {
      setDrawing(false);
    }
  };

  const handleResetDraw = async () => {
    if (!confirm('آیا مطمئن هستید؟ با این کار وضعیت قرعه‌کشی مجدداً به حالت «در حال فروش» برمی‌گردد و برنده قبلی پاک می‌شود تا بتوانید دوباره قرعه‌کشی را انجام دهید. (تمامی بلیت‌های خریداری‌شده محفوظ خواهند ماند)')) {
      return;
    }

    setResetting(true);
    setActionError(null);

    try {
      const res = await fetch('/api/admin/reset-draw', {
        method: 'POST',
      });
      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(resJson.error || 'خطا در بازنشانی وضعیت.');
      }

      setDrawResult(null);
      await fetchAdminStats();
      onRaffleUpdated();
    } catch (err: any) {
      setActionError(err.message || 'خطا در بازنشانی وضعیت قرعه‌کشی.');
    } finally {
      setResetting(false);
    }
  };

  if (!isOpen) return null;

  const tickets = data?.tickets || [];
  const filteredTickets = tickets.filter((t: any) =>
    t.ticketCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phoneNumber?.includes(searchTerm) ||
    String(t.ticketNumber).includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-card p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">پنل مدیریت قرعه‌کشی پلی‌استیشن ۵</h3>
              <p className="text-xs text-slate-400">نظارت زنده بر پایگاه داده SQL Server و انجام مراسم قرعه‌کشی</p>
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
        <div className="overflow-y-auto flex-1 py-4 space-y-6 pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-amber-400 mb-3" />
              <span className="text-xs">در حال بارگذاری اطلاعات مدیریت از SQL Server...</span>
            </div>
          ) : (
            <>
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Users className="w-4 h-4 text-sky-400" />
                    <span>کل کاربران</span>
                  </div>
                  <div className="text-xl font-black text-white">
                    {formatNumberFa(data?.stats?.totalUsers || 0)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Ticket className="w-4 h-4 text-amber-400" />
                    <span>بلیت‌های ثبتی</span>
                  </div>
                  <div className="text-xl font-black text-amber-400">
                    {formatNumberFa(data?.stats?.totalIssuedTickets || 0)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>کل درآمد ریالی</span>
                  </div>
                  <div className="text-lg font-black text-emerald-400 truncate">
                    {formatToman(data?.stats?.totalRevenue || 0)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span>وضعیت جشنواره</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {data?.stats?.raffleStatus === 'completed' ? (
                        <span className="text-emerald-400 font-bold">پایان یافته (برنده مشخص شد)</span>
                      ) : (
                        <span className="text-sky-400 font-bold">در حال فروش و آماده قرعه‌کشی</span>
                      )}
                    </div>
                  </div>

                  {data?.stats?.raffleStatus === 'completed' && (
                    <button
                      type="button"
                      onClick={handleResetDraw}
                      disabled={resetting}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      title="بازنشانی وضعیت به فعال برای امکان قرعه‌کشی مجدد"
                    >
                      {resetting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>بازنشانی به حالت فعال</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Base Sold Control Box */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      تنظیم تعداد بلیت‌های پایه دیتابیس (پراگرس‌بار)
                    </h4>
                    <p className="text-xs text-slate-400">
                      بلیت‌های واقعی خریداری‌شده در دیتابیس: <strong className="text-emerald-400 font-bold">{data?.stats?.totalIssuedTickets || 0} عدد</strong> | 
                      پایه ثبت شده در SQL Server: <strong className="text-sky-400 font-bold">{data?.raffle?.soldTickets || 0} عدد</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        await fetch('/api/admin/config', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ baseSoldTickets: 0 }),
                        });
                        fetchAdminStats();
                        onRaffleUpdated();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      تنظیم روی صفر (۰٪ واقعی)
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const val = prompt('تعداد بلیت‌های پایه را وارد کنید:', String(data?.raffle?.soldTickets || 0));
                        if (val !== null && !isNaN(parseInt(val, 10))) {
                          await fetch('/api/admin/config', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ baseSoldTickets: parseInt(val, 10) }),
                          });
                          fetchAdminStats();
                          onRaffleUpdated();
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all cursor-pointer"
                    >
                      تغییر دستی عدد پایه
                    </button>
                  </div>
                </div>
              </div>

              {/* Winner Draw Tool */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/25">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white">ابزار برگزاری قرعه‌کشی و اعلام برنده (مخصوص لایو)</h4>
                  </div>
                  {data?.stats?.raffleStatus === 'completed' && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                      قرعه‌کشی انجام شده
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  شما می‌توانید انتخاب برنده را به صورت تصادفی به الگوریتم سیستم بسپارید، یا در صورت استخراج شماره در گردونه فیزیکی لایو اینستاگرام، شماره بلیت را دستی وارد کنید.
                </p>

                {actionError && (
                  <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                    {actionError}
                  </div>
                )}

                {(drawResult || (data?.stats?.raffleStatus === 'completed' && data?.stats?.winnerName)) ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center mb-4 animate-fade-in">
                    <CheckCircle className="w-9 h-9 text-emerald-400 mx-auto mb-2" />
                    <span className="text-xs text-emerald-300 font-bold block">برنده ثبت‌شده قرعه‌کشی پلی‌استیشن ۵:</span>
                    <div className="text-xl font-black text-white mt-1">
                      {drawResult?.fullName || data?.stats?.winnerName} (شماره بلیت #{formatNumberFa(drawResult?.ticketNumber || data?.stats?.winnerTicketNumber)})
                    </div>
                    {drawResult?.phoneNumber && (
                      <div className="text-xs text-slate-400 font-mono mt-1">
                        شماره تماس: {drawResult.phoneNumber}
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleResetDraw}
                        disabled={resetting}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {resetting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RotateCcw className="w-4 h-4" />
                        )}
                        <span>لغو برنده و بازگشت به حالت قبلی (آماده قرعه‌کشی مجدد)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setDrawMode('random')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          drawMode === 'random' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                        }`}
                      >
                        قرعه‌کشی خودکار رندوم
                      </button>
                      <button
                        type="button"
                        onClick={() => setDrawMode('manual')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          drawMode === 'manual' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                        }`}
                      >
                        ورود دستی شماره بلیت
                      </button>
                    </div>

                    {drawMode === 'manual' && (
                      <input
                        type="number"
                        placeholder="شماره بلیت برنده (مثلاً: 1341)"
                        value={manualTicket}
                        onChange={(e) => setManualTicket(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs w-full sm:w-48 focus:border-amber-400 focus:outline-none"
                      />
                    )}

                    <button
                      id="btn-trigger-draw"
                      onClick={handleDraw}
                      disabled={drawing}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                    >
                      {drawing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Shuffle className="w-4 h-4" />
                          <span>{drawMode === 'random' ? 'استخراج تصادفی برنده' : 'ثبت قطعی برنده'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Ticket Search and Table */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white">لیست کل بلیت‌های صادر شده</h4>
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="جستجو در نام، شماره یا کد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-1.5 pr-8 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-sky-400 focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute top-2.5 right-2.5" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 overflow-hidden max-h-72 overflow-y-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-900 text-slate-400 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-4">شماره بلیت</th>
                        <th className="py-2.5 px-4">کد بلیت</th>
                        <th className="py-2.5 px-4">نام خریدار</th>
                        <th className="py-2.5 px-4">تلفن همراه</th>
                        <th className="py-2.5 px-4">ایمیل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredTickets.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-500">
                            موردی یافت نشد.
                          </td>
                        </tr>
                      ) : (
                        filteredTickets.map((t: any) => (
                          <tr key={t.id} className="hover:bg-slate-800/40">
                            <td className="py-2.5 px-4 font-mono font-bold text-amber-400">
                              #{t.ticketNumber}
                            </td>
                            <td className="py-2.5 px-4 font-mono text-sky-300">
                              {t.ticketCode}
                            </td>
                            <td className="py-2.5 px-4 text-white">
                              {t.fullName}
                            </td>
                            <td className="py-2.5 px-4 font-mono text-slate-300">
                              {t.phoneNumber || '-'}
                            </td>
                            <td className="py-2.5 px-4 font-mono text-slate-400">
                              {t.email}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
