/**
 * TopLearnersPodium.jsx
 * Displays 🏆 Top 3 Featured Learners using official Total Points.
 * Desktop: Rank #2 (left), Rank #1 (center elevated), Rank #3 (right) - 100% preserved
 * Mobile: Perfectly centered cards (mx-auto max-w-md w-full) with equal margins and tailored scaling.
 */

import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';

// Material SVG Icons for Podium
const Icons = {
  goldMedal: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H8v2h8v-2h-3v-2.1c2.42-.31 4.34-2.39 4.34-4.94V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
    </svg>
  ),
  silverMedal: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  bronzeMedal: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
};

const PODIUM_STYLES = {
  1: {
    accent: '#f59e0b',
    border: 'border-amber-400 dark:border-amber-500',
    headerBg: 'bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-950/60 dark:to-yellow-900/40',
    iconBg: 'bg-amber-500 text-white',
    avatarBg: 'bg-gradient-to-tr from-amber-600 to-yellow-500 text-white',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700',
    label: '🥇 Rank #1 Leader',
    isPrimary: true,
    orderClass: 'order-1 md:order-2', // Top on Mobile, Center on Desktop
  },
  2: {
    accent: '#64748b',
    border: 'border-slate-300 dark:border-slate-700',
    headerBg: 'bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900/60 dark:to-gray-800/40',
    iconBg: 'bg-slate-600 text-white',
    avatarBg: 'bg-gradient-to-tr from-slate-700 to-gray-500 text-white',
    badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700',
    label: '🥈 Rank #2 Runner-up',
    isPrimary: false,
    orderClass: 'order-2 md:order-1', // Second on Mobile, Left on Desktop
  },
  3: {
    accent: '#d97706',
    border: 'border-orange-300 dark:border-orange-800',
    headerBg: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/60 dark:to-amber-950/40',
    iconBg: 'bg-orange-600 text-white',
    avatarBg: 'bg-gradient-to-tr from-orange-700 to-amber-600 text-white',
    badgeBg: 'bg-orange-100 dark:bg-orange-900/80 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700',
    label: '🥉 Rank #3 Achiever',
    isPrimary: false,
    orderClass: 'order-3 md:order-3', // Third on Mobile, Right on Desktop
  },
};

const LearnerCard = ({ participant, rank }) => {
  const style = PODIUM_STYLES[rank] || PODIUM_STYLES[3];
  const isRank1 = rank === 1;

  const initials = participant.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const { arcadePoints, milestoneBonus, bonusMilestoneBonus, totalPoints } = participant;

  return (
    <div
      className={`card rounded-2xl overflow-hidden border-2 ${style.border} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full mx-auto max-w-md md:max-w-none md:w-full md:mx-0 ${
        style.isPrimary ? 'md:-translate-y-3 md:shadow-md border-amber-400 shadow-amber-100/50 dark:shadow-none' : ''
      } ${style.orderClass}`}
    >
      {/* Header Banner */}
      <div className={`${style.headerBg} px-3.5 py-2.5 md:px-5 md:py-3.5 flex items-center justify-between border-b ${style.border}`}>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-sm ${style.iconBg}`}>
            {rank === 1 ? Icons.goldMedal : rank === 2 ? Icons.silverMedal : Icons.bronzeMedal}
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-gray-800 dark:text-gray-200">
            {style.label}
          </span>
        </div>
        <span className={`text-xs font-extrabold px-2.5 py-0.5 md:px-3 md:py-1 rounded-full tabular-nums ${style.badgeBg}`}>
          🏆 {totalPoints} Total Pts
        </span>
      </div>

      {/* Main Card Body */}
      <div className={`${isRank1 ? 'p-4 md:p-5' : 'p-3.5 md:p-5'} space-y-3 md:space-y-4 bg-white dark:bg-gray-900`}>
        <div className="flex items-center gap-3 md:gap-3.5">
          <div className={`${isRank1 ? 'w-12 h-12 text-base md:w-14 md:h-14 md:text-lg' : 'w-11 h-11 text-sm md:w-14 md:h-14 md:text-lg'} rounded-full flex items-center justify-center font-extrabold flex-shrink-0 shadow-md ${style.avatarBg}`}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`${isRank1 ? 'text-base md:text-xl' : 'text-sm md:text-xl'} font-bold text-gray-900 dark:text-white truncate tracking-tight`}>
              {participant.name}
            </h3>
            <p className="text-2xs md:text-xs text-gray-500 dark:text-gray-400 font-medium">
              Community Rank #{participant.rank}
            </p>
          </div>
        </div>

        {/* Official Points Breakdown Grid */}
        <div className="grid grid-cols-2 gap-1.5 md:gap-2 pt-0.5 md:pt-1 text-2xs md:text-xs">
          <div className="bg-blue-50/60 dark:bg-blue-950/40 p-2 md:p-2.5 rounded-lg md:rounded-xl border border-blue-100 dark:border-blue-900/60">
            <span className="text-2xs font-semibold text-blue-700 dark:text-blue-300 block truncate">🎮 Arcade Points</span>
            <span className="font-extrabold text-blue-900 dark:text-blue-100 text-xs md:text-sm tabular-nums">
              {arcadePoints} pts
            </span>
          </div>

          <div className="bg-amber-50/60 dark:bg-amber-950/40 p-2 md:p-2.5 rounded-lg md:rounded-xl border border-amber-100 dark:border-amber-900/60">
            <span className="text-2xs font-semibold text-amber-700 dark:text-amber-300 block truncate">⭐ Milestone Bonus</span>
            <span className="font-extrabold text-amber-900 dark:text-amber-100 text-xs md:text-sm tabular-nums">
              +{milestoneBonus} pts
            </span>
          </div>

          <div className="bg-rose-50/60 dark:bg-rose-950/40 p-2 md:p-2.5 rounded-lg md:rounded-xl border border-rose-100 dark:border-rose-900/60">
            <span className="text-2xs font-semibold text-rose-700 dark:text-rose-300 block truncate">🎁 Bonus Milestone</span>
            <span className="font-extrabold text-rose-900 dark:text-rose-100 text-xs md:text-sm tabular-nums">
              +{bonusMilestoneBonus} pts
            </span>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-2 md:p-2.5 rounded-lg md:rounded-xl border border-emerald-100 dark:border-emerald-900/60">
            <span className="text-2xs font-semibold text-emerald-700 dark:text-emerald-300 block truncate">🏆 Total Points</span>
            <span className="font-extrabold text-emerald-900 dark:text-emerald-100 text-xs md:text-sm tabular-nums">
              {totalPoints} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TopLearnersPodium() {
  const { participants, loading } = useApp();

  const { topLearners } = useMemo(() => {
    if (!participants || participants.length === 0) {
      return { topLearners: [] };
    }
    // Filter top 3 in strict rank order (1, 2, 3)
    const top = participants.filter((p) => p.rank <= 3).sort((a, b) => a.rank - b.rank);
    return { topLearners: top };
  }, [participants]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">🏆 Top 3 Featured Learners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card p-6 h-56 skeleton rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (topLearners.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          🏆 Top 3 Featured Learners
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Ranked by Total Points (Arcade Points + Milestone Bonus + Bonus Milestone)
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-3.5 md:gap-6 items-end pt-2">
        {topLearners.map((learner) => (
          <LearnerCard
            key={learner.id}
            participant={learner}
            rank={learner.rank}
          />
        ))}
      </div>
    </div>
  );
}
