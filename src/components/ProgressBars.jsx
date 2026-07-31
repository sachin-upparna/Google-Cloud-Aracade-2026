/**
 * ProgressBars.jsx
 * Community-level progress summary. Clean bar charts, no decorative elements.
 */

import React from 'react';
import { useApp } from '../context/AppContext';

const CohortBar = ({ label, value, max, color, sublabel }) => {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
          {sublabel && <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{sublabel}</p>}
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold tabular-nums" style={{ color }}>
            {value.toLocaleString()}
          </span>
          <span className="text-xs ml-1" style={{ color: 'var(--text-tertiary)' }}>
            / {max.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="progress-track" style={{ height: '8px' }}>
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <p className="text-right text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
        {pct.toFixed(1)}%
      </p>
    </div>
  );
};

export default function ProgressBars() {
  const { stats, loading } = useApp();

  if (loading) {
    return (
      <div className="card p-6 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton h-4 w-40 mb-3" />
            <div className="skeleton h-2 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const total = stats.total ?? 0;

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          Community Learning Progress
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          Aggregate progress across all {total} participants in this cohort
        </p>
      </div>
      <div className="space-y-6">
        <CohortBar
          label="Arcade Games Completed"
          sublabel="Total games played by all participants"
          value={stats.totalArcadeGames ?? 0}
          max={total * 12}
          color="#f9ab00"
        />
        <CohortBar
          label="Skill Badges Earned"
          sublabel="Total badges earned across the community"
          value={stats.totalSkillBadges ?? 0}
          max={total * 66}
          color="#188038"
        />
        <CohortBar
          label="Average Progress Score"
          sublabel="Community average (max possible: 45)"
          value={stats.avgScore ?? 0}
          max={45}
          color="#1a73e8"
        />
      </div>
    </div>
  );
}
