/**
 * filters.js — Multi-Tag Filter State Management
 * DevOps Atlas Learning Portal
 */

import { LABS, getAllTechnologies, getAllPlatforms } from '../data/labs.js';

const Filters = {
  _state: {
    technology: null,
    difficulty: null,
    platform: null,
    week: null,
    freeForever: null,
    noCreditCard: false,
    interviewRelevance: null,
    completed: null, // 'done', 'todo', null
  },

  _listeners: [],

  // ── State ────────────────────────────────────────────
  getState() {
    return { ...this._state };
  },

  set(key, value) {
    // Toggle off if same value clicked
    if (this._state[key] === value) {
      this._state[key] = key === 'noCreditCard' ? false : null;
    } else {
      this._state[key] = value;
    }
    this._notify();
  },

  clear() {
    this._state = {
      technology: null, difficulty: null, platform: null,
      week: null, freeForever: null, noCreditCard: false,
      interviewRelevance: null, completed: null,
    };
    this._notify();
  },

  hasActiveFilters() {
    return Object.entries(this._state).some(([k, v]) =>
      k === 'noCreditCard' ? v === true : v !== null
    );
  },

  getActiveCount() {
    return Object.entries(this._state)
      .filter(([k, v]) => k === 'noCreditCard' ? v === true : v !== null)
      .length;
  },

  // ── Subscribers ──────────────────────────────────────
  onChange(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  },

  _notify() {
    this._listeners.forEach(fn => fn(this.getState()));
  },

  // ── Filter Data ──────────────────────────────────────
  getTechnologyOptions() {
    return getAllTechnologies();
  },

  getPlatformOptions() {
    return getAllPlatforms();
  },

  getDifficultyOptions() {
    return ['beginner', 'intermediate', 'advanced'];
  },

  getWeekOptions() {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  },

  getRelevanceOptions() {
    return ['high', 'medium', 'low'];
  },

  // ── Filter Pill Renderer ─────────────────────────────
  /**
   * Render filter pills into a container element
   */
  renderPills(container, onFilter) {
    const state = this._state;

    const groups = [
      {
        label: 'Technology',
        key: 'technology',
        options: this.getTechnologyOptions().slice(0, 12),
      },
      {
        label: 'Difficulty',
        key: 'difficulty',
        options: this.getDifficultyOptions(),
      },
      {
        label: 'Relevance',
        key: 'interviewRelevance',
        options: this.getRelevanceOptions(),
      },
    ];

    container.innerHTML = groups.map(group => `
      <div class="filter-group">
        <span class="filter-group-label">${group.label}:</span>
        ${group.options.map(opt => `
          <button
            class="filter-pill ${state[group.key] === opt ? 'active' : ''}"
            data-key="${group.key}"
            data-value="${opt}"
          >
            ${opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        `).join('')}
      </div>
    `).join('');

    // Add Free Forever pill
    container.innerHTML += `
      <div class="filter-group">
        <span class="filter-group-label">Filters:</span>
        <button
          class="filter-pill ${state.freeForever === true ? 'active' : ''}"
          data-key="freeForever" data-value="true"
        >✅ Free Forever</button>
        <button
          class="filter-pill ${state.noCreditCard ? 'active' : ''}"
          data-key="noCreditCard" data-value="true"
        >💳 No Credit Card</button>
        ${state.completed === 'todo' ? `
          <button class="filter-pill active" data-key="completed" data-value="todo">📋 Todo Only</button>
        ` : `
          <button class="filter-pill ${state.completed === 'done' ? 'active' : ''}" data-key="completed" data-value="done">✅ Completed</button>
          <button class="filter-pill ${state.completed === 'todo' ? 'active' : ''}" data-key="completed" data-value="todo">📋 Todo</button>
        `}
        ${this.hasActiveFilters() ? `
          <button class="filter-pill filter-pill-clear" data-action="clear">✕ Clear All</button>
        ` : ''}
      </div>
    `;

    // Wire events
    container.querySelectorAll('[data-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        let value = btn.dataset.value;

        if (value === 'true') value = true;
        if (key === 'noCreditCard') {
          this._state.noCreditCard = !this._state.noCreditCard;
        } else {
          this.set(key, value);
        }
        if (onFilter) onFilter(this.getState());
        // Re-render pills
        this.renderPills(container, onFilter);
      });
    });

    container.querySelectorAll('[data-action="clear"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.clear();
        if (onFilter) onFilter(this.getState());
        this.renderPills(container, onFilter);
      });
    });
  },
};

// Add CSS for filter groups
const filterGroupStyle = document.createElement('style');
filterGroupStyle.textContent = `
  .filter-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
  }
  .filter-group-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-right: 4px;
    white-space: nowrap;
  }
  .filter-pill-clear {
    background: rgba(248,113,113,0.12);
    color: var(--brand-danger);
    border-color: rgba(248,113,113,0.25);
  }
`;
document.head.appendChild(filterGroupStyle);

export { Filters };
