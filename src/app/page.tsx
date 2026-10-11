'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TicketPackages from '@/components/TicketPackages';
import HowItWorks from '@/components/HowItWorks';
import PrizeSpecs from '@/components/PrizeSpecs';
import LiveFeed from '@/components/LiveFeed';
import RulesAndFaq from '@/components/RulesAndFaq';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import PaymentModal from '@/components/PaymentModal';
import UserTicketsModal from '@/components/UserTicketsModal';
import AdminModal from '@/components/AdminModal';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [raffle, setRaffle] = useState<any>(null);
  const [recentTickets, setRecentTickets] = useState<any[]>([]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Selected ticket count for checkout
  const [checkoutTicketCount, setCheckoutTicketCount] = useState<number>(3);

  // Load user and raffle data on mount
  useEffect(() => {
    checkCurrentUser();
    loadRaffleData();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadRaffleData = async () => {
    try {
      const res = await fetch('/api/raffle');
      if (res.ok) {
        const data = await res.json();
        setRaffle(data.raffle);
        setRecentTickets(data.recentTickets || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenBuy = (count: number = 1) => {
    setCheckoutTicketCount(count);
    setIsPaymentOpen(true);
  };

  const handlePurchaseSuccess = () => {
    checkCurrentUser();
    loadRaffleData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c1017] text-slate-100 selection:bg-[#0070d1] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTickets={() => setIsTicketsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onLogout={handleLogout}
        soldPercentage={raffle?.percentage || '0.2'}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          raffle={raffle}
          onBuyClick={() => handleOpenBuy(3)}
          onOpenTickets={() => setIsTicketsOpen(true)}
        />

        {/* Ticket Selection Voucher */}
        <TicketPackages
          ticketPrice={raffle?.ticketPrice ? Number(raffle.ticketPrice) : 200000}
          onSelectTickets={(count) => handleOpenBuy(count)}
        />

        {/* 4-Step Campaign Roadmap */}
        <HowItWorks />

        {/* Prize Specifications Sheet */}
        <PrizeSpecs />

        {/* Live Feed with Quick Search Tool */}
        <LiveFeed recentTickets={recentTickets} />

        {/* Rules & FAQ */}
        <RulesAndFaq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          checkCurrentUser();
        }}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        ticketCount={checkoutTicketCount}
        ticketPrice={raffle?.ticketPrice ? Number(raffle.ticketPrice) : 200000}
        user={user}
        onOpenAuth={() => {
          setIsPaymentOpen(false);
          setIsAuthOpen(true);
        }}
        onSuccess={handlePurchaseSuccess}
      />

      <UserTicketsModal
        isOpen={isTicketsOpen}
        onClose={() => setIsTicketsOpen(false)}
        onGoToBuy={() => {
          setIsTicketsOpen(false);
          handleOpenBuy(3);
        }}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRaffleUpdated={loadRaffleData}
      />
    </div>
  );
}
