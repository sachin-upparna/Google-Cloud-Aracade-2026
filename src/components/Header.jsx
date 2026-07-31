/**
 * Header.jsx
 * Public Navigation Header & Sticky Section Navbar for Google Cloud Arcade Community.
 * Features:
 * - Product identity & link to Arcade portal
 * - Sticky navigation bar with smooth scrolling to sections
 * - Active section highlighting on scroll
 * - Dark mode toggle
 * - Responsive desktop & mobile layouts
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const CloudLogo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path
      d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
      fill="currentColor"
    />
  </svg>
);

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '🏠' },
  { id: 'community-stats', label: 'Statistics', icon: '📊' },
  { id: 'top-learners-podium', label: 'Featured Learners', icon: '⭐' },
  { id: 'milestone-guide', label: 'Milestone Guide', icon: '🎯' },
  { id: 'progress-table', label: 'Leaderboard', icon: '🏆' },
  { id: 'resources', label: 'Resources', icon: '📚' },
  { id: 'points-guide', label: 'Points System', icon: '💯' },
  { id: 'disclaimer', label: 'About / Disclaimer', icon: 'ℹ️' },
];

export default function Header() {
  const { darkMode, toggleDarkMode } = useApp();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white sticky top-0 z-50 shadow-md">
      
      {/* Top Identity Bar */}
      <div className="page-container">
        <div className="flex items-center justify-between h-14 border-b border-white/15">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div className="text-white opacity-95 flex items-center justify-center p-1 rounded-lg bg-white/10">
              <CloudLogo />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white leading-none">
                Google Cloud Arcade
              </span>
              <span className="bg-white/20 text-white text-2xs px-2 py-0.5 rounded-full font-semibold leading-none">
                2026
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/30 mx-1" />
            <span className="hidden sm:block text-2xs text-blue-100 font-medium">
              Community Progress Portal
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://go.cloudskillsboost.google/arcade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xs font-semibold px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 transition-all hidden sm:flex items-center gap-1.5 text-white"
            >
              <span>Arcade Portal</span>
              <svg className="w-3 h-3 opacity-80" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                <path d="M3.5 3h5v5M8.5 3.5L3.5 8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 transition-all text-white"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Sticky Navigation Bar Links */}
      <div className="bg-black/10 backdrop-blur-md overflow-x-auto no-scrollbar">
        <div className="page-container">
          <nav className="flex items-center gap-1 py-1.5 min-w-max text-xs">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-blue-900 shadow-sm'
                      : 'text-blue-100 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

    </header>
  );
}
