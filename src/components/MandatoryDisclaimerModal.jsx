/**
 * MandatoryDisclaimerModal.jsx
 * Mandatory community disclaimer modal displayed on every page load/refresh.
 * Rules:
 * - Cannot be dismissed by clicking outside, pressing Escape, or via close button.
 * - Requires explicit click on "OK, I Understand".
 * - Always shows on fresh page load (no persistent storage).
 */

import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function MandatoryDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleAcknowledge = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {}} // Disallow closing via backdrop or Esc key
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      ariaHideApp={false}
      className="card max-w-xl w-[92%] sm:w-full mx-auto my-auto p-0 overflow-hidden rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none max-h-[90vh] flex flex-col"
      overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-4 sm:p-5 text-white flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-white/20">
          ℹ️
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight leading-tight">
            Important Notice — Community Progress Portal
          </h2>
          <p className="text-2xs text-blue-100 font-medium mt-0.5">
            Please read and acknowledge before proceeding
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
        <p>
          This is a <strong className="text-gray-900 dark:text-white font-bold">community-created progress tracking portal</strong> developed by the Google Cloud Arcade Facilitators, <strong className="text-gray-900 dark:text-white font-bold">Sachin Upparna and Vikas A. L.</strong>
        </p>

        <p>
          This website is <strong className="text-gray-900 dark:text-white font-bold">not an official Google or Google Cloud website</strong> and is not operated, maintained, or endorsed by Google.
        </p>

        <p>
          The information displayed here is based on the <strong className="text-gray-900 dark:text-white font-bold">latest progress reports provided to us by Google</strong> and is updated regularly. Because these reports are updated periodically, your latest activity may not appear immediately.
        </p>

        <p>
          The points shown on this portal are <strong className="text-gray-900 dark:text-white font-bold">automatically calculated estimates based on the Google Cloud Arcade Facilitator points system</strong>. Since the calculation and data processing are automated, there may occasionally be inaccuracies or discrepancies.
        </p>

        {/* Warning Callout Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 space-y-1 text-xs sm:text-xs">
          <p className="font-extrabold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
            <span>⚠️</span>
            <span>Official Score Verification Warning</span>
          </p>
          <p className="font-semibold">
            Please do not consider the points displayed here as your official Arcade score. Always verify your actual points, milestones, badges, and prize eligibility through the official Google Skills Arcade platforms and your own Google profiles.
          </p>
        </div>

        <p>
          This portal is simply a community initiative to help you <strong className="text-gray-900 dark:text-white font-bold">track your progress, stay motivated, and learn together.</strong>
        </p>
      </div>

      {/* Footer Action Button */}
      <div className="p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex justify-end">
        <button
          onClick={handleAcknowledge}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>OK, I Understand</span>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </Modal>
  );
}
