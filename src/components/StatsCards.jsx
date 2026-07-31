/**
 * StatsCards.jsx
 * Dashboard Statistic Cards arranged in a 2-row grid (3 cards top row, 3 cards bottom row).
 * Features 6 core community metrics:
 * Row 1: 🔵 Total Participants, 🟢 Total Arcade Games, 🟡 Total Skill Badges
 * Row 2: 🟠 General Milestones, 🔴 Bonus Milestones, 🔵 AI Agent Verified
 * (Removed Avg Arcade Points and Avg Total Points as requested).
 */

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

// Material SVG Icons
const Icons = {
  people: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
  games: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H8v-2H6v-1h2V10h1v2h2v1zm4.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5-1.5zm3-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5-1.5z"/>
    </svg>
  ),
  badges: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h7v6h2V8h7v6z"/>
    </svg>
  ),
  aiBot: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2a2 2 0 012 2c0 .74-.4 1.38-1 1.72V7h2a3 3 0 013 3v2h1a2 2 0 012 2v3a2 2 0 01-2 2h-1v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1H5a2 2 0 01-2-2v-3a2 2 0 012-2h1v-2a3 3 0 013-3h2V5.72A2.002 2.002 0 0110 4c0-1.11.89-2 2-2zm-3 8a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zm-5.5 5a.5.5 0 000 1h5a.5.5 0 000-1h-5z"/>
    </svg>
  ),
};

// Animated counting number
const AnimatedNumber = ({ target, duration = 700 }) => {
  const [val, setVal] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (target === 0) { setVal(0); return; }
    const from = startRef.current;
    const diff = target - from;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + diff * ease));
      if (p < 1) requestAnimationFrame(tick);
      else startRef.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return <span>{val.toLocaleString()}</span>;
};

const StatCard = ({ label, value, sublabel, theme, icon, delay = 0 }) => (
  <div
    className={`card rounded-2xl p-5 border-2 ${theme.border} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between fade-up bg-white dark:bg-gray-900`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-2xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <div className={`text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight ${theme.text}`}>
          {typeof value === 'number' ? <AnimatedNumber target={value} /> : value}
        </div>
      </div>
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${theme.iconBg}`}>
        {icon}
      </div>
    </div>

    {sublabel && (
      <p className="text-2xs text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        {sublabel}
      </p>
    )}
  </div>
);

export default function StatsCards() {
  const { stats, loading } = useApp();

  const metrics = [
    {
      label: 'Total Participants',
      value: stats.total ?? 0,
      sublabel: 'Active cohort learners',
      icon: Icons.people,
      theme: {
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-600 text-white',
      },
    },
    {
      label: 'Total Arcade Games',
      value: stats.totalArcadeGames ?? 0,
      sublabel: 'Completed games',
      icon: Icons.games,
      theme: {
        border: 'border-emerald-200 dark:border-emerald-800',
        text: 'text-emerald-600 dark:text-emerald-400',
        iconBg: 'bg-emerald-600 text-white',
      },
    },
    {
      label: 'Total Skill Badges',
      value: stats.totalSkillBadges ?? 0,
      sublabel: 'Community badges',
      icon: Icons.badges,
      theme: {
        border: 'border-amber-200 dark:border-amber-800',
        text: 'text-amber-600 dark:text-amber-400',
        iconBg: 'bg-amber-600 text-white',
      },
    },
    {
      label: 'General Milestones',
      value: stats.milestoneCount ?? 0,
      sublabel: 'Earned milestone learners',
      icon: Icons.star,
      theme: {
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-600 dark:text-orange-400',
        iconBg: 'bg-orange-600 text-white',
      },
    },
    {
      label: 'Bonus Milestones',
      value: stats.bonusMilestoneCount ?? 0,
      sublabel: '+10 Bonus point earners',
      icon: Icons.gift,
      theme: {
        border: 'border-rose-200 dark:border-rose-800',
        text: 'text-rose-600 dark:text-rose-400',
        iconBg: 'bg-rose-600 text-white',
      },
    },
    {
      label: 'AI Agent Verified',
      value: stats.aiAgentCount ?? 0,
      sublabel: 'AI Agent verified learners',
      icon: Icons.aiBot,
      theme: {
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-600 text-white',
      },
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-5 h-28 skeleton rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      {metrics.map((m, i) => (
        <StatCard key={m.label} {...m} delay={i * 40} />
      ))}
    </div>
  );
}
