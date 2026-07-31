/**
 * csvParser.js
 * Handles CSV parsing, data sanitization, official Google point calculations, and ranking.
 * Implements Dense Ranking algorithm for clear, participant-friendly rankings.
 */

import Papa from 'papaparse';
import { getAchievementBadges } from './achievementBadges';

/**
 * Flexible column name matching
 */
const findColumn = (headers, candidates) => {
  const lower = headers.map(h => h.toLowerCase().trim());
  for (const candidate of candidates) {
    const idx = lower.findIndex(h => h.includes(candidate.toLowerCase()));
    if (idx !== -1) return headers[idx];
  }
  return null;
};

/**
 * Capitalize names nicely (Title Case)
 */
const formatName = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Parse a boolean/status field safely
 */
const parseStatusBool = (val, trueKeywords = ['yes', '1', 'true', 'verified', 'milestone', 'gear', 'all good']) => {
  if (val === null || val === undefined || val === '') return false;
  const str = String(val).toLowerCase().trim();
  if (str === 'none' || str === 'no' || str === 'not yet submitted' || str === '0' || str === 'false') {
    return false;
  }
  return trueKeywords.some(kw => str.includes(kw));
};

/**
 * Parse numeric values safely
 */
const parseNum = (val) => {
  if (val === null || val === undefined || val === '') return 0;
  const n = Number(String(val).trim().replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
};

/**
 * 1. Arcade Points (Official Formula):
 * Arcade Points = Arcade Games Completed + floor(Skill Badges Completed / 2)
 */
export const computeArcadePoints = (arcadeGames, skillBadges) => {
  return arcadeGames + Math.floor(skillBadges / 2);
};

/**
 * 2. Milestone Bonus Points (Official Rule - Non-Cumulative):
 * Uses General Milestone Earned from CSV.
 * Highest Milestone Achieved -> Bonus Points:
 * - None: 0
 * - Milestone 1: 5
 * - Milestone 2: 15
 * - Milestone 3: 25
 * - Ultimate Milestone: 35
 */
export const computeMilestoneBonus = (milestoneText, arcadeGames, skillBadges) => {
  if (!milestoneText || milestoneText.toLowerCase() === 'none' || milestoneText.toLowerCase() === 'no') {
    return 0;
  }

  const text = milestoneText.toLowerCase().trim();

  // If CSV explicitly names the milestone:
  if (text.includes('ultimate') || text.includes('milestone 4') || text.includes('milestone 5')) return 35;
  if (text.includes('milestone 3')) return 25;
  if (text.includes('milestone 2')) return 15;
  if (text.includes('milestone 1')) return 5;

  // Fallback: If CSV says "Yes" or "Earned", determine highest milestone achieved by games & badges:
  if (arcadeGames >= 8 && skillBadges >= 40) return 35;
  if (arcadeGames >= 6 && skillBadges >= 30) return 25;
  if (arcadeGames >= 4 && skillBadges >= 20) return 15;
  if (arcadeGames >= 2 && skillBadges >= 10) return 5;

  return 5;
};

/**
 * 3. Bonus Milestone Bonus:
 * If Bonus Milestone Earned = Yes -> +10 Bonus Points, Otherwise -> 0
 */
export const computeBonusMilestoneBonus = (bonusMilestone) => {
  return bonusMilestone ? 10 : 0;
};

/**
 * 4. Total Points:
 * Total Points = Arcade Points + Milestone Bonus Points + Bonus Milestone Bonus
 */
export const computeTotalPoints = (arcadePoints, milestoneBonus, bonusMilestoneBonus) => {
  return arcadePoints + milestoneBonus + bonusMilestoneBonus;
};

/**
 * 14. Dense Ranking Algorithm:
 * Sort participants by:
 * 1. Total Points (Highest)
 * 2. Arcade Points (Tie-breaker)
 * 3. Arcade Games Completed (Tie-breaker)
 *
 * Dense Ranking Rule:
 * - Same score = Same rank.
 * - Next unique score = Next consecutive rank (WITHOUT skipping numbers!).
 * Example: Rank 1, Rank 1, Rank 1, Rank 2, Rank 2, Rank 3, Rank 4...
 */
export const assignRanks = (participants) => {
  if (!participants || participants.length === 0) return [];

  // Sort by Total Points (desc), Arcade Points (desc), Arcade Games (desc)
  const sorted = [...participants].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.arcadePoints !== a.arcadePoints) return b.arcadePoints - a.arcadePoints;
    return b.arcadeGames - a.arcadeGames;
  });

  const ranked = [];
  let currentRank = 1;

  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];

    if (i > 0) {
      const prev = sorted[i - 1];
      const isSameScore =
        prev.totalPoints === p.totalPoints &&
        prev.arcadePoints === p.arcadePoints &&
        prev.arcadeGames === p.arcadeGames;

      if (!isSameScore) {
        currentRank += 1; // Dense ranking: increment by 1, NEVER skip numbers!
      }
    }

    ranked.push({ ...p, rank: currentRank });
  }

  return ranked;
};

