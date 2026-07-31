/**
 * FeaturedAchievements.jsx
 * Premium Google Event microsite-style achievement cards.
 * Uses Material-style SVG icons in colored circular backgrounds, distinct soft-tinted backgrounds,
 * prominent participant names, clear typographic hierarchy, and elegant pill chips.
 */

import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';

// SVG Material Icons
const Icons = {
  trophy: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H8v2h8v-2h-3v-2.1c2.42-.31 4.34-2.39 4.34-4.94V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
    </svg>
  ),
  games: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H8v-2H6v-1h2V10h1v2h2v1zm4.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  badges: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2a10 10 0 00-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
};

// Distinct Theme Colors for each achievement card
const THEMES = {
  highest: {
    accent: '#1a73e8', // Blue
    border: 'border-blue-200 dark:border-blue-800',
    headerBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconBg: 'bg-blue-600 text-white',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200',
    avatarBg: 'bg-blue-600 text-white',
  },
  games: {
    accent: '#188038', // Green
    border: 'border-emerald-200 dark:border-emerald-800',
    headerBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconBg: 'bg-emerald-600 text-white',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-200',
    avatarBg: 'bg-emerald-600 text-white',
  },
  badges: {
    accent: '#e65100', // Orange
    border: 'border-orange-200 dark:border-orange-800',
    headerBg: 'bg-orange-50 dark:bg-orange-950/40',
    iconBg: 'bg-orange-600 text-white',
    badgeBg: 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-200',
    avatarBg: 'bg-orange-600 text-white',
  },
  ai: {
    accent: '#7b1fa2', // Purple
    border: 'border-purple-200 dark:border-purple-800',
    headerBg: 'bg-purple-50 dark:bg-purple-950/40',
    iconBg: 'bg-purple-600 text-white',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200',
    avatarBg: 'bg-purple-600 text-white',
  },
  gear: {
    accent: '#c2185b', // Pink / Magenta
    border: 'border-pink-200 dark:border-pink-800',
    headerBg: 'bg-pink-50 dark:bg-pink-950/40',
    iconBg: 'bg-pink-600 text-white',
    badgeBg: 'bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-200',
    avatarBg: 'bg-pink-600 text-white',
  },
  milestone: {
    accent: '#f57f17', // Yellow / Amber
    border: 'border-amber-200 dark:border-amber-800',
    headerBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconBg: 'bg-amber-600 text-white',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200',
    avatarBg: 'bg-amber-600 text-white',
  },
};

const AchievementCard = ({ title, icon, theme, participant }) => {
  if (!participant) return null;

  const initials = participant.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Chips list for achievements
  const chips = [];
  if (participant.progressScore >= 40) chips.push('Top Scorer');
  if (participant.arcadeGames >= 12) chips.push('12 Games');
  else if (participant.arcadeGames >= 6) chips.push('6 Games');
  if (participant.skillBadges >= 30) chips.push(`${participant.skillBadges} Badges`);
  if (participant.aiAgent) chips.push('Verified AI');
  if (participant.gearBadge) chips.push('GEAR Holder');
  if (participant.milestone) chips.push('Milestone');

  return (
    <div
      className={`card overflow-hidden border-2 ${theme.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between`}
    >
      {/* Header Banner */}
      <div className={`${theme.headerBg} px-5 py-3.5 flex items-center justify-between border-b ${theme.border}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${theme.iconBg}`}>
            {icon}
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-gray-800 dark:text-gray-200">
            {title}
          </span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full tabular-nums ${theme.badgeBg}`}>
          {participant.progressScore} pts
        </span>
      </div>

      {/* Main Body: Participant Name (Largest), Avatar, and Stats */}
      <div className="p-5 space-y-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3.5">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg flex-shrink-0 shadow-md ${theme.avatarBg}`}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            {/* Participant Name is Largest text */}
            <h3 className="font-bold text-xl text-gray-900 dark:text-white truncate tracking-tight leading-snug">
              {participant.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Rank #{participant.rank} in Community
            </p>
          </div>
        </div>

        {/* Core Stats Row */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-center">
            <span className="font-bold text-gray-900 dark:text-white text-sm tabular-nums block">
              {participant.arcadeGames} / 12
            </span>
            <span className="text-2xs text-gray-500 dark:text-gray-400">Arcade Games</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-center">
            <span className="font-bold text-gray-900 dark:text-white text-sm tabular-nums block">
              {participant.skillBadges} / 66
            </span>
            <span className="text-2xs text-gray-500 dark:text-gray-400">Skill Badges</span>
          </div>
        </div>

        {/* Elegant Chips Bar */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {chips.map((chip, idx) => (
              <span
                key={idx}
                className="text-2xs font-semibold px-2.5 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function FeaturedAchievements() {
  const { participants, loading } = useApp();

  const featured = useMemo(() => {
    if (!participants || participants.length === 0) return null;

    const highestScore = [...participants].sort((a, b) => b.progressScore - a.progressScore)[0];
    const mostGames = [...participants].sort((a, b) => b.arcadeGames - a.arcadeGames || b.progressScore - a.progressScore)[0];
    const mostBadges = [...participants].sort((a, b) => b.skillBadges - a.skillBadges || b.progressScore - a.progressScore)[0];
    const aiVerified = participants.find(p => p.aiAgent) || participants[0];
    const gearEarned = participants.find(p => p.gearBadge) || participants[0];
    const milestoneAchiever = participants.find(p => p.milestone) || participants[0];

    return {
      highestScore,
      mostGames,
      mostBadges,
      aiVerified,
      gearEarned,
      milestoneAchiever,
    };
  }, [participants]);

  if (loading) {
    return (
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 h-48 skeleton rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!featured) return null;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          Featured Achievements
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Spotlighting top milestones and performance leaders across our learning community
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AchievementCard
          title="Highest Progress Score"
          icon={Icons.trophy}
          theme={THEMES.highest}
          participant={featured.highestScore}
        />
        <AchievementCard
          title="Most Arcade Games"
          icon={Icons.games}
          theme={THEMES.games}
          participant={featured.mostGames}
        />
        <AchievementCard
          title="Most Skill Badges"
          icon={Icons.badges}
          theme={THEMES.badges}
          participant={featured.mostBadges}
        />
        <AchievementCard
          title="AI Agent Verified"
          icon={Icons.ai}
          theme={THEMES.ai}
          participant={featured.aiVerified}
        />
        <AchievementCard
          title="GEAR Badge Leader"
          icon={Icons.gear}
          theme={THEMES.gear}
          participant={featured.gearEarned}
        />
        <AchievementCard
          title="Milestone Achiever"
          icon={Icons.star}
          theme={THEMES.milestone}
          participant={featured.milestoneAchiever}
        />
      </div>
    </div>
  );
}
