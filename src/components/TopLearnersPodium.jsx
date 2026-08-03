/**
 * TopLearnersPodium.jsx
 * Scalable Featured Learners Section with support for multiple tied participants per rank.
 * Displays one grouped card per rank:
 * 🥇 Rank #1 (Gold)
 * 🥈 Rank #2 (Silver)
 * 🥉 Rank #3 (Bronze)
 * Displays list of tied participants (first 5 + expansion option) and total count.
 */

import React, { useMemo, useState } from 'react';
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
    badgeBg: 'bg-amber-100 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700',
    label: '🥇 Rank #1',
    isPrimary: true,
    orderClass: 'order-1 md:order-2', // Top on Mobile, Center on Desktop
  },
  2: {
    accent: '#64748b',
    border: 'border-slate-300 dark:border-slate-700',
    headerBg: 'bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900/60 dark:to-gray-800/40',
    iconBg: 'bg-slate-600 text-white',
    badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700',
    label: '🥈 Rank #2',
    isPrimary: false,
    orderClass: 'order-2 md:order-1', // Second on Mobile, Left on Desktop
  },
  3: {
    accent: '#d97706',
    border: 'border-orange-300 dark:border-orange-800',
    headerBg: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/60 dark:to-amber-950/40',
    iconBg: 'bg-orange-600 text-white',
    badgeBg: 'bg-orange-100 dark:bg-orange-900/80 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700',
    label: '🥉 Rank #3',
    isPrimary: false,
    orderClass: 'order-3 md:order-3', // Third on Mobile, Right on Desktop
  },
};

const RankGroupCard = ({ rank, groupParticipants, onSelectParticipant }) => {
  const [expanded, setExpanded] = useState(false);
  const style = PODIUM_STYLES[rank] || PODIUM_STYLES[3];

  if (!groupParticipants || groupParticipants.length === 0) return null;

  const totalPoints = groupParticipants[0].totalPoints;
  const count = groupParticipants.length;

  const visibleParticipants = expanded ? groupParticipants : groupParticipants.slice(0, 5);
  const hiddenCount = count - 5;

  return (
    <div
      className={`card rounded-2xl overflow-hidden border-2 ${style.border} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full mx-auto max-w-md md:max-w-none md:w-full md:mx-0 ${
        style.isPrimary ? 'md:-translate-y-3 md:shadow-md border-amber-400 shadow-amber-100/50 dark:shadow-none' : ''
      } ${style.orderClass}`}
    >
      {/* Header Banner */}
      <div className={`${style.headerBg} px-4 py-3 md:px-5 md:py-3.5 flex items-center justify-between border-b ${style.border}`}>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-sm ${style.iconBg}`}>
            {rank === 1 ? Icons.goldMedal : rank === 2 ? Icons.silverMedal : Icons.bronzeMedal}
          </div>
          <span className="font-extrabold text-sm md:text-base tracking-tight text-gray-900 dark:text-white">
            {style.label}
          </span>
        </div>
        <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full tabular-nums ${style.badgeBg}`}>
          🏆 {totalPoints} Total Pts
        </span>
      </div>

      {/* Main Card Body */}
      <div className="p-4 md:p-5 bg-white dark:bg-gray-900 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <p className="text-2xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Learners in this Rank ({count})
          </p>

          {/* Participant Names List */}
          <ul className="space-y-2 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
            {visibleParticipants.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <button
                  onClick={() => onSelectParticipant && onSelectParticipant(p)}
                  className="flex items-center gap-2 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate min-w-0 group"
                  title={`View details for ${p.name}`}
                >
                  <span className="text-amber-500 font-bold flex-shrink-0">•</span>
                  <span className="truncate group-hover:underline">{p.name}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Expand / Collapse Button if > 5 */}
          {count > 5 && (
            <div className="pt-1.5">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <span>{expanded ? 'Collapse List' : `+${hiddenCount} more participants · View All`}</span>
                <span>{expanded ? '▲' : '▼'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Count Badge */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-2xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {count} {count === 1 ? 'Participant' : 'Participants'}
          </span>
          <span className="italic text-gray-400">Click name to view status</span>
        </div>
      </div>
    </div>
  );
};

export default function TopLearnersPodium({ onSelectParticipant }) {
  const { participants, loading } = useApp();

  // Group participants by rank (Rank 1, Rank 2, Rank 3)
  const rankGroups = useMemo(() => {
    if (!participants || participants.length === 0) {
      return { 1: [], 2: [], 3: [] };
    }

    const groups = { 1: [], 2: [], 3: [] };
    for (const p of participants) {
      if (p.rank <= 3) {
        if (!groups[p.rank]) groups[p.rank] = [];
        groups[p.rank].push(p);
      }
    }
    return groups;
  }, [participants]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">🏆 Featured Learners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card p-6 h-56 skeleton rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const hasAnyRank = rankGroups[1].length > 0 || rankGroups[2].length > 0 || rankGroups[3].length > 0;
  if (!hasAnyRank) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          🏆 Featured Learners
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Participants currently holding Rank #1, Rank #2, and Rank #3 based on Total Points.
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 md:items-start pt-2">
        <RankGroupCard rank={1} groupParticipants={rankGroups[1]} onSelectParticipant={onSelectParticipant} />
        <RankGroupCard rank={2} groupParticipants={rankGroups[2]} onSelectParticipant={onSelectParticipant} />
        <RankGroupCard rank={3} groupParticipants={rankGroups[3]} onSelectParticipant={onSelectParticipant} />
      </div>
    </div>
  );
}
