/**
 * AppContext.jsx
 * Global state management for the Community Progress Dashboard.
 * Handles CSV parsing, dark mode, rank movement tracking, and dynamic updates.json loading.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { parseCSV, computeStats } from '../utils/csvParser';
import { buildRankMap, computeMovement, getTopMovers } from '../utils/rankHelpers';

const AppContext = createContext(null);

const DEFAULT_UPDATES = {
  announcements: ["🎉 Welcome to the Google Cloud Arcade Community Progress Dashboard!"],
  motivationalMessages: ["Keep learning and building your cloud skills."],
  quickLinks: [],
  learningResources: [],
  latestUpdates: []
};

export const AppProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);
  const [stats, setStats] = useState({});
  const [movementMap, setMovementMap] = useState({});
  const [topMovers, setTopMovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updatesData, setUpdatesData] = useState(DEFAULT_UPDATES);

  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('gca-dark-mode') === 'true'; } catch { return false; }
  });
  const [previousRankMap, setPreviousRankMap] = useState(() => {
    try {
      const stored = localStorage.getItem('gca-previous-ranks');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });
  const [confettiTrigger, setConfettiTrigger] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  // ── Dark Mode ─────────────────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('gca-dark-mode', String(darkMode)); } catch {}
  }, [darkMode]);

  // ── Load updates.json ──────────────────────────────────────────────
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch('/updates.json');
        if (res.ok) {
          const data = await res.json();
          setUpdatesData(data);
        }
      } catch (err) {
        console.warn('Could not load updates.json, using default fallback:', err);
      }
    };
    fetchUpdates();
  }, []);

  // ── Process Participants ──────────────────────────────────────────
  const processParticipants = useCallback((newParticipants, fromUpload = false) => {
    const movement = computeMovement(newParticipants, previousRankMap);
    const movers = getTopMovers(newParticipants, movement, 5);

    setParticipants(newParticipants);
    setStats(computeStats(newParticipants));
    setMovementMap(movement);
    setTopMovers(movers);

    // Record timestamp of this update (IST)
    const now = new Date();
    const formatted = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setLastUpdated(`${formatted} IST`);

    // Confetti for milestone participants on upload
    if (fromUpload && Object.keys(previousRankMap).length > 0) {
      const milestoneHitters = newParticipants.filter(p => {
        const prev = previousRankMap[p.name.toLowerCase()];
        return (p.arcadeGames === 6 || p.arcadeGames === 12) && !prev;
      });
      if (milestoneHitters.length > 0) {
        setConfettiTrigger(Date.now());
      }
    }

    if (fromUpload) {
      const newRankMap = buildRankMap(newParticipants);
      setPreviousRankMap(newRankMap);
      try { localStorage.setItem('gca-previous-ranks', JSON.stringify(newRankMap)); } catch {}
      setIsUploaded(true);
    }
  }, [previousRankMap]);

  // ── Load Default CSV ──────────────────────────────────────────────
  useEffect(() => {
    const loadDefault = async () => {
      try {
        setLoading(true);
        const response = await fetch('/leaderboard.csv');
        if (!response.ok) throw new Error('Could not load leaderboard.csv');
        const text = await response.text();
        const parsed = await parseCSV(text);
        processParticipants(parsed, false);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load CSV:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDefault();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Upload CSV Handler ────────────────────────────────────────────
  const uploadCSV = useCallback(async (file) => {
    try {
      setLoading(true);
      setError(null);
      const parsed = await parseCSV(file);
      processParticipants(parsed, true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [processParticipants]);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  return (
    <AppContext.Provider value={{
      participants,
      stats,
      movementMap,
      topMovers,
      loading,
      error,
      lastUpdated,
      updatesData,
      darkMode,
      toggleDarkMode,
      uploadCSV,
      confettiTrigger,
      isUploaded,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
