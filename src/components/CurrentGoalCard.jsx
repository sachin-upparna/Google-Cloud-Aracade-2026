/**
 * CurrentGoalCard.jsx
 * Progressive Milestone System Component.
 * Automatically determines and displays the participant's NEXT achievable goal.
 * Features milestone-aware colored progress bars (Red / Orange / Green),
 * estimated total points after completion, and dynamic motivational messages.
 */

import React from 'react';
import { useApp } from '../context/AppContext';

// Milestone Progress Bar Color Helper
export const getGameBarColor = (count) => {
  if (count <= 2) return '#d93025'; // Red (0-2)
  if (count <= 5) return '#f9ab00'; // Orange (3-5)
  return '#188038'; // Green (6+)
};

export const getBadgeBarColor = (count) => {
  if (count <= 8) return '#d93025'; // Red (0-8)
  if (count <= 17) return '#f9ab00'; // Orange (9-17)
  return '#188038'; // Green (18+)
};

// Current Goal Evaluation Helper
export const evaluateCurrentGoal = (participant) => {
  if (!participant) return null;

  const {
    arcadeGames,
    skillBadges,
    milestone,
    bonusMilestone,
    arcadePoints,
  } = participant;

  const isUltimateCompleted = arcadeGames >= 12 && skillBadges >= 66 && milestone;
  const isBonusCompleted = bonusMilestone;

  // 6. Celebration State (Both Ultimate & Bonus completed)
  if (isUltimateCompleted && isBonusCompleted) {
    return {
      completedAll: true,
      title: "All Milestones Completed!",
      message: "You have successfully completed all available milestones in the Google Cloud Arcade Facilitator Program. Thank you for your dedication and commitment to continuous learning.",
    };
  }

  // 5. Bonus Milestone Goal (Ultimate completed, Bonus not earned)
  if (isUltimateCompleted && !isBonusCompleted) {
    return {
      completedAll: false,
      step: "Bonus Milestone",
      title: "Bonus Milestone",
      targetGames: 12,
      targetBadges: 66,
      remainingGames: 0,
      remainingBadges: 0,
      reward: 10,
      estimatedTotalPoints: arcadePoints + 35 + 10,
      isBonusGoal: true,
      message: "Complete your Bonus Milestone challenge to unlock +10 Bonus Points!",
    };
  }

  // 1. Milestone 1 (If General Milestone not earned or < 6 Games / < 18 Badges)
  if (arcadeGames < 6 || skillBadges < 18) {
    const remGames = Math.max(0, 6 - arcadeGames);
    const remBadges = Math.max(0, 18 - skillBadges);
    const estArcade = (arcadeGames + remGames) + Math.floor((skillBadges + remBadges) / 2);
    const estTotal = estArcade + 5 + (bonusMilestone ? 10 : 0);

    let msg = "Great progress! Keep learning—you're getting closer to Milestone 1.";
    if (remGames === 1) msg = "You're only 1 Arcade Game away from Milestone 1!";
    else if (remBadges <= 2 && remBadges > 0) msg = `Complete ${remBadges} more Skill Badge${remBadges > 1 ? 's' : ''} to unlock Milestone 1!`;

    return {
      completedAll: false,
      step: "Milestone 1",
      title: "Milestone 1",
      targetGames: 6,
      targetBadges: 18,
      remainingGames: remGames,
      remainingBadges: remBadges,
      reward: 5,
      estimatedTotalPoints: estTotal,
      message: msg,
    };
  }

  // 2. Milestone 2 (8 Games / 34 Badges)
  if (arcadeGames < 8 || skillBadges < 34) {
    const remGames = Math.max(0, 8 - arcadeGames);
    const remBadges = Math.max(0, 34 - skillBadges);
    const estArcade = (arcadeGames + remGames) + Math.floor((skillBadges + remBadges) / 2);
    const estTotal = estArcade + 15 + (bonusMilestone ? 10 : 0);

    let msg = "Great progress! Keep learning—you're getting closer to Milestone 2.";
    if (remGames === 1) msg = "You're only 1 Arcade Game away from Milestone 2!";
    else if (remBadges <= 2 && remBadges > 0) msg = `Complete ${remBadges} more Skill Badge${remBadges > 1 ? 's' : ''} to unlock Milestone 2!`;

    return {
      completedAll: false,
      step: "Milestone 2",
      title: "Milestone 2",
      targetGames: 8,
      targetBadges: 34,
      remainingGames: remGames,
      remainingBadges: remBadges,
      reward: 15,
      estimatedTotalPoints: estTotal,
      message: msg,
    };
  }

  // 3. Milestone 3 (10 Games / 50 Badges)
  if (arcadeGames < 10 || skillBadges < 50) {
    const remGames = Math.max(0, 10 - arcadeGames);
    const remBadges = Math.max(0, 50 - skillBadges);
    const estArcade = (arcadeGames + remGames) + Math.floor((skillBadges + remBadges) / 2);
    const estTotal = estArcade + 25 + (bonusMilestone ? 10 : 0);

    let msg = "You're on track to earn +25 Bonus Points for Milestone 3!";
    if (remGames === 1) msg = "You're only 1 Arcade Game away from Milestone 3!";
    else if (remBadges <= 2 && remBadges > 0) msg = `Complete ${remBadges} more Skill Badge${remBadges > 1 ? 's' : ''} to unlock Milestone 3!`;

    return {
      completedAll: false,
      step: "Milestone 3",
      title: "Milestone 3",
      targetGames: 10,
      targetBadges: 50,
      remainingGames: remGames,
      remainingBadges: remBadges,
      reward: 25,
      estimatedTotalPoints: estTotal,
      message: msg,
    };
  }

  // 4. Ultimate Milestone (12 Games / 66 Badges)
  const remGames = Math.max(0, 12 - arcadeGames);
  const remBadges = Math.max(0, 66 - skillBadges);
  const estArcade = (arcadeGames + remGames) + Math.floor((skillBadges + remBadges) / 2);
  const estTotal = estArcade + 35 + (bonusMilestone ? 10 : 0);

  return {
    completedAll: false,
    step: "Ultimate Milestone",
    title: "Ultimate Milestone",
    targetGames: 12,
    targetBadges: 66,
    remainingGames: remGames,
    remainingBadges: remBadges,
    reward: 35,
    estimatedTotalPoints: estTotal,
    message: "Keep going! Every badge and game brings you closer to the Ultimate Milestone.",
  };
};

