/**
 * CountdownTimer.jsx
 * Mobile-first, fully responsive live countdown timer for the Google Cloud Arcade cohort deadline.
 * Target Deadline: 14 September 2026 at 23:59 GMT+5:30.
 * Optimized for all phone viewports (320px to 414px+) and desktop screens without text clipping or awkward wraps.
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
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-indigo-950/60 backdrop-blur-md border-2 border-amber-400/80 rounded-2xl p-4 sm:p-6 shadow-2xl text-white">
        {/* Ambient golden victory glow */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-3xs sm:text-2xs font-black bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 uppercase tracking-wider shadow-sm">
                <span>✅</span> MISSION ACCOMPLISHED
              </span>
              <span className="text-3xs sm:text-xs font-bold text-amber-300">
                Sealed & Finalized: 18 September 2026
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug">
              🎉 Cohort 2026 Flight Log Sealed: Final Standings Live!
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
              Every Arcade Game, Skill Badge, and bonus milestone is finalized and permanently locked in. All <strong>344 cloud cadets</strong> have successfully crossed the finish line!
            </p>

            {/* Note about October 2nd week closure */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-200 text-xs font-semibold">
              <span className="text-base flex-shrink-0">⚠️</span>
              <span>
                <strong>Mission Decommissioning:</strong> This portal will officially sunset on or before the <strong className="text-white underline decoration-amber-400">2nd week of October 2026</strong>. Cadets should take their final screenshots.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 flex-shrink-0 pt-1 lg:pt-0">
            <button
              onClick={() => scrollToSection('top-learners-podium')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98]"
            >
              <span>🏆 Hall of Fame</span>
              <span>→</span>
            </button>
            <button
              onClick={() => scrollToSection('facilitators-note')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98]"
            >
              <span>🙏 Facilitators' Debrief</span>
              <span>→</span>
            </button>
            <button
              onClick={() => scrollToSection('progress-table')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
            >
              <span>🎖️ Cadet Roster</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-red-500/25 backdrop-blur-md border-2 border-amber-400/40 rounded-2xl p-3.5 sm:p-5 shadow-xl text-white">
      {/* Ambient background glow */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
        
        {/* Top / Left Section: Badge, Headline & Explanation */}
        <div className="space-y-2.5 min-w-0 flex-1">
          
          {/* Header Badge & Sub-label */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-3xs sm:text-2xs font-extrabold bg-amber-400 text-gray-900 uppercase tracking-wider shadow-sm w-fit whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              ⚡ Final Cohort Countdown
            </span>
            <span className="text-3xs sm:text-xs font-semibold text-amber-200 leading-tight">
              Ends 14 September 2026 at 23:59 GMT+5:30
            </span>
          </div>

          {/* Headline - Standard block text to avoid word-level flex clipping on mobile */}
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug">
            ⏳ Last <span className="text-amber-300 underline decoration-amber-400 decoration-2 underline-offset-4">{timeLeft.days} {timeLeft.days === 1 ? 'Day' : 'Days'}, {timeLeft.hours} {timeLeft.hours === 1 ? 'Hour' : 'Hours'}</span> Remaining!
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
            The program concludes on <strong className="text-white font-bold">14 September 2026 at 23:59 GMT+5:30</strong>. Complete your Arcade Games and Skill Badges now to lock in your milestone bonus points!
          </p>

          {/* Mobile-optimized action buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={() => scrollToSection('milestone-guide')}
              className="px-3.5 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
            >
              <span>🎯 View Milestone Targets</span>
              <span>→</span>
            </button>
            <button
              onClick={() => scrollToSection('progress-table')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
            >
              <span>🏆 Check Leaderboard</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Live 4-Block Countdown Timer */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 flex-shrink-0 w-full lg:w-auto pt-1 lg:pt-0">
          
          {/* Days */}
          <div className="bg-black/50 border border-white/20 rounded-xl py-2 px-1 sm:p-3 text-center min-w-0 sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-amber-300 tabular-nums leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-amber-100 uppercase tracking-wider mt-1 block truncate">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="bg-black/50 border border-white/20 rounded-xl py-2 px-1 sm:p-3 text-center min-w-0 sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-white tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-wider mt-1 block truncate">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-black/50 border border-white/20 rounded-xl py-2 px-1 sm:p-3 text-center min-w-0 sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-white tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-wider mt-1 block truncate">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-black/50 border border-white/20 rounded-xl py-2 px-1 sm:p-3 text-center min-w-0 sm:min-w-[76px] shadow-inner flex flex-col justify-center">
            <span className="text-xl sm:text-3xl font-black text-emerald-300 tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-200 uppercase tracking-wider mt-1 block truncate">
              Secs
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
