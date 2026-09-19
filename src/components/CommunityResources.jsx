/**
 * CommunityResources.jsx
 * Displays verified official Google Cloud & AI learning documentation.
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export default function CommunityResources() {
  const { updatesData } = useApp();
  const learningResources = updatesData?.learningResources || [];

  return (
    <div className="card p-6 space-y-4 border-t-4 border-t-emerald-500 hover:shadow-md transition-shadow">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          📚 Official Learning Documentation
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Verified Google Cloud, Gemini, and AI documentation for your continued learning journey
        </p>
      </div>

      {learningResources.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No learning resources available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {learningResources.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-950/20 hover:border-emerald-500 hover:shadow-sm transition-all flex items-start gap-3 group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 font-semibold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  <span className="truncate">{item.title}</span>
                  <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                    <path d="M3.5 3h5v5M8.5 3.5L3.5 8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
