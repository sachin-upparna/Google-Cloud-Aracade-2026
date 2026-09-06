/**
 * CountdownTimer.jsx
 * Dynamic live countdown timer for the Google Cloud Arcade cohort deadline (September 14, 2026).
 * Computes remaining time from current time and displays:
 * "Last X Days, Y Hours Remaining" along with live countdown cards.
 */

import React, { useState, useEffect } from 'react';

// Target Deadline: 14 September 2026 at 23:59 GMT+5:30
const DEADLINE = new Date('2026-09-14T23:59:00+05:30');

function getTimeRemaining() {
  const total = DEADLINE.getTime() - new Date().getTime();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds, isEnded: false };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (timeLeft.isEnded) {
    return (
      <div className="bg-amber-500/20 backdrop-blur-md border border-amber-400/40 rounded-2xl p-4 text-center text-white shadow-lg">
        <span className="font-extrabold text-base sm:text-lg">
          🏁 Google Cloud Arcade Cohort 2026 has concluded!
        </span>
        <p className="text-xs text-amber-200 mt-1">
          Thank you for building, learning, and participating! Final results are now being processed.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-red-500/25 backdrop-blur-md border-2 border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-xl text-white">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        
        {/* Left Side: Deadline Info & Dynamic Message */}
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-amber-400 text-gray-900 uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              ⚡ Final Cohort Countdown
            </span>
            <span className="text-2xs font-semibold text-amber-200">
              Deadline: 14 September 2026 at 23:59 GMT+5:30
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>⏳ Last</span>
            <span className="text-amber-300 underline decoration-amber-400/60 underline-offset-4">
              {timeLeft.days} {timeLeft.days === 1 ? 'Day' : 'Days'}, {timeLeft.hours} {timeLeft.hours === 1 ? 'Hour' : 'Hours'}
            </span>
            <span>Remaining!</span>
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            The program concludes on <strong className="text-white">14 September 2026 at 23:59 GMT+5:30</strong>. Complete your Arcade Games and Skill Badges now to lock in your milestone bonus points!
          </p>

          {/* Quick jump action links */}
          <div className="pt-1 flex items-center gap-3 text-xs font-bold">
            <button
              onClick={() => scrollToSection('milestone-guide')}
              className="text-amber-300 hover:text-amber-200 underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              <span>🎯 View Milestone Targets</span>
              <span>→</span>
            </button>
            <span className="text-white/30">•</span>
            <button
              onClick={() => scrollToSection('progress-table')}
              className="text-blue-200 hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              <span>🏆 Check Leaderboard</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Side: Live 4-Block Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0 w-full sm:w-auto">
          
          {/* Days */}
          <div className="bg-black/40 border border-white/20 rounded-xl p-2 sm:p-3 text-center min-w-[64px] sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-amber-300 tabular-nums leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-3xs sm:text-2xs font-bold text-amber-100 uppercase tracking-wider mt-1 block">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-black/40 border border-white/20 rounded-xl p-2 sm:p-3 text-center min-w-[64px] sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-white tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-3xs sm:text-2xs font-bold text-blue-200 uppercase tracking-wider mt-1 block">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-black/40 border border-white/20 rounded-xl p-2 sm:p-3 text-center min-w-[64px] sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-white tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-3xs sm:text-2xs font-bold text-blue-200 uppercase tracking-wider mt-1 block">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-black/40 border border-white/20 rounded-xl p-2 sm:p-3 text-center min-w-[64px] sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-emerald-300 tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-3xs sm:text-2xs font-bold text-emerald-200 uppercase tracking-wider mt-1 block">
              Secs
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
