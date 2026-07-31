/**
 * MilestoneGuide.jsx
 * Static Community Milestone Guide.
 * Displays current program milestones for all participants equally without highlighting individuals.
 */

import React from 'react';

const MILESTONES = [
  {
    step: "1",
    name: "Milestone 1",
    games: "6 Games",
    badges: "18 Skill Badges",
    reward: "+5 Bonus Points",
    color: "#1a73e8", // Google Blue
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50/60 dark:bg-blue-950/40",
    badgeBg: "bg-blue-100 dark:bg-blue-900/80 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700",
  },
  {
    step: "2",
    name: "Milestone 2",
    games: "8 Games",
    badges: "34 Skill Badges",
    reward: "+15 Bonus Points",
    color: "#188038", // Google Green
    border: "border-emerald-200 dark:border-emerald-800",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/40",
    badgeBg: "bg-emerald-100 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700",
  },
  {
    step: "3",
    name: "Milestone 3",
    games: "10 Games",
    badges: "50 Skill Badges",
    reward: "+25 Bonus Points",
    color: "#e65100", // Google Orange
    border: "border-orange-200 dark:border-orange-800",
    bg: "bg-orange-50/60 dark:bg-orange-950/40",
    badgeBg: "bg-orange-100 dark:bg-orange-900/80 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700",
  },
  {
    step: "4",
    name: "Ultimate Milestone",
    games: "12 Games",
    badges: "66 Skill Badges",
    reward: "+35 Bonus Points",
    color: "#d93025", // Google Red
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-50/60 dark:bg-rose-950/40",
    badgeBg: "bg-rose-100 dark:bg-rose-900/80 text-rose-900 dark:text-rose-100 border border-rose-300 dark:border-rose-700",
  },
  {
    step: "5",
    name: "Bonus Milestone",
    games: "Bonus Challenge",
    badges: "Verified Task",
    reward: "+10 Bonus Points",
    color: "#7b1fa2", // Purple
    border: "border-purple-200 dark:border-purple-800",
    bg: "bg-purple-50/60 dark:bg-purple-950/40",
    badgeBg: "bg-purple-100 dark:bg-purple-900/80 text-purple-900 dark:text-purple-100 border border-purple-300 dark:border-purple-700",
  },
];

export default function MilestoneGuide() {
  return (
    <div id="milestone-guide" className="card p-6 space-y-6 border-t-4 border-t-amber-500">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          🎯 Community Milestone Guide
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Current Program Milestones & Requirement Roadmap for all participants
        </p>
      </div>

      {/* Progressive Step Cards Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
        {MILESTONES.map((m, idx) => (
          <div key={m.step} className="flex flex-col justify-between space-y-3">
            {/* Card Content */}
            <div
              className={`p-4 rounded-2xl border-2 ${m.border} ${m.bg} space-y-3 flex-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${m.color}20`, color: m.color }}
                >
                  STEP {m.step}
                </span>
                {idx < MILESTONES.length - 1 && (
                  <span className="hidden md:inline text-gray-400 font-bold text-sm">↓</span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white leading-tight">
                  {m.name}
                </h3>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium space-y-0.5">
                  <p>• {m.games}</p>
                  <p>• {m.badges}</p>
                </div>
              </div>

              {/* Reward Badge */}
              <div className={`mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-center text-xs font-extrabold rounded-lg py-1 ${m.badgeBg}`}>
                Reward {m.reward}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
