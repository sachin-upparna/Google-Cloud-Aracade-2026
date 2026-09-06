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
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-md transition-all">
      {/* Ambient background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-300 blur-3xl" />
      </div>

      <div className="page-container py-8 relative z-10 space-y-6">

        {/* Announcement Marquee Bar */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-sm shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="flex-shrink-0 bg-yellow-400 text-gray-900 font-bold text-2xs uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
              Announcement
            </span>
            <p
              className="text-white text-sm font-medium truncate transition-opacity duration-300"
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
                    i === announcementIdx ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Announcement ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ⏳ Deadline Countdown Timer Section */}
        <CountdownTimer />

        {/* Main Welcome Hero Content */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Title & Tagline */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/15 text-blue-100 px-3 py-1 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official Facilitator Community Portal 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
              Google Cloud Arcade <br className="hidden sm:block" />
              <span className="text-blue-100">Community Progress</span>
            </h1>
            <p className="text-blue-100 text-base sm:text-lg font-normal leading-relaxed">
              Track your learning journey. Celebrate milestones. Keep building with the community.
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs text-blue-200">
              <span>Facilitators: <strong className="text-white">Sachin Upparna</strong> & <strong className="text-white">Vikas A. L.</strong></span>
            </div>
          </div>

          {/* Rotating Motivational Quote Card */}
          <div className="lg:w-80 bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-3 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="font-semibold uppercase tracking-wider text-yellow-300 flex items-center gap-1">
                ⭐ Daily Inspiration
              </span>
              <span className="text-base">☁️</span>
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
                      i === quoteIdx ? 'bg-yellow-300 w-3' : 'bg-white/40'
                    }`}
                    aria-label={`Quote ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Official Point Calculation Disclaimer Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 space-y-2 text-blue-50 text-xs">
          <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider text-xs">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-yellow-300 flex-shrink-0">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 4a1 1 0 110 2 1 1 0 010-2zm1 8H9v-5h2v5z"/>
            </svg>
            <span>Point Calculation Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            The points displayed on this dashboard are calculated automatically based on the official Google Cloud Arcade Facilitator point system and the latest CSV provided by Google.
          </p>
          <p className="leading-relaxed">
            While every effort has been made to match Google's official calculations, these values are generated automatically and may not always be 100% accurate due to changes in program rules or data interpretation.
          </p>
          <p className="leading-relaxed font-semibold text-white">
            Please verify your final points manually using the official Google Cloud Arcade Facilitator points system and your latest progress report.
          </p>
        </div>

        {/* Timestamp & Disclaimer Bar */}
        <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-blue-100">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6.5"/>
              <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round"/>
            </svg>
            <span>
              <strong>Last Updated:</strong> {lastUpdated ?? (loading ? 'Loading…' : 'Regularly updated')}
            </span>
          </div>
          <p className="italic text-blue-200">
            Data is refreshed whenever the latest facilitator report is uploaded. If your recent progress is not yet visible, it will appear in the next update.
          </p>
        </div>

      </div>
    </div>
  );
}
