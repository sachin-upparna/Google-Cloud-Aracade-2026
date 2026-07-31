/**
 * Leaderboard.jsx
 * Main leaderboard table with rank highlights, movement indicators,
 * achievement badges, and click-to-open modal.
 * Virtualized for performance with 500–1000+ participants.
 */

import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { applyFilter } from './SearchAndFilter';

const RANK_CLASSES = {
  1: 'rank-gold',
  2: 'rank-silver',
  3: 'rank-bronze',
};

const RANK_BADGE = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

const MovementBadge = ({ movement }) => {
  if (!movement) return null;
  const classes = {
    up: 'movement-up bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-200 dark:border-green-800',
    down: 'movement-down bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-red-200 dark:border-red-800',
    new: 'movement-new bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border-blue-200 dark:border-blue-800',
    same: 'text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  };
  return (
    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${classes[movement.type] || classes.same}`}>
      {movement.label}
    </span>
  );
};

const AchievementChips = ({ badges }) => {
  if (!badges?.length) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {badges.slice(0, 3).map((badge) => (
        <span
          key={badge.key}
          className="badge-chip text-xs"
          style={{ color: badge.color, background: badge.bgColor, border: `1px solid ${badge.color}30` }}
        >
          {badge.emoji} {badge.label}
        </span>
      ))}
    </div>
  );
};

// Table row component (memoized)
const LeaderboardRow = React.memo(({ participant, movement, onSelect }) => {
  const rankClass = RANK_CLASSES[participant.rank] || '';
  const rankBadge = RANK_BADGE[participant.rank] || '';

  return (
    <tr
      className={`${rankClass} cursor-pointer`}
      onClick={() => onSelect(participant)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(participant)}
      role="button"
      aria-label={`View details for ${participant.name}`}
    >
      {/* Rank */}
      <td className="py-3 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm w-6 text-center">{rankBadge || participant.rank}</span>
          {movement && <MovementBadge movement={movement} />}
        </div>
      </td>

      {/* Participant */}
      <td className="py-3 px-4">
        <div>
          <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{participant.name}</p>
          <AchievementChips badges={participant.badges} />
        </div>
      </td>

      {/* Score */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm tabular-nums">
          {participant.leaderboardScore}
        </span>
      </td>

      {/* Arcade Games */}
      <td className="py-3 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm tabular-nums">{participant.arcadeGames}</span>
          <div className="hidden sm:block w-16 progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((participant.arcadeGames / 12) * 100, 100)}%`,
                background: '#FBBC05',
              }}
            />
          </div>
        </div>
      </td>

      {/* Skill Badges */}
      <td className="py-3 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm tabular-nums">{participant.skillBadges}</span>
          <div className="hidden sm:block w-16 progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((participant.skillBadges / 66) * 100, 100)}%`,
                background: '#34A853',
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
});
LeaderboardRow.displayName = 'LeaderboardRow';

export default function Leaderboard({ search, activeFilter, onSelectParticipant }) {
  const { participants, movementMap, loading } = useApp();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 50;

  // Filter and search
  const filtered = useMemo(() => {
    let result = applyFilter(participants, activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [participants, activeFilter, search]);

  // Pagination
  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);

  const handleLoadMore = useCallback(() => setPage(p => p + 1), []);

  // Reset page on filter/search change
  React.useEffect(() => setPage(1), [search, activeFilter]);

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="shimmer h-14 rounded-xl" />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-lg font-medium">No participants found</p>
        <p className="text-sm mt-1">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Showing <span className="font-bold text-gray-700 dark:text-gray-300">{paginated.length}</span> of{' '}
          <span className="font-bold text-gray-700 dark:text-gray-300">{filtered.length}</span> participants
        </p>
      </div>

      <div className="table-wrapper g-card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Participant</th>
              <th>Score</th>
              <th>Arcade Games</th>
              <th>Skill Badges</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <LeaderboardRow
                key={p.id}
                participant={p}
                movement={movementMap[p.name.toLowerCase()]}
                onSelect={onSelectParticipant}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Load more */}
      {paginated.length < filtered.length && (
        <button
          onClick={handleLoadMore}
          className="mx-auto px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-500 transition-all"
        >
          Load More ({filtered.length - paginated.length} remaining)
        </button>
      )}
    </div>
  );
}
