/**
 * CommunityHighlights.jsx
 * Clean summary of featured learners — achievement-focused, not rank-focused.
 * Minimal card design, no decorative shapes or cartoon graphics.
 */

import React from 'react';
import { useApp } from '../context/AppContext';

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
    <circle cx="8" cy="8" r="7" fill="#188038"/>
    <path d="M5 8l2.5 2.5L11 5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AchievementRow = ({ achieved, label }) => (
  <div className="flex items-center gap-2">
    {achieved
      ? <CheckIcon />
      : <div className="w-3 h-3 rounded-full border" style={{ borderColor: 'var(--border-default)' }} />
    }
    <span
      className="text-xs"
      style={{ color: achieved ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
    >
      {label}
    </span>
  </div>
);

const LearnerCard = ({ participant, delay }) => {
  const { name, arcadeGames, skillBadges, progressScore, aiAgent, gearBadge, milestone } = participant;

  return (
    <div
      className="card card-hover p-4 fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Name + score */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <p className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>{name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            {arcadeGames} games · {skillBadges} badges
          </p>
        </div>
        <span
          className="text-xs font-semibold tabular-nums px-2 py-1 rounded flex-shrink-0"
          style={{ background: '#e8f0fe', color: '#1a73e8' }}
        >
          {progressScore} pts
        </span>
      </div>

      {/* Progress bars */}
      <div className="space-y-1.5 mb-3">
        <div>
          <div className="flex justify-between text-2xs mb-1" style={{ color: 'var(--text-tertiary)' }}>
            <span>Arcade Games</span><span>{arcadeGames}/12</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((arcadeGames / 12) * 100, 100)}%`,
                background: arcadeGames >= 6 ? '#188038' : '#f9ab00',
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-2xs mb-1" style={{ color: 'var(--text-tertiary)' }}>
            <span>Skill Badges</span><span>{skillBadges}/66</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((skillBadges / 66) * 100, 100)}%`,
                background: '#188038',
              }}
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div
        className="border-t pt-3 space-y-1.5"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <AchievementRow achieved={arcadeGames >= 6}  label="Completed 6 Arcade Games" />
        <AchievementRow achieved={gearBadge}          label="GEAR Badge Earned" />
        <AchievementRow achieved={aiAgent}            label="AI Agent Verified" />
        <AchievementRow achieved={milestone}          label="Milestone Achieved" />
      </div>
    </div>
  );
};

export default function CommunityHighlights() {
  const { participants, loading } = useApp();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-4" style={{ height: '200px' }}>
            <div className="skeleton h-4 w-32 mb-3" />
            <div className="skeleton h-3 w-full mb-2" />
            <div className="skeleton h-3 w-4/5" />
          </div>
        ))}
      </div>
    );
  }

  const featured = participants.slice(0, 6);
  if (featured.length === 0) return null;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            Featured Learners
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Celebrating progress and achievements across the community
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((p, i) => (
          <LearnerCard key={p.id} participant={p} delay={i * 60} />
        ))}
      </div>
    </div>
  );
}
