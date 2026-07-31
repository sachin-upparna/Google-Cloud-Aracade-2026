/**
 * SearchAndFilter.jsx
 * Clean search input + filter pills. No excessive color or emoji.
 */

import React from 'react';

export const FILTERS = [
  { key: 'all',        label: 'All' },
  { key: 'not_started', label: 'Not Started' },
  { key: '1_2_games',  label: '1–2 Games' },
  { key: '3_5_games',  label: '3–5 Games' },
  { key: '6_games',    label: 'Completed 6' },
  { key: '12_games',   label: 'Completed 12+' },
  { key: 'ai_agent',   label: 'AI Agent' },
  { key: 'gear',       label: 'GEAR Badge' },
  { key: 'bonus',      label: 'Bonus Milestone' },
  { key: 'milestone',  label: 'Milestone' },
];

export const applyFilter = (participants, key) => {
  switch (key) {
    case 'not_started': return participants.filter(p => p.arcadeGames === 0);
    case '1_2_games':   return participants.filter(p => p.arcadeGames >= 1 && p.arcadeGames <= 2);
    case '3_5_games':   return participants.filter(p => p.arcadeGames >= 3 && p.arcadeGames <= 5);
    case '6_games':     return participants.filter(p => p.arcadeGames === 6);
    case '12_games':    return participants.filter(p => p.arcadeGames >= 12);
    case 'ai_agent':    return participants.filter(p => p.aiAgent);
    case 'gear':        return participants.filter(p => p.gearBadge);
    case 'bonus':       return participants.filter(p => p.bonusMilestone);
    case 'milestone':   return participants.filter(p => p.milestone);
    default:            return participants;
  }
};

export default function SearchAndFilter({ search, setSearch, activeFilter, setActiveFilter }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <svg
          viewBox="0 0 20 20" width="15" height="15" fill="none"
          stroke="currentColor" strokeWidth="1.8"
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <circle cx="9" cy="9" r="6"/><path d="M17 17l-3.5-3.5" strokeLinecap="round"/>
        </svg>
        <input
          type="search"
          id="participant-search"
          className="search-input"
          placeholder="Search participants by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`filter-pill ${activeFilter === f.key ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
