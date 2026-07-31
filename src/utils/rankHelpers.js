/**
 * rankHelpers.js
 * Utilities for rank movement tracking and top movers detection.
 */

/**
 * Build a name→rank map from an array of participants.
 */
export const buildRankMap = (participants) => {
  const map = {};
  participants.forEach(p => {
    map[p.name.toLowerCase()] = p.rank;
  });
  return map;
};

/**
 * Compute rank movement for each current participant vs. previous snapshot.
 * @param {Array} current - Current ranked participants
 * @param {Object} previousRankMap - name → rank map from previous upload
 * @returns {Object} name → { delta, label, type }
 */
export const computeMovement = (current, previousRankMap) => {
  const movement = {};

  current.forEach(p => {
    const key = p.name.toLowerCase();
    if (!(key in previousRankMap)) {
      movement[key] = { delta: null, label: 'New', type: 'new' };
    } else {
      const prevRank = previousRankMap[key];
      const currRank = p.rank;
      const delta = prevRank - currRank;

      if (delta > 0) {
        movement[key] = { delta, label: `↑ +${delta}`, type: 'up' };
      } else if (delta < 0) {
        movement[key] = { delta, label: `↓ ${delta}`, type: 'down' };
      } else {
        movement[key] = { delta: 0, label: '—', type: 'same' };
      }
    }
  });

  return movement;
};

/**
 * Returns top N participants with the most progress (score increase) since last upload.
 */
export const getTopMovers = (current, movementMap, n = 5) => {
  return current
    .filter(p => {
      const m = movementMap[p.name.toLowerCase()];
      return m && m.type === 'up' && m.delta > 0;
    })
    .sort((a, b) => {
      const da = movementMap[a.name.toLowerCase()].delta;
      const db = movementMap[b.name.toLowerCase()].delta;
      return db - da;
    })
    .slice(0, n);
};
