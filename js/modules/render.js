/**
 * render.js — Shared DOM Rendering Helpers
 * DevOps Atlas Learning Portal
 */

import { Progress } from './progress.js';

// ── Tech Badge Renderer ───────────────────────────────────
function techBadge(tech) {
  const cls = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
  const map = {
    linux: 'linux', bash: 'bash', git: 'git', github: 'github',
    docker: 'docker', kubernetes: 'kubernetes', k8s: 'k8s',
    helm: 'helm', argocd: 'argocd', terraform: 'terraform',
    ansible: 'ansible', jenkins: 'jenkins', prometheus: 'prometheus',
    grafana: 'grafana', aws: 'aws', gcp: 'gcp', azure: 'azure',
    nginx: 'nginx', networking: 'networking', security: 'security',
    cicd: 'cicd',
  };
  const badgeCls = map[cls] || 'platform';
  return `<span class="badge badge-${badgeCls}">${tech}</span>`;
}

function difficultyBadge(difficulty) {
  const icons = { beginner: '🟢', intermediate: '🟡', advanced: '🔴' };
  return `<span class="badge badge-${difficulty}">${icons[difficulty] || ''} ${difficulty}</span>`;
}

function relevanceBadge(relevance) {
  const icons = { high: '🔥', medium: '⚡', low: '💧' };
  return `<span class="badge badge-${relevance}">${icons[relevance] || ''} ${relevance}</span>`;
}

