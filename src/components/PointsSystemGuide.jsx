/**
 * PointsSystemGuide.jsx
 * Official Google Cloud Arcade Facilitator Points System explanation section.
 * Rendered at the bottom of the dashboard before Footer.
 */

import React, { useState } from 'react';

export default function PointsSystemGuide() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="card p-6 border-2 border-blue-200 dark:border-blue-800 space-y-6 bg-white dark:bg-gray-900 transition-colors">
      
      {/* Section Header with Toggle */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>🏆</span> Official Points System Explanation
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Learn how your Arcade Points, Milestone Bonuses, and Total Points are calculated
          </p>
        </div>

        <button
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all text-xs font-bold flex items-center gap-1"
          aria-label="Toggle section"
        >
          <span>{isOpen ? 'Collapse' : 'Expand'}</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="space-y-6 pt-2 border-t border-gray-100 dark:border-gray-800">
          
          {/* 4 Points Breakdown Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Arcade Points */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm">
                <span className="text-base">🎮</span> Arcade Points
              </div>
              <ul className="text-xs text-blue-950 dark:text-blue-200 space-y-1 list-disc pl-4">
                <li>Every 1 Arcade Game = <strong>1 Arcade Point</strong></li>
                <li>Every 2 Skill Badges = <strong>1 Arcade Point</strong></li>
              </ul>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 font-mono text-2xs font-bold text-blue-700 dark:text-blue-300 text-center">
                Arcade Points = Arcade Games + floor(Skill Badges ÷ 2)
              </div>
            </div>

            {/* 2. Milestone Bonus Points */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm">
                <span className="text-base">⭐</span> Milestone Bonus Points
              </div>
              <p className="text-xs text-amber-950 dark:text-amber-200 leading-normal">
                Awarded for the <strong>highest milestone achieved</strong> (Non-cumulative).
              </p>
              <div className="text-xs border border-amber-200 dark:border-amber-800 rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 bg-amber-100 dark:bg-amber-900/60 font-bold p-1 text-2xs text-amber-900 dark:text-amber-100">
                  <span>Milestone</span><span className="text-right">Bonus Points</span>
                </div>
                <div className="p-1 space-y-0.5 text-2xs text-amber-950 dark:text-amber-200">
                  <div className="flex justify-between"><span>Milestone 1</span><span className="font-bold">+5 pts</span></div>
                  <div className="flex justify-between"><span>Milestone 2</span><span className="font-bold">+15 pts</span></div>
                  <div className="flex justify-between"><span>Milestone 3</span><span className="font-bold">+25 pts</span></div>
                  <div className="flex justify-between"><span>Ultimate Milestone</span><span className="font-bold">+35 pts</span></div>
                </div>
              </div>
            </div>

            {/* 3. Bonus Milestone */}
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200 text-sm">
                <span className="text-base">🎁</span> Bonus Milestone
              </div>
              <p className="text-xs text-rose-950 dark:text-rose-200 leading-normal">
                Earned by completing official bonus milestone challenges.
              </p>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-lg border border-rose-200 dark:border-rose-800 text-2xs font-bold text-rose-700 dark:text-rose-300 text-center">
                Earned: +10 Bonus Points <br />
                Not Earned: 0 Bonus Points
              </div>
            </div>

            {/* 4. Total Points */}
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                <span className="text-base">🏆</span> Total Points
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-normal">
                Sum of your Arcade Points, Highest Milestone Bonus, and Bonus Milestone.
              </p>
              <div className="bg-white dark:bg-gray-900 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 font-mono text-2xs font-bold text-emerald-700 dark:text-emerald-300 text-center">
                Total Points = Arcade + Milestone Bonus + Bonus Milestone
              </div>
            </div>

          </div>

          {/* ℹ️ Important Notes Card */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-xs uppercase tracking-wider">
              <span className="text-base">ℹ️</span> Important Notes
            </div>
            <ul className="text-xs text-blue-950 dark:text-blue-200 space-y-1 list-disc pl-5">
              <li>Milestone Bonus Points are awarded <strong>only for the highest milestone achieved</strong>.</li>
              <li>Milestone Bonus Points are <strong>not cumulative</strong>.</li>
              <li>Bonus Milestone awards a maximum of <strong>10 Bonus Points</strong>.</li>
              <li>Official participant statuses (Milestones, AI Verification, GEAR Badges, Access Code, etc.) are taken directly from the daily Google CSV.</li>
            </ul>
          </div>

          {/* ⚠️ Point Calculation Disclaimer */}
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-xs uppercase tracking-wider">
              <span className="text-base">⚠️</span> Point Calculation Disclaimer
            </div>
            <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed italic">
              Disclaimer: The points shown on this dashboard are calculated automatically based on the official Google Cloud Arcade Facilitator point system and the latest CSV provided by Google. While every effort has been made to match Google's official calculations, these values are generated automatically and may not always be 100% accurate due to updates in program rules or data interpretation. Please verify your final points manually using the official Google Cloud Arcade Facilitator points system and your latest progress report.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