/**
 * Evaluates AI Agent Status based on General Milestone prerequisite
 */
export const getAiAgentEligibility = (participant) => {
  if (participant.aiAgent) {
    return { status: 'verified', label: 'Verified', emoji: '🤖', type: 'success' };
  }
  if (participant.milestone) {
    return { status: 'pending', label: 'Pending Verification', emoji: '⏳', type: 'warning' };
  }
  return { status: 'ineligible', label: 'Not Eligible Yet', emoji: '⚪', type: 'ineligible' };
};

/**
 * Evaluates Bonus Milestone Status based on General Milestone prerequisite
 */
export const getBonusMilestoneEligibility = (participant) => {
  if (participant.bonusMilestone) {
    return { status: 'earned', label: 'Earned (+10 Bonus Points)', emoji: '⭐', type: 'success' };
  }
  if (participant.milestone) {
    return { status: 'in_progress', label: 'Not Earned', emoji: '⏳', type: 'warning' };
  }
  return { status: 'ineligible', label: 'Not Eligible Yet', emoji: '⚪', type: 'ineligible' };
};

/**
 * Main CSV parser — parses raw CSV text/file and returns processed participants.
 * Strictly strips all PII (email, profile URLs) and computes scores + ranks using Dense Ranking.
 */
export const parseCSV = (source) => {
  return new Promise((resolve, reject) => {
    const config = {
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
      transform: (value) => (typeof value === 'string' ? value.trim() : value),
      complete: (results) => {
        try {
          const { data, meta } = results;
          if (!data || data.length === 0) {
            resolve([]);
            return;
          }

          const headers = meta.fields || [];

          // ── Column Detection ──────────────────────────────────────────
          const nameCol = findColumn(headers, ['user name', 'name', 'participant', 'student']);
          const skillBadgesCol = findColumn(headers, ['# of skill badges', 'skill badge', 'skill_badge', 'badges completed']);
          const arcadeGamesCol = findColumn(headers, ['# of arcade games', 'arcade game', 'arcade_game', 'games completed']);
          
          const skillsStatusCol = findColumn(headers, ['google skills profile url status', 'skills profile status', 'skills status']);
          const devStatusCol = findColumn(headers, ['google developer profile url status', 'developer profile status', 'developer status']);
          const accessCodeCol = findColumn(headers, ['access code redemption status', 'access code']);
          
          const aiAgentCol = findColumn(headers, ['ai agent verification status', 'ai agent', 'ai_agent', 'agent (arcade']);
          const gearCol = findColumn(headers, ['gear digital badges earned', 'gear', 'gear badge']);
          const milestoneCol = findColumn(headers, ['general milestone earned', 'general milestone', 'milestone']);
          const bonusMilestoneCol = findColumn(headers, ['bonus milestone earned', 'bonus milestone', 'bonus']);

          // ── Process Each Row ─────────────────────────────────────────
          const processed = data
            .filter(row => nameCol && row[nameCol] && row[nameCol].toString().trim() !== '')
            .map((row, index) => {
              const rawName = row[nameCol]?.toString().trim() || `Participant ${index + 1}`;
              const name = formatName(rawName);

              const skillBadges = parseNum(skillBadgesCol ? row[skillBadgesCol] : 0);
              const arcadeGames = parseNum(arcadeGamesCol ? row[arcadeGamesCol] : 0);

              // Program statuses
              const skillsProfileStatus = skillsStatusCol ? (row[skillsStatusCol] || 'All Good').trim() : 'All Good';
              const developerProfileStatus = devStatusCol ? (row[devStatusCol] || 'All Good').trim() : 'All Good';
              const accessCodeStatus = accessCodeCol ? (row[accessCodeCol] || 'Yes').trim() : 'Yes';

              const milestoneText = milestoneCol ? (row[milestoneCol] || 'None').trim() : 'None';
              const bonusMilestoneText = bonusMilestoneCol ? (row[bonusMilestoneCol] || 'No').trim() : 'No';
              const aiAgentStatus = aiAgentCol ? (row[aiAgentCol] || 'Not yet submitted').trim() : 'Not yet submitted';
              const gearBadgesText = gearCol ? (row[gearCol] || '').trim() : '';

              // Booleans for quick checks
              const aiAgent = parseStatusBool(aiAgentStatus, ['verified', 'yes', 'true']);
              const milestone = parseStatusBool(milestoneText, ['milestone', 'yes', 'true']);
              const bonusMilestone = parseStatusBool(bonusMilestoneText, ['yes', 'true', '1']);
              const gearBadge = parseStatusBool(gearBadgesText, ['arcade - gear', 'gear']);

              // Individual GEAR badge detection
              const hasGeminiEnterpriseGear = gearBadgesText.toLowerCase().includes('gemini enterprise agent ready');
              const hasArcadeGear = gearBadgesText.toLowerCase().includes('arcade - gear');

              // Official Point Calculations
              const arcadePoints = computeArcadePoints(arcadeGames, skillBadges);
              const milestoneBonus = computeMilestoneBonus(milestoneText, arcadeGames, skillBadges);
              const bonusMilestoneBonus = computeBonusMilestoneBonus(bonusMilestone);
              const totalPoints = computeTotalPoints(arcadePoints, milestoneBonus, bonusMilestoneBonus);

              const participant = {
                id: `${name}-${index}`,
                name,
                skillBadges,
                arcadeGames,
                aiAgent,
                gearBadge,
                milestone,
                bonusMilestone,
                // Official Points
                arcadePoints,
                milestoneBonus,
                bonusMilestoneBonus,
                totalPoints,
                progressScore: totalPoints,
                rank: 1, // Will be computed accurately in assignRanks using Dense Ranking
                // Program status checklist data
                skillsProfileStatus,
                developerProfileStatus,
                accessCodeStatus,
                milestoneText,
                bonusMilestoneText,
                aiAgentStatus,
                gearBadgesText,
                hasGeminiEnterpriseGear,
                hasArcadeGear,
              };

              participant.badges = getAchievementBadges(participant);
              return participant;
            });

          // ── Assign Ranks with Dense Ranking ───────────────────────────
          const ranked = assignRanks(processed);
          resolve(ranked);
        } catch (err) {
          reject(err);
        }
      },
      error: reject,
    };

    if (typeof source === 'string') {
      Papa.parse(source, config);
    } else {
      Papa.parse(source, config);
    }
  });
};

/**
 * Compute aggregate statistics using official points
 */
export const computeStats = (participants) => {
  const total = participants.length;
  if (total === 0) return {};

  const totalSkillBadges = participants.reduce((s, p) => s + p.skillBadges, 0);
  const totalArcadeGames = participants.reduce((s, p) => s + p.arcadeGames, 0);
  
  const totalArcadePoints = participants.reduce((s, p) => s + p.arcadePoints, 0);
  const totalTotalPoints = participants.reduce((s, p) => s + p.totalPoints, 0);

  const milestoneCount = participants.filter(p => p.milestone).length;
  const bonusMilestoneCount = participants.filter(p => p.bonusMilestone).length;
  const aiAgentCount = participants.filter(p => p.aiAgent).length;
  const gearCount = participants.filter(p => p.gearBadge).length;
  const completed6Games = participants.filter(p => p.arcadeGames >= 6).length;

  return {
    total,
    totalSkillBadges,
    totalArcadeGames,
    totalArcadePoints,
    totalTotalPoints,
    milestoneCount,
    bonusMilestoneCount,
    aiAgentCount,
    gearCount,
    completed6Games,
  };
};
