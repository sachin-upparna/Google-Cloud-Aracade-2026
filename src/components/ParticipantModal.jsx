/**
 * ParticipantModal.jsx
 * Participant detail modal displaying official Google points breakdown,
 * Detailed Current Goal Card (Progressive Milestone System), Program Status Checklist,
 * and Needs Attention alert box.
 */

import React from 'react';
import Modal from 'react-modal';
import { getAiAgentEligibility, getBonusMilestoneEligibility } from '../utils/csvParser';
import { evaluateCurrentGoal, getGameBarColor, getBadgeBarColor } from './CurrentGoalCard';

Modal.setAppElement('#root');

const StatusRow = ({ label, statusObj }) => {
  const { type, label: textLabel, emoji } = statusObj;

  let badgeStyle = "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  if (type === 'success') {
    badgeStyle = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700";
  } else if (type === 'warning') {
    badgeStyle = "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700";
  } else if (type === 'danger') {
    badgeStyle = "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-700";
  }

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-800/80 last:border-b-0 text-xs">
      <span className="font-semibold text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1.5 ${badgeStyle}`}>
        <span>{emoji}</span>
        <span>{textLabel}</span>
      </span>
    </div>
  );
};

export default function ParticipantModal({ participant, onClose }) {
  if (!participant) return null;

  const {
    name,
    rank,
    arcadeGames,
    skillBadges,
    milestone,
    arcadePoints,
    milestoneBonus,
    bonusMilestoneBonus,
    totalPoints,
    skillsProfileStatus,
    developerProfileStatus,
    accessCodeStatus,
    hasGeminiEnterpriseGear,
    hasArcadeGear,
  } = participant;

  // Evaluate Current Goal for this participant
  const goal = evaluateCurrentGoal(participant);

  // Status evaluations
  const aiAgentStatusObj = getAiAgentEligibility(participant);
  const bonusMilestoneStatusObj = getBonusMilestoneEligibility(participant);

  const isSkillsGood = (skillsProfileStatus || '').toLowerCase().includes('all good');
  const isDevGood = (developerProfileStatus || '').toLowerCase().includes('all good');
  const isAccessCodeRedeemed = (accessCodeStatus || '').toLowerCase().includes('yes') || (accessCodeStatus || '').toLowerCase().includes('redeemed');

  // Automatic Needs Attention list
  const actionItems = [];
  if (!hasGeminiEnterpriseGear) actionItems.push('Claim Gemini Enterprise Agent Ready Badge');
  if (!hasArcadeGear) actionItems.push('Claim Arcade - GEAR Badge');
  if (!isAccessCodeRedeemed) actionItems.push('Redeem Access Code');
  if (!isSkillsGood) actionItems.push('Fix Google Skills Profile');
  if (!isDevGood) actionItems.push('Fix Google Developer Profile');
  if (!milestone) actionItems.push('Complete General Milestone');
  if (milestone && bonusMilestoneStatusObj.status === 'in_progress') actionItems.push('Complete Bonus Milestone');

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Progress Bar Colors
  const gameColor = getGameBarColor(arcadeGames);
  const badgeColor = getBadgeBarColor(skillBadges);

  return (
    <Modal
      isOpen={!!participant}
      onRequestClose={onClose}
      contentLabel={`Program Status for ${name}`}
      closeTimeoutMS={150}
    >
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg w-full mx-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center font-extrabold text-xl shadow-inner flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold truncate text-white">{name}</h2>
              <p className="text-xs text-blue-200 mt-0.5 font-medium">
                Community Rank #{rank} · {totalPoints} Total Points
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">

          {/* 18. Detailed Current Goal Card */}
          {goal && (
            <div className="card p-4 border-2 border-amber-300 dark:border-amber-700/80 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-gray-800/80 dark:to-amber-950/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <span className="text-base">🎯</span> Current Goal
                </span>
                <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100">
                  {goal.title}
                </span>
              </div>

              {goal.completedAll ? (
                <div className="p-3 rounded-xl bg-emerald-500 text-white text-center space-y-1 text-xs">
                  <span className="text-xl block">🎉</span>
                  <span className="font-bold block">Congratulations!</span>
                  <span>{goal.message}</span>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  
                  {/* Arcade Games Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Arcade Games Progress</span>
                      <span className="font-bold text-gray-900 dark:text-white tabular-nums">
                        {arcadeGames} / {goal.targetGames} Games
                      </span>
                    </div>
                    <div className="progress-track h-2 bg-gray-200 dark:bg-gray-700">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min((arcadeGames / goal.targetGames) * 100, 100)}%`,
                          background: gameColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Skill Badges Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Skill Badges Progress</span>
                      <span className="font-bold text-gray-900 dark:text-white tabular-nums">
                        {skillBadges} / {goal.targetBadges} Badges
                      </span>
                    </div>
                    <div className="progress-track h-2 bg-gray-200 dark:bg-gray-700">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min((skillBadges / goal.targetBadges) * 100, 100)}%`,
                          background: badgeColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Remaining & Reward Breakdown */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800/60">
                      <span className="text-2xs font-bold uppercase tracking-wider text-gray-400 block">Remaining</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-2xs block">
                        • {goal.remainingGames} Arcade Games
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-2xs block">
                        • {goal.remainingBadges} Skill Badges
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800/60">
                      <span className="text-2xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">Goal Reward</span>
                      <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-xs block">
                        +{goal.reward} Bonus Points
                      </span>
                      <span className="text-2xs text-gray-400 block mt-0.5">
                        Est. Total: <strong>{goal.estimatedTotalPoints} pts</strong>
                      </span>
                    </div>
                  </div>

                  {/* Motivational Message */}
                  <p className="italic text-2xs text-amber-900 dark:text-amber-200 font-medium text-center pt-0.5">
                    💡 "{goal.message}"
                  </p>

                </div>
              )}
            </div>
          )}

          {/* Official Points Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              🏆 Official Points Summary
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50/70 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="font-semibold text-blue-700 dark:text-blue-300 block">🎮 Arcade Points</span>
                <span className="font-extrabold text-blue-900 dark:text-blue-100 text-base tabular-nums">
                  {arcadePoints} pts
                </span>
              </div>
              <div className="bg-amber-50/70 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="font-semibold text-amber-700 dark:text-amber-300 block">⭐ Milestone Bonus</span>
                <span className="font-extrabold text-amber-900 dark:text-amber-100 text-base tabular-nums">
                  +{milestoneBonus} pts
                </span>
              </div>
              <div className="bg-rose-50/70 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-800">
                <span className="font-semibold text-rose-700 dark:text-rose-300 block">🎁 Bonus Milestone</span>
                <span className="font-extrabold text-rose-900 dark:text-rose-100 text-base tabular-nums">
                  +{bonusMilestoneBonus} pts
                </span>
              </div>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300 block">🏆 Total Points</span>
                <span className="font-extrabold text-emerald-900 dark:text-emerald-100 text-base tabular-nums">
                  {totalPoints} pts
                </span>
              </div>
            </div>
          </div>

          {/* Needs Attention Automatic Alert Box */}
          {actionItems.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-bold text-xs uppercase tracking-wider">
                <span className="text-base">⚠️</span>
                <span>Needs Attention ({actionItems.length} Incomplete)</span>
              </div>
              <ul className="space-y-1 pl-5 list-disc text-xs text-amber-900 dark:text-amber-200 font-medium">
                {actionItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Program Status Checklist */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              📋 Program Status Checklist
            </h3>
            <div className="card p-3.5 space-y-0.5 bg-gray-50/50 dark:bg-gray-800/30">
              <StatusRow
                label="Google Skills Profile"
                statusObj={
                  isSkillsGood
                    ? { type: 'success', label: 'All Good', emoji: '✅' }
                    : { type: 'danger', label: 'Needs Attention', emoji: '❌' }
                }
              />
              <StatusRow
                label="Google Developer Profile"
                statusObj={
                  isDevGood
                    ? { type: 'success', label: 'All Good', emoji: '✅' }
                    : { type: 'danger', label: 'Needs Attention', emoji: '❌' }
                }
              />
              <StatusRow
                label="Access Code Redemption"
                statusObj={
                  isAccessCodeRedeemed
                    ? { type: 'success', label: 'Redeemed', emoji: '✅' }
                    : { type: 'danger', label: 'Not Redeemed', emoji: '❌' }
                }
              />
              <StatusRow
                label="General Milestone"
                statusObj={
                  milestone
                    ? { type: 'success', label: 'Earned', emoji: '✅' }
                    : { type: 'warning', label: 'Not Earned', emoji: '⏳' }
                }
              />
              <StatusRow
                label="Bonus Milestone"
                statusObj={bonusMilestoneStatusObj}
              />
              <StatusRow
                label="AI Agent Verification"
                statusObj={aiAgentStatusObj}
              />
              <StatusRow
                label="Gemini Enterprise Agent Ready"
                statusObj={
                  hasGeminiEnterpriseGear
                    ? { type: 'success', label: 'Claimed', emoji: '✅' }
                    : { type: 'danger', label: 'Not Claimed', emoji: '❌' }
                }
              />
              <StatusRow
                label="Arcade - GEAR Badge"
                statusObj={
                  hasArcadeGear
                    ? { type: 'success', label: 'Claimed', emoji: '✅' }
                    : { type: 'danger', label: 'Not Claimed', emoji: '❌' }
                }
              />
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
}
