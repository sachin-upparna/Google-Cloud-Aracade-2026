/**
 * TopMovers.jsx
 * Compact progress update section — shown only after a CSV upload.
 * Clean inline list, no decorative cards or animations.
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export default function TopMovers() {
  const { topMovers, movementMap, isUploaded } = useApp();
  if (!isUploaded || topMovers.length === 0) return null;

  return (
    <div
      className="card px-5 py-4 fade-up"
      style={{ borderLeft: '3px solid #188038' }}
    >
      <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        Progress since last update
      </p>
      <div className="flex flex-wrap gap-3">
        {topMovers.map(p => {
          const m = movementMap[p.name.toLowerCase()];
          return (
            <div
              key={p.id}
              className="flex items-center gap-2 rounded px-3 py-1.5"
              style={{
                background: 'var(--surface-hover)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {p.name}
              </span>
              <span className="text-xs font-semibold" style={{ color: '#188038' }}>
                {m?.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