export default function CurrentGoalCard() {
  const { participants, loading } = useApp();

  if (loading || !participants || participants.length === 0) return null;

  // Default to top participant or cohort leader for preview
  const featuredParticipant = participants[0];
  const goal = evaluateCurrentGoal(featuredParticipant);

  if (!goal) return null;

  return (
    <div id="current-goal" className="card p-6 border-2 border-amber-300 dark:border-amber-700 bg-white dark:bg-gray-900 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            🎯 Current Goal Spotlight
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Progressive Milestone Tracker for <strong className="text-gray-800 dark:text-gray-200">{featuredParticipant.name}</strong>
          </p>
        </div>
        <span className="text-2xs font-extrabold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
          Rank #{featuredParticipant.rank}
        </span>
      </div>

      {goal.completedAll ? (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center space-y-2">
          <span className="text-3xl block">🎉</span>
          <h3 className="text-lg font-extrabold">Congratulations!</h3>
          <p className="text-xs text-emerald-100 max-w-md mx-auto leading-relaxed">
            {goal.message}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Milestone Target & Reward */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
            <div className="text-2xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Next Goal Target
            </div>
            <div className="text-xl font-extrabold text-amber-900 dark:text-amber-100">
              {goal.title}
            </div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Reward: +{goal.reward} Bonus Points
            </div>
          </div>

          {/* Remaining Requirements */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="text-2xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Remaining Requirements
            </div>
            <ul className="text-xs font-semibold text-gray-800 dark:text-gray-200 space-y-1">
              <li>• {goal.remainingGames} Arcade Game{goal.remainingGames !== 1 ? 's' : ''}</li>
              <li>• {goal.remainingBadges} Skill Badge{goal.remainingBadges !== 1 ? 's' : ''}</li>
            </ul>
          </div>

          {/* Estimated Total Points */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
            <div className="text-2xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Est. Total Points After Goal
            </div>
            <div className="text-2xl font-extrabold text-blue-900 dark:text-blue-100 tabular-nums">
              {goal.estimatedTotalPoints} pts
            </div>
            <div className="text-2xs text-blue-600 dark:text-blue-400">
              Arcade Pts + Milestone Bonus
            </div>
          </div>

        </div>
      )}

      {/* Dynamic Motivational Message */}
      {!goal.completedAll && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/60 text-xs font-semibold text-blue-900 dark:text-blue-200 text-center italic">
          💡 "{goal.message}"
        </div>
      )}

    </div>
  );
}
