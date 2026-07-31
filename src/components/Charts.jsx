/**
 * Charts.jsx
 * Six analytics charts. Clean, minimal Chart.js with Google color palette.
 * No gaming aesthetics.
 */

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { useApp } from '../context/AppContext';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  ArcElement, Title, Tooltip, Legend, Filler
);

// Google palette (accessible, not neon)
const G = {
  blue:   '#1a73e8',
  green:  '#188038',
  yellow: '#f9ab00',
  red:    '#d93025',
  purple: '#7b1fa2',
  teal:   '#00796b',
};

const a = (hex, alpha) => hex + Math.round(alpha * 255).toString(16).padStart(2, '0');

const baseOpts = (dark) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 500 },
  plugins: {
    legend: {
      labels: {
        color: dark ? '#9aa0a6' : '#5f6368',
        font: { family: 'Inter', size: 11 },
        boxWidth: 10,
        padding: 12,
      },
    },
    tooltip: {
      backgroundColor: dark ? '#1c1f26' : '#202124',
      titleColor: '#fff',
      bodyColor: dark ? '#9aa0a6' : '#e8eaed',
      cornerRadius: 6,
      padding: 10,
      titleFont: { size: 12, weight: '600' },
      bodyFont: { size: 11 },
    },
  },
  scales: {
    x: {
      ticks: { color: dark ? '#9aa0a6' : '#5f6368', font: { size: 10 } },
      grid:  { color: dark ? '#2a2d35' : '#f1f3f4', drawBorder: false },
    },
    y: {
      ticks: { color: dark ? '#9aa0a6' : '#5f6368', font: { size: 10 } },
      grid:  { color: dark ? '#2a2d35' : '#f1f3f4', drawBorder: false },
      beginAtZero: true,
    },
  },
});

const donutOpts = (dark) => ({
  ...baseOpts(dark),
  scales: undefined,
  cutout: '68%',
  plugins: {
    ...baseOpts(dark).plugins,
    legend: { ...baseOpts(dark).plugins.legend, position: 'bottom' },
  },
});

const ChartCard = ({ title, children }) => (
  <div className="card p-5">
    <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>{title}</p>
    <div style={{ position: 'relative', height: '240px' }}>{children}</div>
  </div>
);

export default function Charts() {
  const { participants, darkMode, loading } = useApp();

  const data = useMemo(() => {
    if (!participants.length) return null;
    const sorted = [...participants].sort((a, b) => b.progressScore - a.progressScore);
    const top10 = sorted.slice(0, 10);

    const gamesDist = { '0': 0, '1–2': 0, '3–5': 0, '6': 0, '7–11': 0, '12+': 0 };
    participants.forEach(p => {
      if (p.arcadeGames === 0)        gamesDist['0']++;
      else if (p.arcadeGames <= 2)    gamesDist['1–2']++;
      else if (p.arcadeGames <= 5)    gamesDist['3–5']++;
      else if (p.arcadeGames === 6)   gamesDist['6']++;
      else if (p.arcadeGames < 12)    gamesDist['7–11']++;
      else                            gamesDist['12+']++;
    });

    const badgeDist = { '0–10': 0, '11–30': 0, '31–50': 0, '51–65': 0, '66': 0 };
    participants.forEach(p => {
      if (p.skillBadges <= 10)       badgeDist['0–10']++;
      else if (p.skillBadges <= 30)  badgeDist['11–30']++;
      else if (p.skillBadges <= 50)  badgeDist['31–50']++;
      else if (p.skillBadges < 66)   badgeDist['51–65']++;
      else                           badgeDist['66']++;
    });

    const scoreDist = {};
    sorted.forEach(p => {
      const b = `${Math.floor(p.progressScore / 5) * 5}+`;
      scoreDist[b] = (scoreDist[b] || 0) + 1;
    });

    const milYes = participants.filter(p => p.milestone).length;
    const gearYes = participants.filter(p => p.gearBadge).length;
    const n = participants.length;

    return { top10, gamesDist, badgeDist, scoreDist, milYes, milNo: n - milYes, gearYes, gearNo: n - gearYes };
  }, [participants]);

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-5" style={{ height: '300px' }}>
            <div className="skeleton h-4 w-40 mb-4" />
            <div className="skeleton w-full" style={{ height: '220px' }} />
          </div>
        ))}
      </div>
    );
  }

  const opts = baseOpts(darkMode);
  const dOpts = donutOpts(darkMode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="Top 10 Learners by Progress Score">
        <Bar data={{
          labels: data.top10.map(p => p.name.split(' ')[0]),
          datasets: [{ label: 'Progress Score', data: data.top10.map(p => p.progressScore),
            backgroundColor: a(G.blue, 0.75), borderColor: G.blue, borderWidth: 1, borderRadius: 4 }],
        }} options={{ ...opts, indexAxis: 'y' }} />
      </ChartCard>

      <ChartCard title="Arcade Games Distribution">
        <Bar data={{
          labels: Object.keys(data.gamesDist),
          datasets: [{ label: 'Participants', data: Object.values(data.gamesDist),
            backgroundColor: [a(G.red,0.65),a(G.yellow,0.65),a(G.teal,0.65),a(G.green,0.75),a(G.blue,0.65),a(G.blue,0.85)],
            borderRadius: 4, borderWidth: 0 }],
        }} options={opts} />
      </ChartCard>

      <ChartCard title="Skill Badge Distribution">
        <Bar data={{
          labels: Object.keys(data.badgeDist),
          datasets: [{ label: 'Participants', data: Object.values(data.badgeDist),
            backgroundColor: a(G.green, 0.7), borderRadius: 4, borderWidth: 0 }],
        }} options={opts} />
      </ChartCard>

      <ChartCard title="Progress Score Distribution">
        <Line data={{
          labels: Object.keys(data.scoreDist),
          datasets: [{ label: 'Participants', data: Object.values(data.scoreDist),
            borderColor: G.blue, backgroundColor: a(G.blue, 0.08), fill: true, tension: 0.4,
            pointBackgroundColor: G.blue, pointRadius: 3, borderWidth: 2 }],
        }} options={opts} />
      </ChartCard>

      <ChartCard title="Milestone Completion">
        <Doughnut data={{
          labels: ['Milestone Achieved', 'In Progress'],
          datasets: [{ data: [data.milYes, data.milNo],
            backgroundColor: [a(G.green,0.85), a(G.red,0.2)],
            borderColor: [G.green, '#e8eaed'], borderWidth: 2, hoverOffset: 4 }],
        }} options={dOpts} />
      </ChartCard>

      <ChartCard title="GEAR Badge Completion">
        <Doughnut data={{
          labels: ['GEAR Earned', 'In Progress'],
          datasets: [{ data: [data.gearYes, data.gearNo],
            backgroundColor: [a(G.purple,0.85), a(G.red,0.2)],
            borderColor: [G.purple, '#e8eaed'], borderWidth: 2, hoverOffset: 4 }],
        }} options={dOpts} />
      </ChartCard>
    </div>
  );
}
