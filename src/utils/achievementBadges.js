/**
 * achievementBadges.js
 * Assigns achievement badges based on participant stats
 */

/**
 * Returns an array of badge objects for a participant
 * @param {Object} participant - Processed participant data
 * @returns {Array} Array of badge objects { label, emoji, color, bgColor }
 */
export function getAchievementBadges(participant) {
  const badges = [];
  const { arcadeGames, progressScore, aiAgent, gearBadge } = participant;

  // Progress-based badge (mutually exclusive, highest wins)
  if (arcadeGames === 0) {
    badges.push({ label: 'Just Starting', emoji: '🌱', color: '#5F6368', bgColor: 'rgba(95,99,104,0.1)', key: 'progress' });
  } else if (arcadeGames >= 1 && arcadeGames <= 2) {
    badges.push({ label: 'Explorer', emoji: '🟡', color: '#FBBC05', bgColor: 'rgba(251,188,5,0.1)', key: 'progress' });
  } else if (arcadeGames >= 3 && arcadeGames <= 5) {
    badges.push({ label: 'Achiever', emoji: '🟠', color: '#FF6D00', bgColor: 'rgba(255,109,0,0.1)', key: 'progress' });
  } else if (arcadeGames === 6) {
    badges.push({ label: 'Completed 6 Games ✅', emoji: '🟢', color: '#34A853', bgColor: 'rgba(52,168,83,0.1)', key: 'progress' });
  } else if (arcadeGames >= 12) {
    badges.push({ label: 'Milestone Achieved ⭐', emoji: '⭐', color: '#4285F4', bgColor: 'rgba(66,133,244,0.1)', key: 'progress' });
  } else if (arcadeGames >= 7) {
    badges.push({ label: 'Great Progress', emoji: '🚀', color: '#34A853', bgColor: 'rgba(52,168,83,0.1)', key: 'progress' });
  }

  // High progress score — framed as a learning milestone, not a competition winner
  if (progressScore >= 40) {
    badges.push({ label: 'Deep Learner', emoji: '🏆', color: '#FF6D00', bgColor: 'rgba(255,109,0,0.12)', key: 'legend' });
  }

  // AI Agent Verified
  if (aiAgent) {
    badges.push({ label: 'AI Agent Verified', emoji: '🤖', color: '#4285F4', bgColor: 'rgba(66,133,244,0.1)', key: 'ai' });
  }

  // GEAR Badge
  if (gearBadge) {
    badges.push({ label: 'GEAR Badge Earned', emoji: '🎖', color: '#9C27B0', bgColor: 'rgba(156,39,176,0.1)', key: 'gear' });
  }

  return badges;
}

/**
 * Returns the primary progress badge label only
 */
export function getPrimaryBadge(arcadeGames) {
  if (arcadeGames === 0) return { label: 'Just Starting', emoji: '🌱', color: '#5F6368' };
  if (arcadeGames <= 2) return { label: 'Explorer', emoji: '🟡', color: '#FBBC05' };
  if (arcadeGames <= 5) return { label: 'Achiever', emoji: '🟠', color: '#FF6D00' };
  if (arcadeGames >= 12) return { label: 'Milestone Achieved', emoji: '⭐', color: '#4285F4' };
  return { label: 'Great Progress', emoji: '🚀', color: '#34A853' };
}
