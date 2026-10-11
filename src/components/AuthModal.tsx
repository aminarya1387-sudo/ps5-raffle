'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Phone, ArrowLeft, Loader2, KeyRound, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  // Method: 'otp' (email code) vs 'password' (traditional)
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // OTP flow states
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const resetForm = () => {
    setError(null);
    setSuccessMsg(null);
    setOtpStep('request');
    setOtpCode('');
  };

  // 1. Send OTP to Email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !email.includes('@')) {
      setError('لطفاً یک آدرس ایمیل معتبر وارد کنید.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          type: tab,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطایی در ارسال کد تایید رخ داد.');
      }

      setOtpStep('verify');
      setCountdown(60); // 60 seconds cooldown for resend
      setSuccessMsg(`کد تایید ۶ رقمی به آدرس ${email} ارسال شد.`);
    } catch (err: any) {
      setError(err.message || 'خطا در ارتباط با سرور.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Verify OTP and Login/Register
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setError('لطفاً کد تایید ۶ رقمی را به صورت کامل وارد کنید.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          code: otpCode.trim(),
          fullName: tab === 'register' ? fullName : undefined,
          phoneNumber: tab === 'register' ? phoneNumber : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'کد وارد شده نامعتبر است.');
      }

      onAuthSuccess(data.user);
      onClose();
      resetForm();
    } catch (err: any) {
      setError(err.message || 'خطا در تایید کد.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Traditional Password Login/Register
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = tab === 'login'
        ? { email, password }
        : { fullName, email, password, phoneNumber };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطایی رخ داد.');
      }

      onAuthSuccess(data.user);
      onClose();
      resetForm();
    } catch (err: any) {
      setError(err.message || 'خطا در ارتباط با سرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-[#121824] p-6 sm:p-7 border border-slate-700 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => { onClose(); resetForm(); }}
          className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
            <KeyRound className="w-4 h-4 text-[#0070d1]" />
            <span>سامانه احراز هویت شرکت‌کنندگان</span>
          </div>
          <h3 className="text-lg font-black text-white">
            {authMethod === 'otp' ? 'ورود و ثبت‌نام سریع با کد ایمیل' : (tab === 'login' ? 'ورود با رمز عبور' : 'ثبت‌نام شرکت‌کننده جدید')}
          </h3>
        </div>

        {/* Login / Register Tab Switcher */}
        <div className="flex bg-[#090d14] p-1 rounded-xl mb-4 border border-slate-800">
          <button
            type="button"
            onClick={() => { setTab('login'); resetForm(); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-[#0070d1] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ورود به حساب
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); resetForm(); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-[#0070d1] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ثبت‌نام شرکت‌کننده
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* Method 1: Email OTP (No Password Needed!)                */}
        {/* ======================================================== */}
        {authMethod === 'otp' && (
          <div>
            {otpStep === 'request' ? (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                {tab === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        نام و نام خانوادگی
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="مثال: علی رضایی"
                          className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none"
                        />
                        <User className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        شماره همراه (اختیاری جهت هماهنگی جایزه)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none text-left"
                          dir="ltr"
                        />
                        <Phone className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    آدرس ایمیل شما
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none text-left"
                      dir="ltr"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    یک کد تایید ۶ رقمی به این آدرس ایمیل ارسال خواهد شد.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-playstation w-full py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>ارسال کد تایید به ایمیل</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Step 2: Enter 6-digit Code */
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center py-2">
                  <div className="text-xs text-slate-300 mb-1">
                    کد تایید ۶ رقمی ارسال‌شده به ایمیل زیر را وارد کنید:
                  </div>
                  <div className="text-sm font-bold text-sky-400 font-mono" dir="ltr">
                    {email}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-center">
                    کد ۶ رقمی تایید:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="۱۲۳۴۵۶"
                    className="w-full text-center tracking-[12px] text-2xl font-black py-3 rounded-xl bg-[#090d14] border-2 border-slate-700 text-white focus:border-[#0070d1] focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length !== 6}
                  className="btn-playstation w-full py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>تایید کد و ورود به سیستم</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setOtpStep('request'); setOtpCode(''); setError(null); }}
                    className="hover:text-slate-200 cursor-pointer"
                  >
                    ویرایش ایمیل
                  </button>

                  {countdown > 0 ? (
                    <span className="text-[11px] text-slate-500 font-mono">
                      ارسال مجدد ({countdown} ثانیه)
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>ارسال دوباره کد</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* Method 2: Traditional Password Login/Register            */}
        {/* ======================================================== */}
        {authMethod === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    نام و نام خانوادگی
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: علی رضایی"
                      className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    شماره موبایل
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none text-left"
                      dir="ltr"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                آدرس ایمیل
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none text-left"
                  dir="ltr"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                رمز عبور (حداقل ۶ کاراکتر)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-9 rounded-xl bg-[#090d14] border border-slate-800 text-white text-xs focus:border-[#0070d1] focus:outline-none text-left"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-playstation w-full py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-1"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{tab === 'login' ? 'ورود به سامانه' : 'تکمیل ثبت‌نام و عضویت'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Toggle between OTP and Password modes */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={() => {
              setAuthMethod(authMethod === 'otp' ? 'password' : 'otp');
              resetForm();
            }}
            className="text-xs text-sky-400 hover:text-sky-300 cursor-pointer font-medium"
          >
            {authMethod === 'otp' ? 'ورود با نام کاربری و رمز عبور ثابت' : 'ورود سریع با ارسال کد یکبار مصرف به ایمیل'}
          </button>
        </div>

      </div>
    </div>
  );
}
