/**
 * Header.jsx
 * Public Navigation Header & Sticky Section Navbar for Google Cloud Arcade Community.
 * Desktop (≥ md): 100% preserved desktop top bar + sticky horizontal tab bar.
 * Mobile (< md): Native Hamburger Menu (☰) + Slide-in Navigation Drawer.
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
  { id: 'community-stats', label: 'Community Statistics', icon: '📊' },
  { id: 'top-learners-podium', label: 'Featured Learners', icon: '⭐' },
  { id: 'milestone-guide', label: 'Milestone Guide', icon: '🎯' },
  { id: 'progress-table', label: 'Leaderboard', icon: '🏆' },
  { id: 'resources', label: 'Learning Resources', icon: '📚' },
  { id: 'points-guide', label: 'Points System', icon: '💯' },
  { id: 'disclaimer', label: 'About / Disclaimer', icon: 'ℹ️' },
];

export default function Header() {
  const { darkMode, toggleDarkMode } = useApp();
  const [activeSection, setActiveSection] = useState('overview');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active section scroll listener
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
    setIsDrawerOpen(false); // Auto-close drawer on mobile
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
          
          {/* Mobile Hamburger + Logo */}
          <div className="flex items-center gap-2.5">
            {/* Hamburger Button (Mobile only) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center"
              aria-label="Open Navigation Drawer"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            {/* Logo & Product Identity */}
            <div className="flex items-center gap-2">
              <div className="text-white opacity-95 flex items-center justify-center p-1 rounded-lg bg-white/10">
                <CloudLogo />
              </div>
              <div className="flex items-center gap-1.5">
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
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://go.cloudskillsboost.google/arcade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xs font-semibold px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 transition-all flex items-center gap-1.5 text-white"
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

      {/* Desktop Sticky Navigation Bar Links (Hidden on Mobile) */}
      <div className="hidden md:block bg-black/10 backdrop-blur-md overflow-x-auto no-scrollbar">
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

      {/* Mobile Slide-in Navigation Drawer Overlay & Content */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Slide-in Drawer Container */}
          <div className="fixed top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudLogo />
                <div>
                  <h3 className="font-bold text-sm leading-tight">Google Cloud Arcade</h3>
                  <p className="text-2xs text-blue-200">Community Progress Portal</p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                aria-label="Close Drawer"
              >
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="p-3 space-y-1 flex-1">
              <p className="px-3 py-1.5 text-2xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Navigation Menu
              </p>

              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all text-left ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-2xs text-gray-500 dark:text-gray-400 space-y-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                Google Cloud Arcade Facilitators
              </p>
              <p>Sachin Upparna · Vikas A. L.</p>
              <p className="italic text-blue-600 dark:text-blue-400 pt-1">
                "Learn · Build · Grow Together"
              </p>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