function durationLabel(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

// ── Lab Card ──────────────────────────────────────────────
function renderLabCard(lab, searchQuery = '') {
  const completed = Progress.isCompleted(lab.id);
  const title = searchQuery
    ? highlightText(lab.title, searchQuery)
    : lab.title;

  return `
    <div class="lab-card ${completed ? 'completed' : ''}" data-lab-id="${lab.id}">
      <div class="lab-card-header">
        <label class="checkbox-wrapper lab-card-checkbox">
          <input
            type="checkbox"
            ${completed ? 'checked' : ''}
            data-lab-id="${lab.id}"
            aria-label="Mark '${lab.title}' as completed"
          />
          <span class="checkbox-box"></span>
        </label>
        <div>
          <div class="lab-card-title">${title}</div>
          <div class="lab-card-platform">📍 ${lab.platform}</div>
        </div>
      </div>

      ${lab.description ? `
        <p class="text-sm" style="color: var(--text-secondary); line-height: 1.6;">
          ${lab.description}
        </p>
      ` : ''}

      <div class="lab-card-meta">
        ${lab.technology.slice(0, 3).map(techBadge).join('')}
        ${difficultyBadge(lab.difficulty)}
      </div>

      <div class="lab-card-footer">
        <div class="lab-card-duration">
          ⏱ ${durationLabel(lab.durationMin)}
          &nbsp;·&nbsp;
          ${relevanceBadge(lab.interviewRelevance)}
          ${!lab.creditCardRequired ? '&nbsp;<span class="badge badge-free">💳 No CC</span>' : ''}
          ${lab.freeForever ? '<span class="badge badge-free">✅ Free Forever</span>' : ''}
        </div>
        <a
          href="${lab.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary btn-sm"
          aria-label="Open ${lab.title} lab"
        >
          Open Lab →
        </a>
      </div>
    </div>
  `;
}

// ── Lab Row (compact) ─────────────────────────────────────
function renderLabRow(lab, searchQuery = '') {
  const completed = Progress.isCompleted(lab.id);
  const title = searchQuery ? highlightText(lab.title, searchQuery) : lab.title;

  return `
    <div class="lab-row ${completed ? 'completed' : ''}" data-lab-id="${lab.id}">
      <label class="checkbox-wrapper" style="margin: 0;">
        <input
          type="checkbox"
          ${completed ? 'checked' : ''}
          data-lab-id="${lab.id}"
          aria-label="Mark '${lab.title}' as completed"
        />
        <span class="checkbox-box"></span>
      </label>
      <div class="lab-row-info">
        <div class="lab-row-title">${title}</div>
        <div class="lab-row-meta">
          ${lab.technology.slice(0, 2).map(techBadge).join('')}
          ${difficultyBadge(lab.difficulty)}
          <span class="text-xs" style="color: var(--text-muted);">⏱ ${durationLabel(lab.durationMin)}</span>
        </div>
      </div>
      <a
        href="${lab.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost btn-sm"
      >→</a>
    </div>
  `;
}

// ── Project Card ──────────────────────────────────────────
function renderProjectCard(project) {
  return `
    <div class="project-card" data-project-id="${project.id}">
      <div class="project-card-number">PROJECT ${project.number}</div>
      <div class="project-card-title">${project.title}</div>
      <p class="project-card-desc">${project.description}</p>
      <div class="flex flex-wrap gap-2">
        ${project.technology.slice(0, 4).map(techBadge).join('')}
        ${difficultyBadge(project.difficulty)}
        <span class="badge badge-platform">⏱ ~${project.estimatedHours}h</span>
      </div>
      <div class="mt-4">
        <div class="text-xs font-semibold" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">What you'll build</div>
        <p class="text-sm" style="color: var(--text-secondary);">${project.deliverable}</p>
      </div>
      ${project.skills && project.skills.length ? `
        <div class="mt-4 flex flex-wrap gap-1">
          ${project.skills.slice(0, 5).map(s =>
            `<span class="badge badge-platform text-xs">${s}</span>`
          ).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

// ── Stat Card ─────────────────────────────────────────────
function renderStatCard({ icon, value, label, sublabel, color }) {
  return `
    <div class="stat-card">
      <div class="stat-card-header">
        <div class="stat-card-icon" style="color: ${color || 'var(--brand-primary)'}">
          ${icon}
        </div>
      </div>
      <div class="stat-card-value" style="color: ${color || 'var(--text-primary)'}">
        ${value}
      </div>
      <div class="stat-card-label">${label}</div>
      ${sublabel ? `<div class="stat-card-sublabel">${sublabel}</div>` : ''}
    </div>
  `;
}

// ── Progress Ring SVG ─────────────────────────────────────
function renderProgressRing(percentage, size = 120, strokeWidth = 8) {
  const r = (size / 2) - strokeWidth;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;

  return `
    <div class="progress-ring" style="width: ${size}px; height: ${size}px;">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: var(--brand-primary)" />
            <stop offset="100%" style="stop-color: var(--brand-secondary)" />
          </linearGradient>
        </defs>
        <circle
          class="progress-ring-track"
          cx="${size / 2}" cy="${size / 2}" r="${r}"
          stroke-width="${strokeWidth}"
        />
        <circle
          class="progress-ring-fill"
          cx="${size / 2}" cy="${size / 2}" r="${r}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
        />
      </svg>
      <div class="progress-ring-label">
        <span class="progress-ring-pct">${percentage}%</span>
        <span class="progress-ring-text">Done</span>
      </div>
    </div>
  `;
}

// ── Toast Notification ────────────────────────────────────
function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

// ── Text Highlighting ─────────────────────────────────────
function highlightText(text, query) {
  if (!query || !query.trim()) return text;
  const terms = query.trim().split(/\s+/).filter(Boolean);
  let result = text;
  terms.forEach(term => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark class="search-highlight">$1</mark>'
    );
  });
  return result;
}

// ── Empty State ───────────────────────────────────────────
function renderEmptyState(icon, title, subtitle) {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${subtitle}</p>
    </div>
  `;
}

// ── Wire up checkbox delegation ───────────────────────────
function wireCheckboxes(container, onToggle) {
  container.addEventListener('change', e => {
    if (e.target.type === 'checkbox' && e.target.dataset.labId) {
      const labId = e.target.dataset.labId;
      const isDone = Progress.toggle(labId);
      onToggle?.(labId, isDone);

      // Update card appearance
      const card = container.querySelector(`[data-lab-id="${labId}"]`);
      if (card) {
        card.classList.toggle('completed', isDone);
      }

      showToast(
        isDone ? '✅ Lab marked as completed!' : '↩️ Lab marked as incomplete',
        isDone ? 'success' : 'info',
        2500
      );
    }
  });
}

export {
  techBadge, difficultyBadge, relevanceBadge, durationLabel,
  renderLabCard, renderLabRow, renderProjectCard, renderStatCard,
  renderProgressRing, showToast, highlightText, renderEmptyState,
  wireCheckboxes,
};
