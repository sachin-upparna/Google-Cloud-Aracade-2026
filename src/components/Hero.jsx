/**
 * Hero.jsx
 * Vibrant Google Cloud Arcade Hero Section with Announcement Marquee,
 * Motivational Quotes, and the Official Point Calculation Disclaimer Card.
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import CountdownTimer from './CountdownTimer';

export default function Hero() {
  const { lastUpdated, loading, updatesData } = useApp();

  const announcements = updatesData?.announcements || [];
  const quotes = updatesData?.motivationalMessages || [];

  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [fadeAnnounce, setFadeAnnounce] = useState(true);
  const [fadeQuote, setFadeQuote] = useState(true);

  // Announcement Rotation
  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setFadeAnnounce(false);
      setTimeout(() => {
        setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
        setFadeAnnounce(true);
      }, 300);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Quote Rotation
  useEffect(() => {
    if (quotes.length <= 1) return;
    const timer = setInterval(() => {
      setFadeQuote(false);
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % quotes.length);
        setFadeQuote(true);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const currentAnnouncement = announcements.length > 0
    ? announcements[announcementIdx]
    : "No announcements available.";

  const currentQuote = quotes.length > 0
    ? quotes[quoteIdx]
    : "Keep learning and building your cloud skills.";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border-b border-amber-500/30 text-white shadow-2xl transition-all">
      {/* Ambient cosmic starlight and nebulae */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="page-container py-8 relative z-10 space-y-6">

        {/* Announcement Marquee Bar */}
        <div className="bg-black/40 backdrop-blur-md border border-amber-400/30 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-sm shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="flex-shrink-0 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-2xs uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <span>🎖️</span> MISSION LOG
            </span>
            <p
              className="text-amber-100 text-sm font-medium truncate transition-opacity duration-300"
              style={{ opacity: fadeAnnounce ? 1 : 0 }}
            >
              {currentAnnouncement}
            </p>
          </div>
          {announcements.length > 1 && (
            <div className="hidden sm:flex gap-1.5 flex-shrink-0">
              {announcements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setAnnouncementIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === announcementIdx ? 'bg-amber-400 w-4' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Announcement ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ⏳ Mission Status & Sunset Protocol Banner */}
        <CountdownTimer />

        {/* Main Welcome Hero Content */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Title & Tagline */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              🎖️ MISSION COMPLETE • COHORT 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              Google Cloud Arcade <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Mission Accomplished 🏆
              </span>
            </h1>
            <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed">
              The 2026 expedition has reached its final destination! 344 cloud explorers conquered quests, built cloud architectures, and secured their permanent place in the Hall of Fame.
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs text-amber-200/90 font-medium">
              <span>Mission Facilitators: <strong className="text-white underline decoration-amber-400/60">Sachin Upparna</strong> & <strong className="text-white underline decoration-amber-400/60">Vikas A. L.</strong></span>
            </div>
          </div>

          {/* Rotating Motivational Quote Card / Flight Log */}
          <div className="lg:w-80 bg-black/40 backdrop-blur-md border border-amber-400/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between gap-3 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-amber-200">
              <span className="font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                ⭐ Final Flight Reflection
              </span>
              <span className="text-base">🚀</span>
            </div>
            <p
              className="text-sm font-medium text-white italic leading-snug transition-opacity duration-300"
              style={{ opacity: fadeQuote ? 1 : 0 }}
            >
              "{currentQuote}"
            </p>
            {quotes.length > 1 && (
              <div className="flex justify-end gap-1.5 pt-1">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setQuoteIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === quoteIdx ? 'bg-amber-400 w-3' : 'bg-white/40'
                    }`}
                    aria-label={`Quote ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Official Point Calculation Disclaimer Card */}
        <div className="bg-black/35 backdrop-blur-md border border-amber-400/25 rounded-2xl p-4 sm:p-5 space-y-2 text-slate-200 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider text-xs">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-amber-400 flex-shrink-0">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 4a1 1 0 110 2 1 1 0 010-2zm1 8H9v-5h2v5z"/>
            </svg>
            <span>Official Flight Log & Points Verification</span>
          </div>
          <p className="leading-relaxed">
            All points displayed on this mission portal are calculated automatically based on the official Google Cloud Arcade Facilitator point system and the finalized CSV dataset.
          </p>
          <p className="leading-relaxed font-medium text-slate-300">
            Standings are locked in. Rankings are strictly determined by pure total points earned across the 2026 cohort.
          </p>
        </div>

        {/* Timestamp & Disclaimer Bar */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              <strong>Final Flight Log Verified:</strong> {lastUpdated ?? (loading ? 'Loading…' : 'Final Update (18 Sep 2026)')}
            </span>
          </div>
          <p className="italic text-amber-300 font-semibold flex items-center gap-1.5">
            <span>⚠️</span>
            <span>Mission Sunset Protocol: Decommissioning on or before 2nd week of October 2026.</span>
          </p>
        </div>

      </div>
    </div>
  );
}
