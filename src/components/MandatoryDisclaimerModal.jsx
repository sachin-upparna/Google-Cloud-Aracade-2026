/**
 * MandatoryDisclaimerModal.jsx
 * Standalone, 100% SOLID OPAQUE Community Disclaimer Modal.
 * Guaranteed zero transparency, page scroll locking, fixed header & footer,
 * and flawless responsiveness on mobile (320px+) and desktop (650-700px).
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function MandatoryDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode } = useApp();

  // 🔒 Lock page body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAcknowledge = () => {
    setIsOpen(false);
  };

  return (
    /* 
      1. DARK SEMI-TRANSPARENT BACKDROP OVERLAY (z-index: 999999)
      Website behind is dimmed by overlay, but modal itself is 100% SOLID OPAQUE.
    */
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 overflow-hidden"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      {/* 
        2. SOLID 100% OPAQUE DISCLAIMER MODAL CONTAINER (z-index: 1000000)
        CRITICAL: 100% SOLID OPAQUE BACKGROUND COLOR (#ffffff for light, #1c1f26 for dark).
        NO TRANSPARENCY, NO RGBA ON MODAL, NO GLASSMORPHISM, NO BACKDROP-FILTER!
      */}
      <div
        className={`w-[93vw] sm:w-full max-w-[700px] max-h-[82vh] sm:max-h-[78vh] my-auto rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors border ${
          darkMode
            ? 'bg-[#1c1f26] text-gray-100 border-gray-800 shadow-black/90'
            : 'bg-white text-gray-900 border-gray-200 shadow-2xl'
        }`}
        style={{
          backgroundColor: darkMode ? '#1c1f26' : '#ffffff',
          opacity: 1,
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
        }}
      >
        {/* HEADER (FIXED & 100% SOLID) */}
        <div
          className="px-4 py-3.5 sm:px-6 sm:py-4 border-b text-white flex items-center gap-3 flex-shrink-0"
          style={{
            backgroundColor: '#1d4ed8', // 100% Solid Blue (blue-700)
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 flex items-center justify-center text-base sm:text-lg font-bold flex-shrink-0 border border-white/25 text-white">
            ⓘ
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-extrabold tracking-tight leading-tight text-white">
              Important Notice
            </h2>
            <p className="text-2xs sm:text-xs text-blue-100 font-medium">
              Community Progress Portal
            </p>
          </div>
        </div>

        {/* MIDDLE CONTENT SECTION (SCROLLABLE & 100% SOLID) */}
        <div
          className="p-4 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm leading-relaxed flex-1"
          style={{
            backgroundColor: darkMode ? '#1c1f26' : '#ffffff',
            color: darkMode ? '#e8eaed' : '#202124',
          }}
        >
          {/* About This Portal */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-2xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              About This Portal
            </h3>
            <p>
              This is a <strong className="font-extrabold text-gray-900 dark:text-white">community-created progress tracking portal</strong> developed by Google Cloud Arcade Facilitators <strong className="font-extrabold text-gray-900 dark:text-white">Sachin Upparna and Vikas A. L.</strong>
            </p>
          </div>

          {/* Non-Official Notice */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-2xs uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Non-Official Notice
            </h3>
            <p>
              This website is <strong className="font-extrabold text-gray-900 dark:text-white">NOT an official Google or Google Cloud website</strong> and is not operated, maintained, or endorsed by Google.
            </p>
          </div>

          {/* Data Updates */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-2xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Data Updates
            </h3>
            <p>
              The information displayed here is based on the <strong className="font-extrabold text-gray-900 dark:text-white">latest progress reports provided to us by Google</strong> and is updated regularly. Recent activity may take some time to appear.
            </p>
          </div>

          {/* Points Calculation */}
          <div className="space-y-1">
            <h3 className="font-extrabold text-2xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Points Calculation
            </h3>
            <p>
              The points displayed here are <strong className="font-extrabold text-gray-900 dark:text-white">automatically calculated estimates based on the Google Cloud Arcade Facilitator points system</strong>. Since the calculation is automated, occasional inaccuracies or discrepancies may occur.
            </p>
          </div>

          {/* Official Score Verification Warning Box */}
          <div
            className={`p-3.5 sm:p-4 rounded-xl border space-y-1.5 text-xs ${
              darkMode
                ? 'bg-[#28251e] border-amber-800/80 text-amber-200'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
            style={{
              backgroundColor: darkMode ? '#28251e' : '#fffbeb',
            }}
          >
            <p className="font-extrabold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <span>⚠️</span>
              <span>Official Score Verification</span>
            </p>
            <p className="font-semibold leading-normal">
              Please do not consider the points displayed here as your official Arcade score. Always verify your actual points, milestones, badges, and prize eligibility through the official Google Skills Arcade platforms and your own Google profiles.
            </p>
          </div>
        </div>

        {/* FOOTER (FIXED & 100% SOLID WITH ALWAYS-VISIBLE BUTTON) */}
        <div
          className={`px-4 py-3 sm:px-6 sm:py-4 border-t flex-shrink-0 flex items-center justify-center ${
            darkMode
              ? 'bg-[#14161b] border-gray-800'
              : 'bg-gray-50 border-gray-100'
          }`}
          style={{
            backgroundColor: darkMode ? '#14161b' : '#f8f9fa',
          }}
        >
          <button
            onClick={handleAcknowledge}
            className="w-full sm:w-[90%] min-h-[48px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
            }}
          >
            <span>OK, I Understand</span>
            <span className="text-sm font-bold">✓</span>
          </button>
        </div>
      </div>
    </div>
  );
}
