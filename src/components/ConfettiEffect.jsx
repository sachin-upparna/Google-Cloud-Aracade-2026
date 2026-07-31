/**
 * ConfettiEffect.jsx
 * Triggers canvas-confetti celebration when milestone CSV triggers fire.
 */

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function ConfettiEffect() {
  const { confettiTrigger } = useApp();

  useEffect(() => {
    if (!confettiTrigger) return;

    // Burst from both sides
    const count = 300;
    const defaults = { origin: { y: 0.6 } };

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#9C27B0'],
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [confettiTrigger]);

  return null; // No DOM output
}
