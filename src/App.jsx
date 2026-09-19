/**
 * App.jsx
 * Google Developer Community Progress Portal.
 * Features:
 * - Mandatory Disclaimer Modal on every page load / visit
 * - Sticky Navigation Bar with smooth scroll & active section highlighting
 * - Scalable Featured Learners Podium Showcase (Supporting tied ranks per rank card)
 * - Static Community Milestone Guide
 * - Official Google Cloud Arcade Facilitator Points System
 * - Participant Progress Table & Detail Modal with Program Checklist
 */

import React, { useState, useCallback } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import TopLearnersPodium from './components/TopLearnersPodium';
import FacilitatorsNote from './components/FacilitatorsNote';
import SearchAndFilter from './components/SearchAndFilter';
import ProgressTable from './components/ProgressTable';
import CommunityResources from './components/CommunityResources';
import PointsSystemGuide from './components/PointsSystemGuide';
import ParticipantModal from './components/ParticipantModal';
import MandatoryDisclaimerModal from './components/MandatoryDisclaimerModal';
import Footer from './components/Footer';
import ConfettiEffect from './components/ConfettiEffect';

const GradientDivider = () => (
  <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 via-emerald-400 to-indigo-500 rounded-full opacity-40 my-2 shadow-sm" />
);

function AppContent() {
  const { error } = useApp();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleSelect = useCallback(p => setSelectedParticipant(p), []);
  const handleClose = useCallback(() => setSelectedParticipant(null), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Mandatory Disclaimer Modal on every visit/refresh */}
      <MandatoryDisclaimerModal />

      <ConfettiEffect />

      {/* Sticky Public Header & Navbar */}
      <Header />

      {/* 🚀 Overview Hero Section */}
      <section id="overview">
        <Hero />
      </section>

      {/* Error Notice if any */}
      {error && (
        <div className="page-container mt-4">
          <div className="rounded-xl px-4 py-3 text-sm flex items-center gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 shadow-sm">
            <span className="text-base">⚠️</span>
            <span>Could not load leaderboard data: {error}</span>
          </div>
        </div>
      )}

      {/* Main Page Container */}
      <main className="page-container py-10 space-y-10">

        {/* 📊 1. Mission Telemetry & Stats Summary */}
        <section id="community-stats">
          <StatsCards />
        </section>

        <GradientDivider />

        {/* 🏆 2. Hall of Fame (Top Champions) */}
        <section id="top-learners-podium">
          <TopLearnersPodium onSelectParticipant={handleSelect} />
        </section>

        <GradientDivider />

        {/* 🙏 3. Facilitators' Mission Debrief & Portal Closure Notice */}
        <section id="facilitators-note">
          <div id="milestone-guide" className="-mt-20 pt-20" />
          <FacilitatorsNote />
        </section>

        <GradientDivider />

        {/* 🎖️ 4. Final Cadet Roster (Leaderboard) */}
        <section id="progress-table" className="space-y-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              🎖️ Cadet Roster & Final Standings
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Final verified flight records across all 344 cohort cadets — ranked strictly by Total Points (Dense Ranking).
            </p>
          </div>

          <SearchAndFilter
            search={search}
            setSearch={setSearch}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          <ProgressTable
            search={search}
            activeFilter={activeFilter}
            onSelectParticipant={handleSelect}
          />
        </section>

        <GradientDivider />

        {/* 📚 5. Learning Resources & Documentation */}
        <section id="resources">
          <CommunityResources />
        </section>

        <GradientDivider />

        {/* 💯 6. Official Points System Explanation Guide */}
        <section id="points-guide">
          <PointsSystemGuide />
        </section>

        <div id="disclaimer" />

      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      <ParticipantModal
        participant={selectedParticipant}
        onClose={handleClose}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
