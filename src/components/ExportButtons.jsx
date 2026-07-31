/**
 * ExportButtons.jsx
 * Minimal export action buttons.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportToCSV, exportToPDF } from '../utils/exportHelpers';

const DownloadIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M8 2v8M5 7l3 3 3-3"/><path d="M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1"/>
  </svg>
);

export default function ExportButtons() {
  const { participants } = useApp();
  const [exporting, setExporting] = useState(null);

  const handle = async (type) => {
    if (!participants.length) return;
    setExporting(type);
    try { type === 'csv' ? exportToCSV(participants) : exportToPDF(participants); }
    finally { setTimeout(() => setExporting(null), 800); }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handle('csv')}
        disabled={!participants.length || exporting === 'csv'}
        className="btn btn-secondary"
        style={{ fontSize: '0.8125rem', padding: '6px 12px' }}
      >
        <DownloadIcon />
        {exporting === 'csv' ? 'Exporting…' : 'CSV'}
      </button>
      <button
        onClick={() => handle('pdf')}
        disabled={!participants.length || exporting === 'pdf'}
        className="btn btn-secondary"
        style={{ fontSize: '0.8125rem', padding: '6px 12px' }}
      >
        <DownloadIcon />
        {exporting === 'pdf' ? 'Generating…' : 'PDF'}
      </button>
    </div>
  );
}
