/**
 * PageHero.jsx
 * Page title section below the nav bar. Shows program name, facilitators,
 * the dashboard note, last-updated timestamp, and data disclaimer.
 * Clean, enterprise-grade — no decorative shapes.
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export default function PageHero() {
  const { lastUpdated, loading, stats } = useApp();

  return (
    <div
      className="border-b"
      style={{
        background: '#fff',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="page-container py-6">
        {/* Program identity */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-semibold tracking-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              Community Progress Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Google Cloud Arcade Facilitator Program 2026
            </p>
            {/* Facilitators */}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                Facilitators
              </span>
              <div className="flex items-center gap-3">
                {['Sachin Upparna', 'Vikas A. L.'].map(name => (
                  <span
                    key={name}
                    className="text-xs font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Participant count badge */}
          {!loading && stats.total > 0 && (
            <div
              className="self-start sm:self-center px-4 py-2 rounded text-center"
              style={{
                background: '#e8f0fe',
                border: '1px solid #c5d8fb',
              }}
            >
              <div className="text-2xl font-bold tabular-nums" style={{ color: '#1a73e8', lineHeight: 1 }}>
                {stats.total}
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#5f6368' }}>Participants</div>
            </div>
          )}
        </div>

        {/* Dashboard note */}
        <div className="info-banner mt-5">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
            This dashboard is updated regularly to reflect the latest participant progress. Keep learning, keep building, and enjoy your Google Cloud Arcade journey!
          </p>
        </div>

        {/* Timestamp + disclaimer row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-medium">Last updated:</span>{' '}
              {lastUpdated ?? (loading ? 'Loading…' : 'Unavailable')}
            </span>
          </div>
          <p className="text-xs italic" style={{ color: 'var(--text-tertiary)' }}>
            Data is refreshed whenever the latest facilitator report is uploaded.
            If your recent progress is not yet visible, it will appear in the next update.
          </p>
        </div>
      </div>
    </div>
  );
}
