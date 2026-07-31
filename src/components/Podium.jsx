/**
 * Podium.jsx
 * Visual podium for top 3 ranked participants with medal styling.
 * Supports ties (multiple participants per rank).
 */

import React from 'react';
import { useApp } from '../context/AppContext';

const MEDAL = {
  1: { emoji: '🥇', label: 'Gold', className: 'podium-gold', height: 'h-32 sm:h-40', textColor: '#92400E', order: 2 },
  2: { emoji: '🥈', label: 'Silver', className: 'podium-silver', height: 'h-24 sm:h-32', textColor: '#374151', order: 1 },
  3: { emoji: '🥉', label: 'Bronze', className: 'podium-bronze', height: 'h-20 sm:h-24', textColor: '#7C2D12', order: 3 },
};

const PodiumSlot = ({ rank, participants }) => {
  const medal = MEDAL[rank];
  if (!medal || !participants?.length) return null;

  return (
    <div
      className="flex flex-col items-center gap-3 animate-slide-up"
      style={{ order: medal.order, animationDelay: `${rank * 150}ms` }}
    >
      {/* Participant cards above platform */}
      <div className="flex flex-col items-center gap-2 w-full max-w-[160px]">
        {participants.map((p) => (
          <div
            key={p.id}
            className="glass rounded-2xl px-3 py-2 text-center w-full shadow-google"
          >
            <div className="text-2xl mb-1">{medal.emoji}</div>
            <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 leading-tight truncate">
              {p.name}
            </p>
            <p className="text-xs font-bold mt-0.5" style={{ color: '#4285F4' }}>
              {p.leaderboardScore} pts
            </p>
          </div>
        ))}
      </div>

      {/* Platform */}
      <div
        className={`${medal.className} ${medal.height} w-28 sm:w-36 rounded-t-2xl flex items-center justify-center flex-col gap-1 shadow-lg`}
      >
        <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
          {rank}
        </span>
        <span className="text-xs font-bold text-white text-opacity-90 uppercase tracking-wider">
          {medal.label}
        </span>
      </div>
    </div>
  );
};

export default function Podium() {
  const { participants, loading } = useApp();

  if (loading || participants.length === 0) {
    return (
      <div className="g-card p-6">
        <div className="shimmer h-48 rounded-xl" />
      </div>
    );
  }

  // Group by rank for top 3
  const podiumData = {};
  for (const p of participants) {
    if (p.rank <= 3) {
      if (!podiumData[p.rank]) podiumData[p.rank] = [];
      podiumData[p.rank].push(p);
    }
  }

  return (
    <div className="g-card p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        Top Podium
      </h2>

      {/* Podium layout */}
      <div className="flex items-end justify-center gap-3 sm:gap-6">
        {[1, 2, 3].map((rank) => (
          <PodiumSlot key={rank} rank={rank} participants={podiumData[rank] || []} />
        ))}
      </div>

      {/* Divider line */}
      <div className="mt-6 h-1 rounded-full bg-gradient-to-r from-google-yellow via-gray-200 to-google-bronze opacity-40 dark:opacity-20" />
    </div>
  );
}
