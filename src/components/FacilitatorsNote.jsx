/**
 * FacilitatorsNote.jsx
 * Heartfelt Facilitators' Appreciation Note & Official Closure Notice.
 * Replaces the obsolete "how to complete milestones" guide with a closing message
 * from facilitators Sachin Upparna & Vikas A. L., along with the portal sunset notice.
 */

import React from 'react';

export default function FacilitatorsNote() {
  return (
    <div id="facilitators-note" className="card p-6 sm:p-8 space-y-6 border-2 border-amber-400/60 dark:border-amber-500/40 bg-gradient-to-br from-white via-amber-50/30 to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20 shadow-lg rounded-2xl relative overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-300/15 dark:bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-300/15 dark:bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-extrabold bg-amber-400 text-gray-900 uppercase tracking-wider shadow-sm">
            <span>💙</span> Official Facilitators' Note
          </span>
          <span className="text-2xs sm:text-xs font-bold text-amber-700 dark:text-amber-300">
            Google Cloud Arcade Cohort 2026
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          A Heartfelt Thank You to All Participants! 🙏
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
          From Facilitators <strong className="text-gray-900 dark:text-white">Sachin Upparna</strong> & <strong className="text-gray-900 dark:text-white">Vikas A. L.</strong>
        </p>
      </div>

      {/* Facilitator Appreciation Message */}
      <div className="relative z-10 space-y-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          Dear Learners & Participants,
        </p>
        <p>
          As the <strong>Google Cloud Arcade 2026</strong> journey comes to a close with this final <strong>September 18th update</strong>, we want to express our deepest gratitude and admiration to each and every one of you.
        </p>
        <p>
          Over the past several weeks, your dedication, enthusiasm, late nights cracking labs, and passion for cloud engineering have been truly inspiring. Together as a community, you completed hundreds of Arcade Games, earned thousands of Skill Badges, and built hands-on expertise across Google Cloud architectures, BigQuery, Kubernetes, and Generative AI.
        </p>
        <p>
          Whether you reached the <strong>Ultimate Milestone</strong> or earned your very first cloud badge, you have achieved something meaningful and developed practical skills that will empower your tech careers. We are immensely proud of your accomplishments and grateful for having you in this cohort!
        </p>
      </div>

      {/* ⚠️ Portal Sunset & Closure Notice Card */}
      <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border-2 border-amber-400/60 dark:border-amber-500/50 space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-900 dark:text-amber-200 text-sm sm:text-base">
          <span className="text-xl">⚠️</span>
          <span>Important Notice: Website Closure</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
          This community progress portal has now completed its intended mission. The website will be <strong>permanently closed and decommissioned on or before the 2nd week of October 2026</strong>.
        </p>
        <p className="text-2xs sm:text-xs text-amber-800 dark:text-amber-300 font-semibold">
          📌 We strongly encourage all participants to take screenshots or download/record your final scores, ranks, and milestone proofs for your records and portfolios before the portal goes offline.
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
