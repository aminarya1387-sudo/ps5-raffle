'use client';

import React from 'react';
import { Gamepad2, Ticket, User, ShieldCheck, LogOut } from 'lucide-react';

interface NavbarProps {
  user: any;
  onOpenAuth: () => void;
  onOpenTickets: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
  soldPercentage: string;
}

export default function Navbar({
  user,
  onOpenAuth,
  onOpenTickets,
  onOpenAdmin,
  onLogout,
  soldPercentage,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d121c]/95 border-b border-slate-800 backdrop-blur-md">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0070d1] text-white shadow-md shadow-[#0070d1]/30">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white">
                گیم‌کلاب ایران
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-bold">
                جشنواره رسمی سونی
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              مرکز تخصصی کنسول‌های بازی و لوازم جانبی (فروشگاه آنلاین و حضوری)
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-300">
          <a href="#overview" className="hover:text-sky-400 transition-colors">
            معرفی کنسول PS5
          </a>
          <a href="#buy" className="hover:text-sky-400 transition-colors">
            خرید بلیت مسابقه
          </a>
          <a href="#how-it-works" className="hover:text-sky-400 transition-colors">
            مراحل مسابقه
          </a>
          <a href="#specs" className="hover:text-sky-400 transition-colors">
            مشخصات فنی و پکیج
          </a>
          <a href="#live-feed" className="hover:text-sky-400 transition-colors">
            فهرست بلیت‌ها
          </a>
          <a href="#faq" className="hover:text-sky-400 transition-colors">
            قوانین و سوالات
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {/* My Tickets Button */}
              <button
                id="btn-my-tickets"
                onClick={onOpenTickets}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-sky-400" />
                <span>بلیت‌های من</span>
                <span className="bg-[#0070d1] text-white text-[11px] px-2 py-0.5 rounded-full font-black">
                  {user.ticketsCount || 0}
                </span>
              </button>

              {/* Admin Panel button if admin */}
              {user.role === 'admin' && (
                <button
                  id="btn-admin-panel"
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">پنل مدیریت</span>
                </button>
              )}

              {/* Logout Button */}
              <button
                id="btn-logout"
                onClick={onLogout}
                title="خروج از حساب"
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="btn-open-auth"
              onClick={onOpenAuth}
              className="btn-playstation flex items-center gap-2 px-5 py-2.5 text-xs font-bold cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>ورود یا ثبت‌نام در سامانه</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
