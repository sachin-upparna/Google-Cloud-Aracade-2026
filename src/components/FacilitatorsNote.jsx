/**
 * FacilitatorsNote.jsx
 * Heartfelt Facilitators' Appreciation Note & Official Closure Notice.
 * Replaces the obsolete "how to complete milestones" guide with a closing message
 * from facilitators Sachin Upparna & Vikas A. L., along with the portal sunset notice.
 */

import React from 'react';

export default function FacilitatorsNote() {
  return (
    <div id="facilitators-note" className="card p-6 sm:p-8 space-y-6 border-2 border-amber-400 dark:border-amber-500 bg-gradient-to-br from-white via-amber-50/40 to-slate-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950/30 shadow-2xl rounded-2xl relative overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-400/15 dark:bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-indigo-500/15 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 uppercase tracking-wider shadow-sm">
            <span>🎖️</span> FACILITATORS' FINAL ADDRESS
          </span>
          <span className="text-2xs sm:text-xs font-bold text-amber-700 dark:text-amber-300">
            Cohort 2026 Standings Sealed
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Mission Accomplished: A Thank You to All Learners! 🙏
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
          From Mission Facilitators <strong className="text-gray-900 dark:text-white">Sachin Upparna</strong> & <strong className="text-gray-900 dark:text-white">Vikas A. L.</strong>
        </p>
      </div>

      {/* Facilitator Appreciation Message */}
      <div className="relative z-10 space-y-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <p className="font-semibold text-gray-900 dark:text-white">
          To our 344 Brilliant Learners & Participants,
        </p>
        <p>
          As the <strong>Google Cloud Arcade 2026</strong> mission concludes with this final <strong>September 18th update</strong>, we salute your tenacity, grit, and tireless passion for cloud computing.
        </p>
        <p>
          Throughout this Arcade journey, you dove headfirst into hands-on cloud labs — building architectures, configuring Virtual Machines, debugging Kubernetes clusters, mastering BigQuery analytics, and creating intelligent solutions with Generative AI and Gemini.
        </p>
        <p>
          Whether you earned your first Skill Badge or achieved the prestigious <strong>Ultimate Milestone</strong>, you have acquired genuine, industry-grade capabilities. The skills you forged here will empower your tech careers for years to come. It has been an honor facilitating this cohort!
        </p>
      </div>

      {/* ⚠️ Portal Sunset & Closure Notice Card */}
      <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/50 border-2 border-amber-400/70 dark:border-amber-500/60 space-y-2 shadow-inner">
        <div className="flex items-center gap-2 font-black text-amber-900 dark:text-amber-200 text-sm sm:text-base">
          <span className="text-xl">⚠️</span>
          <span>Mission Decommissioning Protocol: Website Sunset</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
          With all objectives achieved, this community progress portal will be <strong>permanently closed and decommissioned on or before the 2nd week of October 2026</strong>.
        </p>
        <p className="text-2xs sm:text-xs text-amber-800 dark:text-amber-300 font-bold">
          📌 Action Required: Please save final screenshots and records of your rankings, scores, and badges for your portfolios before the portal goes offline.
        </p>
      </div>

      {/* Facilitator Signatures */}
      <div className="relative z-10 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
            SU
          </div>
          <div>
            <p className="font-extrabold text-gray-900 dark:text-white">Sachin Upparna</p>
            <p className="text-2xs text-gray-500 dark:text-gray-400">Google Cloud Arcade Facilitator</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md">
            VA
          </div>
          <div>
            <p className="font-extrabold text-gray-900 dark:text-white">Vikas A. L.</p>
            <p className="text-2xs text-gray-500 dark:text-gray-400">Google Cloud Arcade Facilitator</p>
          </div>
        </div>

        <div className="text-right sm:text-right text-2xs text-gray-400">
          Learn • Build • Grow Together 💙
        </div>
      </div>

    </div>
  );
}
