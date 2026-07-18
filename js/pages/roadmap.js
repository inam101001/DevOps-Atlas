/**
 * roadmap.js (page) — Interactive 10-Week Roadmap
 * DevOps Atlas Learning Portal
 */

import { ROADMAP } from '../data/roadmap.js';
import { LABS } from '../data/labs.js';
import { Progress } from '../modules/progress.js';
import { techBadge, wireCheckboxes, renderLabCard } from '../modules/render.js';

function renderRoadmapPage(container) {
  const stats = Progress.getStats();
  const currentWeek = Progress.getCurrentWeek();

  container.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1>🗺️ Learning Roadmap</h1>
        <p class="page-subtitle">
          Your 10-week DevOps learning path — from Linux fundamentals to production cloud deployments.
          Complete all weeks to be job-ready for Junior DevOps &amp; Cloud Engineer roles.
        </p>
      </div>

      <!-- Roadmap Overview Bar -->
      <div class="card card-glass mb-8">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div class="text-lg font-bold" style="color: var(--text-primary);">
              ${stats.done} of ${stats.total} labs completed
            </div>
            <div class="text-sm" style="color: var(--text-muted);">
              ${stats.doneHours}h of ${stats.totalHours}h total practice
            </div>
          </div>
          <div style="flex: 1; max-width: 400px;">
            <div class="progress-labeled">
              <div class="progress-header">
                <span class="progress-label">Overall Completion</span>
                <span class="progress-value">${stats.percentage}%</span>
              </div>
              <div class="progress-bar thick">
                <div class="progress-fill" style="width: ${stats.percentage}%"></div>
              </div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-print-roadmap">🖨️ Print Checklist</button>
        </div>
      </div>

      <!-- Week Cards Grid -->
      <div class="roadmap-grid" id="roadmap-weeks">
        ${ROADMAP.map(week => renderWeekCard(week, stats, currentWeek)).join('')}
      </div>

      <!-- Interview Topics Summary -->
      <div class="section mt-12">
        <div class="section-title mb-6"><span class="icon">🎤</span> Interview Topics by Week</div>
        <div class="accordion" id="interview-accordion">
          ${ROADMAP.map(week => `
            <div class="accordion-item" data-week="${week.week}">
              <div class="accordion-header">
                <div class="accordion-question">
                  ${week.emoji} Week ${week.week} — ${week.title}
                </div>
                <span class="accordion-chevron">▼</span>
              </div>
              <div class="accordion-body">
                <div class="accordion-content">
                  <ul style="list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                    ${(week.interviewTopics || []).map(q =>
                      `<li>${q}</li>`
                    ).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // ── Wire week card accordion open/close ──────────────
  document.querySelectorAll('.week-card').forEach(card => {
    const header = card.querySelector('.week-card-header');
    const body = card.querySelector('.week-card-body');
    header?.addEventListener('click', () => {
      body.classList.toggle('hidden');
    });
  });

  // ── Wire week lab checkboxes ──────────────────────────
  const weekGrid = document.getElementById('roadmap-weeks');
  if (weekGrid) {
    wireCheckboxes(weekGrid, (labId, isDone) => {
      // Update week progress bar in card
      const card = weekGrid.querySelector(`[data-lab-id="${labId}"]`)?.closest('.week-card');
      if (card) updateWeekCardProgress(card, stats);
    });
  }

  // ── Wire interview accordion ──────────────────────────
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });

  // ── Wire print ───────────────────────────────────────
  document.getElementById('btn-print-roadmap')?.addEventListener('click', () => {
    window.print();
  });

  // ── Wire "Set as Current Week" buttons ────────────────
  document.querySelectorAll('[data-set-week]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const week = parseInt(btn.dataset.setWeek, 10);
      Progress.setCurrentWeek(week);
      renderRoadmapPage(container);
    });
  });
}

function renderWeekCard(week, stats, currentWeek) {
  const ws = stats.weekStats[week.week] || { done: 0, total: 0 };
  const pct = ws.total > 0 ? Math.round((ws.done / ws.total) * 100) : 0;
  const isCompleted = pct === 100 && ws.total > 0;
  const isCurrent = week.week === currentWeek;

  // Labs for this week
  const weekLabs = LABS.filter(l => l.week === week.week);

  return `
    <div class="week-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" data-week="${week.week}">
      <div class="week-card-header">
        <div class="week-number">${isCompleted ? '✓' : week.week}</div>
        <div class="week-info">
          <div class="week-title">${week.emoji} ${week.title}</div>
          <div class="week-subtitle">${week.subtitle}</div>
        </div>
        ${isCurrent ? `<span class="badge badge-free" style="flex-shrink:0;">Current</span>` : ''}
      </div>

      <!-- Week Progress -->
      <div style="padding: 12px 20px; border-bottom: 1px solid var(--border-subtle);">
        <div class="progress-labeled">
          <div class="progress-header">
            <span class="progress-label">Progress</span>
            <span class="progress-value">${ws.done}/${ws.total}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      </div>

      <!-- Platforms -->
      <div style="padding: 12px 20px; border-bottom: 1px solid var(--border-subtle);">
        <div class="text-xs font-semibold mb-2" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">
          Platforms
        </div>
        <div class="flex flex-wrap gap-2">
          ${(week.platforms || []).map(p => `<span class="badge badge-platform">${p}</span>`).join('')}
        </div>
      </div>

      <!-- Key Objectives -->
      <div class="week-card-body" style="padding: 16px 20px;">
        <div class="text-xs font-semibold mb-3" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">
          Key Objectives
        </div>
        <ul style="
          list-style: none; padding: 0;
          display: flex; flex-direction: column; gap: 6px;
        ">
          ${(week.objectives || []).slice(0, 5).map(obj => `
            <li class="flex gap-2 items-start text-sm" style="color: var(--text-secondary);">
              <span style="color: var(--brand-accent); flex-shrink: 0; margin-top: 2px;">→</span>
              ${obj}
            </li>
          `).join('')}
        </ul>

        <!-- Labs in this week -->
        <div class="mt-4">
          <div class="text-xs font-semibold mb-3" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">
            Labs (${weekLabs.length})
          </div>
          <div class="week-lab-list">
            ${weekLabs.slice(0, 6).map(lab => {
              const done = Progress.isCompleted(lab.id);
              return `
                <div class="week-lab-item ${done ? 'done' : ''}" data-lab-id="${lab.id}">
                  <label class="checkbox-wrapper" style="margin: 0; gap: 8px;" onclick="event.stopPropagation()">
                    <input type="checkbox" ${done ? 'checked' : ''} data-lab-id="${lab.id}" aria-label="${lab.title}"/>
                    <span class="checkbox-box" style="width:16px;height:16px;"></span>
                  </label>
                  <a href="${lab.url}" target="_blank" rel="noopener noreferrer"
                     class="text-sm" style="color: inherit; flex:1; text-decoration: none;"
                     onclick="event.stopPropagation()">
                    ${lab.title}
                  </a>
                  <span class="text-xs" style="color: var(--text-muted); white-space: nowrap;">${lab.durationMin}m</span>
                </div>
              `;
            }).join('')}
            ${weekLabs.length > 6 ? `
              <div class="text-xs text-center mt-2" style="color: var(--text-muted);">
                +${weekLabs.length - 6} more labs →
                <a href="#/labs" style="color: var(--brand-primary);">View All</a>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="flex gap-2 mt-4">
          ${!isCurrent ? `
            <button class="btn btn-ghost btn-sm" data-set-week="${week.week}">
              Set as Current
            </button>
          ` : ''}
          <a href="#/labs" class="btn btn-secondary btn-sm" style="flex: 1; justify-content: center;">
            View All Labs →
          </a>
        </div>
      </div>
    </div>
  `;
}

function updateWeekCardProgress(card, stats) {
  const week = parseInt(card.dataset.week, 10);
  const ws = stats.weekStats[week];
  if (!ws) return;
  const pct = Math.round((ws.done / ws.total) * 100);
  const bar = card.querySelector('.progress-fill');
  const label = card.querySelector('.progress-value');
  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `${ws.done}/${ws.total}`;
}

export { renderRoadmapPage };
