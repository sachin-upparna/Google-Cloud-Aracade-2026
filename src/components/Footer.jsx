/**
 * Footer.jsx
 * Community Program Footer — No copyright branding.
 */

import React from 'react';

export default function Footer() {
  return (
    <footer
      className="mt-12 border-t py-8"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface-card)' }}
    >
      <div className="page-container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Google Cloud Arcade Community Progress Portal 2026
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Facilitators: Sachin Upparna · Vikas A. L.
            </p>
            <p className="text-xs mt-0.5 italic" style={{ color: 'var(--text-tertiary)' }}>
              "Learn · Build · Grow Together"
            </p>
          </div>

          {/* Right: Four-color dots */}
          <div className="flex items-center gap-1.5">
            {['#1a73e8', '#d93025', '#f9ab00', '#188038'].map(c => (
              <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
            <span className="ml-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Community Portal
            </span>
          </div>
        </div>

        <div
          className="mt-6 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Community-managed Google Cloud Arcade progress tracking. This portal will be officially closed on or before the 2nd week of October 2026.
          </p>
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Thank you for being part of this cohort! 💙
          </p>
        </div>
      </div>
    </footer>
  );
}
