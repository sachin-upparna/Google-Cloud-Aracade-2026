/**
 * exportHelpers.js
 * CSV and PDF export utilities for the progress dashboard.
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export progress data as a CSV file download.
 * @param {Array} participants - Ranked participants array
 */
export const exportToCSV = (participants) => {
  const headers = ['#', 'Name', 'Progress Score', 'Arcade Games', 'Skill Badges', 'AI Agent', 'GEAR Badge', 'Milestone', 'Bonus Milestone'];

  const rows = participants.map(p => [
    p.rank,
    p.name,
    p.progressScore,
    p.arcadeGames,
    p.skillBadges,
    p.aiAgent ? 'Yes' : 'No',
    p.gearBadge ? 'Yes' : 'No',
    p.milestone ? 'Yes' : 'No',
    p.bonusMilestone ? 'Yes' : 'No',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `gca_progress_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Export progress data as a PDF file download.
 * @param {Array} participants - Ranked participants array
 */
export const exportToPDF = (participants) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // ── Header ──────────────────────────────────────────────────────
  doc.setFillColor(66, 133, 244);
  doc.rect(0, 0, 297, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Google Cloud Arcade — Community Progress Dashboard 2026', 14, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleString()}`, 215, 14);

  // ── Subtitle ─────────────────────────────────────────────────────
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text('Facilitators: Sachin Upparna | Vikas A. L.  •  "Learn • Build • Grow Together"', 14, 28);

  // ── Table ────────────────────────────────────────────────────────
  autoTable(doc, {
    startY: 32,
    head: [['#', 'Participant', 'Progress Score', 'Arcade Games', 'Skill Badges', 'AI Agent', 'GEAR Badge', 'Milestone', 'Bonus']],
    body: participants.map(p => [
      p.rank,
      p.name,
      p.progressScore,
      p.arcadeGames,
      p.skillBadges,
      p.aiAgent ? '✓' : '—',
      p.gearBadge ? '✓' : '—',
      p.milestone ? '✓' : '—',
      p.bonusMilestone ? '✓' : '—',
    ]),
    headStyles: {
      fillColor: [66, 133, 244],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: { fontSize: 8, textColor: [32, 33, 36] },
    alternateRowStyles: { fillColor: [248, 249, 250] },
    rowPageBreak: 'avoid',
    margin: { top: 32, left: 14, right: 14 },
  });

  // ── Footer on each page ──────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Google Cloud Arcade Facilitator Program 2026  •  Every badge is a step forward!  •  Page ${i} of ${totalPages}`,
      14,
      doc.internal.pageSize.height - 8
    );
  }

  doc.save(`gca_progress_${new Date().toISOString().split('T')[0]}.pdf`);
};
