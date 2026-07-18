/**
 * labs.js (page) — Full Lab Browser with Search + Filters
 * DevOps Atlas Learning Portal
 */

import { LABS, getLabStats } from '../data/labs.js';
import { Search } from '../modules/search.js';
import { Filters } from '../modules/filters.js';
import { Progress } from '../modules/progress.js';
import {
  renderLabCard, renderLabRow,
  renderEmptyState, wireCheckboxes, showToast
} from '../modules/render.js';

let _viewMode = 'grid'; // 'grid' | 'list'
let _searchQuery = '';

function renderLabsPage(container) {
  const stats = getLabStats();

  container.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1>🔬 Lab Browser</h1>
        <p class="page-subtitle">
          ${stats.total}+ free labs across every DevOps technology.
          Filter, search, and track your progress.
        </p>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
        <!-- Search -->
        <div style="
          display: flex; align-items: center; gap: 8px;
          background: var(--bg-input); border: 1px solid var(--border-default);
          border-radius: var(--radius-md); padding: 10px 16px;
          flex: 1; max-width: 400px;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        " id="lab-search-wrapper">
          <span style="color: var(--text-muted); font-size: 1rem;">🔍</span>
          <input
            type="text"
            id="lab-search-input"
            placeholder="Search labs, technologies, tags…"
            value="${_searchQuery}"
            style="
              flex: 1; background: none; border: none; outline: none;
              color: var(--text-primary); font-size: var(--text-sm);
            "
            aria-label="Search labs"
          />
          <button id="lab-search-clear" style="
            display: ${_searchQuery ? 'block' : 'none'};
            background: none; border: none; color: var(--text-muted);
            cursor: pointer; font-size: 1rem; padding: 0;
          " aria-label="Clear search">✕</button>
        </div>

        <!-- View Controls + Count -->
        <div class="flex items-center gap-3">
          <span class="text-sm" style="color: var(--text-muted);" id="lab-count-label">
            ${stats.total} labs
          </span>
          <div class="flex gap-1">
            <button
              class="btn btn-icon ${_viewMode === 'grid' ? 'btn-secondary' : 'btn-ghost'}"
              id="btn-view-grid" title="Grid view" aria-label="Grid view"
            >⊞</button>
            <button
              class="btn btn-icon ${_viewMode === 'list' ? 'btn-secondary' : 'btn-ghost'}"
              id="btn-view-list" title="List view" aria-label="List view"
            >☰</button>
          </div>
          <select class="select" id="lab-sort" style="width: auto;" aria-label="Sort labs">
            <option value="week">Sort by Week</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="duration">Sort by Duration</option>
            <option value="relevance">Sort by Relevance</option>
          </select>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar" id="lab-filter-bar"></div>

      <!-- Results -->
      <div id="labs-results-container">
        <!-- Rendered by updateResults() -->
      </div>
    </div>
  `;

  // ── Wire search ──────────────────────────────────────
  const searchInput = document.getElementById('lab-search-input');
  const searchClear = document.getElementById('lab-search-clear');
  const searchWrapper = document.getElementById('lab-search-wrapper');

  searchInput.addEventListener('focus', () => {
    searchWrapper.style.borderColor = 'var(--border-brand)';
    searchWrapper.style.boxShadow = 'var(--shadow-glow-primary)';
  });
  searchInput.addEventListener('blur', () => {
    searchWrapper.style.borderColor = 'var(--border-default)';
    searchWrapper.style.boxShadow = 'none';
  });

  let searchTimer;
  searchInput.addEventListener('input', e => {
    _searchQuery = e.target.value;
    searchClear.style.display = _searchQuery ? 'block' : 'none';
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => updateResults(), 200);
  });

  searchClear.addEventListener('click', () => {
    _searchQuery = '';
    searchInput.value = '';
    searchClear.style.display = 'none';
    searchInput.focus();
    updateResults();
  });

  // ── Wire view mode ───────────────────────────────────
  document.getElementById('btn-view-grid').addEventListener('click', () => {
    _viewMode = 'grid';
    document.getElementById('btn-view-grid').classList.replace('btn-ghost', 'btn-secondary');
    document.getElementById('btn-view-list').classList.replace('btn-secondary', 'btn-ghost');
    updateResults();
  });

  document.getElementById('btn-view-list').addEventListener('click', () => {
    _viewMode = 'list';
    document.getElementById('btn-view-list').classList.replace('btn-ghost', 'btn-secondary');
    document.getElementById('btn-view-grid').classList.replace('btn-secondary', 'btn-ghost');
    updateResults();
  });

  // ── Wire sort ────────────────────────────────────────
  document.getElementById('lab-sort').addEventListener('change', () => updateResults());

  // ── Wire filters ─────────────────────────────────────
  const filterBar = document.getElementById('lab-filter-bar');
  Filters.renderPills(filterBar, () => updateResults());

  // ── Initial render ───────────────────────────────────
  updateResults();
}

function updateResults() {
  const filterState = Filters.getState();
  const sortValue = document.getElementById('lab-sort')?.value || 'week';

  // Search with filters
  let results = Search.search(_searchQuery, {
    technology: filterState.technology,
    difficulty: filterState.difficulty,
    platform: filterState.platform,
    week: filterState.week,
    interviewRelevance: filterState.interviewRelevance,
    freeForever: filterState.freeForever === true ? true : undefined,
    noCreditCard: filterState.noCreditCard || undefined,
  });

  // Filter by completion status
  if (filterState.completed === 'done') {
    results = results.filter(l => Progress.isCompleted(l.id));
  } else if (filterState.completed === 'todo') {
    results = results.filter(l => !Progress.isCompleted(l.id));
  }

  // Sort
  const diffOrder = { beginner: 0, intermediate: 1, advanced: 2 };
  const relOrder = { high: 0, medium: 1, low: 2 };

  results = [...results].sort((a, b) => {
    switch (sortValue) {
      case 'difficulty': return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      case 'duration':   return a.durationMin - b.durationMin;
      case 'relevance':  return relOrder[a.interviewRelevance] - relOrder[b.interviewRelevance];
      default:           return a.week - b.week;
    }
  });

  // Update count label
  const countLabel = document.getElementById('lab-count-label');
  if (countLabel) countLabel.textContent = `${results.length} labs`;

  // Render results
  const resultsContainer = document.getElementById('labs-results-container');
  if (!resultsContainer) return;

  if (results.length === 0) {
    resultsContainer.innerHTML = renderEmptyState(
      '🔍',
      'No labs found',
      'Try adjusting your search or clearing filters.'
    );
    return;
  }

  // Group by week for better readability
  if (sortValue === 'week' && !_searchQuery) {
    const grouped = {};
    results.forEach(lab => {
      if (!grouped[lab.week]) grouped[lab.week] = [];
      grouped[lab.week].push(lab);
    });

    resultsContainer.innerHTML = Object.entries(grouped).map(([week, labs]) => `
      <div class="section">
        <div class="section-header">
          <div class="section-title">Week ${week} — ${getWeekTitle(parseInt(week))}</div>
          <span class="text-sm" style="color: var(--text-muted);">${labs.length} labs</span>
        </div>
        <div class="${_viewMode === 'grid' ? 'grid-cards' : 'lab-list'}" data-group="week-${week}">
          ${labs.map(lab =>
            _viewMode === 'grid'
              ? renderLabCard(lab, _searchQuery)
              : renderLabRow(lab, _searchQuery)
          ).join('')}
        </div>
      </div>
    `).join('');
  } else {
    resultsContainer.innerHTML = `
      <div class="${_viewMode === 'grid' ? 'grid-cards' : 'lab-list'}" id="labs-flat-list">
        ${results.map(lab =>
          _viewMode === 'grid'
            ? renderLabCard(lab, _searchQuery)
            : renderLabRow(lab, _searchQuery)
        ).join('')}
      </div>
    `;
  }

  // Wire all checkboxes
  wireCheckboxes(resultsContainer);
}

function getWeekTitle(week) {
  const titles = {
    1: '🐧 Linux & Bash', 2: '🌿 Git & GitHub', 3: '🐳 Docker',
    4: '☸️ Kubernetes', 5: '⛵ Helm & Advanced K8s', 6: '⚙️ CI/CD',
    7: '🏗️ Terraform & Ansible', 8: '🔭 ArgoCD & Monitoring',
    9: '☁️ AWS', 10: '🌐 GCP & Azure',
  };
  return titles[week] || `Week ${week}`;
}

export { renderLabsPage };
