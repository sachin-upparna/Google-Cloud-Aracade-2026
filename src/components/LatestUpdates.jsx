/**
 * LatestUpdates.jsx
 * Displays latest updates dynamically from updates.json.
 * If empty, displays "No announcements available."
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export default function LatestUpdates() {
  const { updatesData } = useApp();
  const updates = updatesData?.latestUpdates || [];

  return (
    <div className="card p-6 space-y-4 border-t-4 border-t-amber-500">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          📢 Latest Updates & Reminders
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Program announcements and updates managed by facilitators
        </p>
      </div>

      {updates.length === 0 ? (
        <div className="p-6 text-center text-gray-400 dark:text-gray-500 italic text-sm">
          No announcements available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {updates.map((item, i) => (
            <div
              key={item.id || i}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 space-y-2 flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-500 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                    {item.tag || 'Update'}
                  </span>
                  {item.date && <span className="text-2xs text-gray-400 dark:text-gray-500">{item.date}</span>}
                </div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
