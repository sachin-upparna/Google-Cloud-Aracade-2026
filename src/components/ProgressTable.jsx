/**
 * ProgressTable.jsx
 * Participant Leaderboard sorted using the official Google Points System:
 * - Desktop: Wide data table (100% preserved)
 * - Mobile: Responsive stacked participant cards (No horizontal scrolling)
 */

import React, { useMemo, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { applyFilter } from './SearchAndFilter';
import { getAiAgentEligibility, getBonusMilestoneEligibility } from '../utils/csvParser';

// Medal graphics for Top 3
const MEDALS = {
  1: { icon: '🥇', bg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  2: { icon: '🥈', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  3: { icon: '🥉', bg: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
};

const getAvatarBg = (name) => {
  const bgClasses = [
    'bg-blue-500 text-white',
    'bg-emerald-500 text-white',
    'bg-amber-500 text-white',
    'bg-purple-500 text-white',
    'bg-rose-500 text-white',
    'bg-indigo-500 text-white',
    'bg-teal-500 text-white',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return bgClasses[Math.abs(hash) % bgClasses.length];
};

const SortIcon = ({ col, sortCol, sortDir }) => {
  if (sortCol !== col) {
    return <span className="opacity-30 text-2xs ml-1">↕</span>;
  }
  return <span className="text-blue-600 dark:text-blue-400 font-bold text-xs ml-1">{sortDir === 'desc' ? '↓' : '↑'}</span>;
};

const StatusChips = ({ participant }) => {
  const {
    skillsProfileStatus,
    developerProfileStatus,
    accessCodeStatus,
    hasGeminiEnterpriseGear,
    hasArcadeGear,
    milestone,
  } = participant;

  const aiAgentObj = getAiAgentEligibility(participant);
  const bonusObj = getBonusMilestoneEligibility(participant);

  const isSkillsGood = (skillsProfileStatus || '').toLowerCase().includes('all good');
  const isDevGood = (developerProfileStatus || '').toLowerCase().includes('all good');
  const isCodeRedeemed = (accessCodeStatus || '').toLowerCase().includes('yes') || (accessCodeStatus || '').toLowerCase().includes('redeemed');

  return (
    <div className="flex flex-wrap items-center gap-1 mt-1">
      {/* Skills Profile */}
      <span
        className={`text-2xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
          isSkillsGood
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
        }`}
      >
        <span>{isSkillsGood ? '🟢' : '🔴'}</span>
        <span>Skills Profile {isSkillsGood ? '✓' : '❌'}</span>
      </span>

      {/* Developer Profile */}
      <span
        className={`text-2xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
          isDevGood
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
        }`}
      >
        <span>{isDevGood ? '🟢' : '🔴'}</span>
        <span>Dev Profile {isDevGood ? '✓' : '❌'}</span>
      </span>

      {/* Access Code */}
      <span
        className={`text-2xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
          isCodeRedeemed
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
        }`}
      >
        <span>{isCodeRedeemed ? '🟢' : '🔴'}</span>
        <span>Access Code {isCodeRedeemed ? '✓' : '❌'}</span>
      </span>

      {/* General Milestone */}
      <span
        className={`text-2xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
          milestone
            ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
        }`}
      >
        <span>{milestone ? '🟢' : '⏳'}</span>
        <span>Milestone {milestone ? 'Earned' : 'Not Earned'}</span>
      </span>

      {/* AI Agent Verification */}
      <span
        className={`text-2xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
          aiAgentObj.status === 'verified'
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800'
            : aiAgentObj.status === 'pending'
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
        }`}
      >
        <span>{aiAgentObj.emoji}</span>
        <span>AI Agent: {aiAgentObj.label}</span>
      </span>

      {/* Bonus Milestone */}
      <span
        className={`text-2xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
          bonusObj.status === 'earned'
            ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
            : bonusObj.status === 'in_progress'
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
        }`}
      >
        <span>{bonusObj.emoji}</span>
        <span>Bonus: {bonusObj.label}</span>
      </span>

      {/* GEAR */}
      {hasGeminiEnterpriseGear && (
        <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          🟢 GEAR
        </span>
      )}
      {hasArcadeGear && (
        <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          🟢 Arcade GEAR
        </span>
      )}
    </div>
  );
};

/* Desktop Progress Row */
const ProgressRow = React.memo(({ participant, onSelect }) => {
  const initials = participant.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const avatarBg = getAvatarBg(participant.name);
  const medal = MEDALS[participant.rank];

  return (
    <tr
      onClick={() => onSelect(participant)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(participant)}
      tabIndex={0}
      role="button"
      className="border-b border-gray-100 dark:border-gray-800/80 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors duration-150 cursor-pointer"
      aria-label={`View details for ${participant.name}`}
    >
      {/* Rank cell */}
      <td className="py-3.5 px-4 text-center whitespace-nowrap">
        {medal ? (
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm ${medal.bg}`} title={`Rank ${participant.rank}`}>
            {medal.icon}
          </span>
        ) : (
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 tabular-nums">
            #{participant.rank}
          </span>
        )}
      </td>

      {/* Participant name + status chips */}
      <td className="py-3.5 px-4">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 mt-0.5 ${avatarBg}`}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {participant.name}
            </p>
            <StatusChips participant={participant} />
          </div>
        </div>
      </td>

      {/* Total Points */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div>
          <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
            {participant.totalPoints}
          </span>
          <span className="text-2xs text-gray-400 dark:text-gray-500 ml-1">pts</span>
        </div>
        <div className="text-2xs text-gray-400 dark:text-gray-500 tabular-nums mt-0.5">
          Arcade: {participant.arcadePoints} | Bonus: {participant.milestoneBonus + participant.bonusMilestoneBonus}
        </div>
      </td>

      {/* Arcade Games */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 tabular-nums">
            {participant.arcadeGames}
            <span className="text-2xs font-normal text-gray-400">/12</span>
          </span>
          <div className="w-20 progress-track h-2">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((participant.arcadeGames / 12) * 100, 100)}%`,
                background: participant.arcadeGames >= 6 ? '#188038' : '#f9ab00',
              }}
            />
          </div>
        </div>
      </td>

      {/* Skill Badges */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 tabular-nums">
            {participant.skillBadges}
            <span className="text-2xs font-normal text-gray-400">/66</span>
          </span>
          <div className="w-20 progress-track h-2">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((participant.skillBadges / 66) * 100, 100)}%`,
                background: '#188038',
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
});
ProgressRow.displayName = 'ProgressRow';

/* Mobile Participant Card */
const MobileParticipantCard = React.memo(({ participant, onSelect }) => {
  const initials = participant.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const avatarBg = getAvatarBg(participant.name);
  const medal = MEDALS[participant.rank];

  return (
    <div
      onClick={() => onSelect(participant)}
      tabIndex={0}
      role="button"
      className="card p-4 space-y-3 cursor-pointer hover:shadow-md transition-all duration-150 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl"
    >
      {/* Header: Rank + Avatar + Name + Total Points */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Rank Badge */}
          {medal ? (
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-base flex-shrink-0 ${medal.bg}`}>
              {medal.icon}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-extrabold text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 flex-shrink-0 tabular-nums">
              #{participant.rank}
            </span>
          )}

          {/* Avatar + Name */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 ${avatarBg}`}>
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                {participant.name}
              </h3>
              <p className="text-2xs text-gray-400 dark:text-gray-500 tabular-nums">
                Arcade: {participant.arcadePoints} | Bonus: {participant.milestoneBonus + participant.bonusMilestoneBonus}
              </p>
            </div>
          </div>
        </div>

        {/* Total Points Badge */}
        <div className="text-right flex-shrink-0">
          <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 tabular-nums block">
            {participant.totalPoints} <span className="text-2xs font-normal text-gray-400">pts</span>
          </span>
        </div>
      </div>

      {/* Status Chips */}
      <StatusChips participant={participant} />

      {/* Progress Bars Stack */}
      <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
        {/* Arcade Games */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-2xs">
            <span className="font-medium text-gray-500 dark:text-gray-400">Arcade Games</span>
            <span className="font-bold text-gray-800 dark:text-gray-200 tabular-nums">
              {participant.arcadeGames} <span className="text-gray-400 font-normal">/12</span>
            </span>
          </div>
          <div className="progress-track h-2 bg-gray-100 dark:bg-gray-800">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((participant.arcadeGames / 12) * 100, 100)}%`,
                background: participant.arcadeGames >= 6 ? '#188038' : '#f9ab00',
              }}
            />
          </div>
        </div>

        {/* Skill Badges */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-2xs">
            <span className="font-medium text-gray-500 dark:text-gray-400">Skill Badges</span>
            <span className="font-bold text-gray-800 dark:text-gray-200 tabular-nums">
              {participant.skillBadges} <span className="text-gray-400 font-normal">/66</span>
            </span>
          </div>
          <div className="progress-track h-2 bg-gray-100 dark:bg-gray-800">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((participant.skillBadges / 66) * 100, 100)}%`,
                background: '#188038',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
MobileParticipantCard.displayName = 'MobileParticipantCard';

const COLUMNS = [
  { key: 'rank', label: 'Rank', sortable: true, width: '70px' },
  { key: 'name', label: 'Participant & Program Status', sortable: true },
  { key: 'totalPoints', label: 'Total Points', sortable: true },
  { key: 'arcadeGames', label: 'Arcade Games', sortable: true },
  { key: 'skillBadges', label: 'Skill Badges', sortable: true },
];

export default function ProgressTable({ search, activeFilter, onSelectParticipant }) {
  const { participants, loading } = useApp();
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState('totalPoints');
  const [sortDir, setSortDir] = useState('desc');
  const PAGE_SIZE = 50;

  const handleSort = useCallback((col) => {
    setSortCol(prev => {
      if (prev === col) { setSortDir(d => d === 'desc' ? 'asc' : 'desc'); return col; }
      setSortDir('desc');
      return col;
    });
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    let result = applyFilter(participants, activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    return [...result].sort((a, b) => {
      if (sortCol === 'totalPoints') {
        if (b.totalPoints !== a.totalPoints) return sortDir === 'asc' ? a.totalPoints - b.totalPoints : b.totalPoints - a.totalPoints;
        if (b.arcadePoints !== a.arcadePoints) return sortDir === 'asc' ? a.arcadePoints - b.arcadePoints : b.arcadePoints - a.arcadePoints;
        return sortDir === 'asc' ? a.arcadeGames - b.arcadeGames : b.arcadeGames - a.arcadeGames;
      }
      const av = a[sortCol], bv = b[sortCol];
      if (sortCol === 'name') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === 'asc' ? av - bv : bv - av;
    });
  }, [participants, activeFilter, search, sortCol, sortDir]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const handleLoadMore = useCallback(() => setPage(p => p + 1), []);
  React.useEffect(() => setPage(1), [search, activeFilter]);

  if (loading) {
    return (
      <div className="card p-4 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-12 skeleton rounded-lg" />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="card py-16 text-center space-y-2">
        <span className="text-3xl">🔍</span>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No participants match your criteria</p>
        <p className="text-xs text-gray-400">Try adjusting your search terms or filter selection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          Showing <strong className="text-gray-800 dark:text-gray-200">{paginated.length}</strong> of{' '}
          <strong className="text-gray-800 dark:text-gray-200">{filtered.length}</strong> participants
        </span>
        <span className="hidden sm:inline italic">Ranked by Total Points (Dense Ranking)</span>
      </div>

      {/* Desktop Table View (hidden on mobile, block on md+) */}
      <div className="hidden md:block table-scroll card">
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`py-3 px-4 ${sortCol === col.key ? 'sort-active' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  {col.label}
                  {col.sortable && <SortIcon col={col.key} sortCol={sortCol} sortDir={sortDir} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(p => (
              <ProgressRow
                key={p.id}
                participant={p}
                onSelect={onSelectParticipant}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (block on mobile, hidden on md+) */}
      <div className="block md:hidden space-y-3">
        {paginated.map(p => (
          <MobileParticipantCard
            key={p.id}
            participant={p}
            onSelect={onSelectParticipant}
          />
        ))}
      </div>

      {paginated.length < filtered.length && (
        <div className="flex justify-center pt-2">
          <button onClick={handleLoadMore} className="btn btn-secondary text-xs">
            Load More ({filtered.length - paginated.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
