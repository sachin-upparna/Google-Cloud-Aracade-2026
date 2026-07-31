/**
 * MotivationalBanner.jsx
 * Rotating motivational messages to keep participants encouraged.
 * Collaborative, learning-focused messaging throughout.
 */

import React, { useState, useEffect } from 'react';

const MESSAGES = [
  { text: 'Keep learning and building your cloud skills.', icon: '☁️' },
  { text: 'Every Arcade Game and Skill Badge is a step forward.', icon: '🚀' },
  { text: 'Progress is more important than perfection.', icon: '📈' },
  { text: 'Learn • Build • Grow Together.', icon: '🌱' },
  { text: 'Each badge you earn is real cloud expertise you carry forever.', icon: '🏅' },
  { text: 'You\'re not competing — you\'re growing. Keep going!', icon: '💪' },
  { text: 'Celebrate every milestone. Small wins lead to big achievements.', icon: '🎉' },
  { text: 'The best time to learn cloud skills is right now.', icon: '⚡' },
];

export default function MotivationalBanner() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % MESSAGES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const msg = MESSAGES[idx];

  return (
    <div
      className="rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(66,133,244,0.08) 0%, rgba(52,168,83,0.08) 100%)',
        border: '1px solid rgba(66,133,244,0.18)',
      }}
    >
      {/* Animated dots for the Google color strip */}
      <div className="flex gap-1.5 flex-shrink-0">
        {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map(c => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
      </div>

      {/* Message */}
      <p
        className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-opacity duration-400 flex items-center gap-2"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <span>{msg.icon}</span>
        <span>{msg.text}</span>
      </p>

      {/* Dot indicators */}
      <div className="ml-auto flex gap-1 flex-shrink-0">
        {MESSAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
            style={{ background: i === idx ? '#4285F4' : '#DADCE0' }}
            aria-label={`Message ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
