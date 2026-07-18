/**
 * progress.js — Lab Completion Tracking (localStorage)
 * DevOps Atlas Learning Portal
 */

import { LABS } from '../data/labs.js';

const PROGRESS_KEY   = 'devops-atlas-progress';   // Set of completed lab IDs
const NOTES_KEY      = 'devops-atlas-notes';       // Map of labId → note string
const WEEK_KEY       = 'devops-atlas-current-week'; // Current week number

const Progress = {

  // ── Initialise ─────────────────────────────────────────
  init() {
    if (!localStorage.getItem(PROGRESS_KEY)) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(NOTES_KEY)) {
      localStorage.setItem(NOTES_KEY, JSON.stringify({}));
    }
    if (!localStorage.getItem(WEEK_KEY)) {
      localStorage.setItem(WEEK_KEY, '1');
    }
  },

  // ── Completed Lab IDs ──────────────────────────────────
  _getCompleted() {
    try {
      return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]'));
    } catch {
      return new Set();
    }
  },

  _saveCompleted(set) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(set)));
  },

  isCompleted(labId) {
    return this._getCompleted().has(labId);
  },

  complete(labId) {
    const set = this._getCompleted();
    set.add(labId);
    this._saveCompleted(set);
    this._updateSidebarProgress();
    this._dispatchEvent('lab:completed', { labId });
  },

  uncomplete(labId) {
    const set = this._getCompleted();
    set.delete(labId);
    this._saveCompleted(set);
    this._updateSidebarProgress();
    this._dispatchEvent('lab:uncompleted', { labId });
  },

  toggle(labId) {
    if (this.isCompleted(labId)) {
      this.uncomplete(labId);
      return false;
    } else {
      this.complete(labId);
      return true;
    }
  },

  // ── Stats ──────────────────────────────────────────────
  getStats() {
    const completed = this._getCompleted();
    const total = LABS.length;
    const done = completed.size;

    // Per technology stats
    const techStats = {};
    LABS.forEach(lab => {
      lab.technology.forEach(tech => {
        if (!techStats[tech]) techStats[tech] = { total: 0, done: 0 };
        techStats[tech].total++;
        if (completed.has(lab.id)) techStats[tech].done++;
      });
    });

    // Per week stats
    const weekStats = {};
    for (let w = 1; w <= 10; w++) {
      const weekLabs = LABS.filter(l => l.week === w);
      const weekDone = weekLabs.filter(l => completed.has(l.id)).length;
      weekStats[w] = { total: weekLabs.length, done: weekDone };
    }

    // Total hours
    const totalHours  = Math.round(LABS.reduce((acc, l) => acc + l.durationMin, 0) / 60);
    const doneHours   = Math.round(
      LABS.filter(l => completed.has(l.id)).reduce((acc, l) => acc + l.durationMin, 0) / 60
    );

    return {
      total,
      done,
      remaining: total - done,
      percentage: total > 0 ? Math.round((done / total) * 100) : 0,
      techStats,
      weekStats,
      totalHours,
      doneHours,
    };
  },

  // ── Current Week ───────────────────────────────────────
  getCurrentWeek() {
    return parseInt(localStorage.getItem(WEEK_KEY) || '1', 10);
  },

  setCurrentWeek(week) {
    localStorage.setItem(WEEK_KEY, String(week));
  },

  // ── Notes per Lab ──────────────────────────────────────
  _getNotes() {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    } catch {
      return {};
    }
  },

  getNote(labId) {
    return this._getNotes()[labId] || '';
  },

  saveNote(labId, text) {
    const notes = this._getNotes();
    notes[labId] = text;
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  // ── Sidebar Progress Bar Update ────────────────────────
  _updateSidebarProgress() {
    const stats = this.getStats();
    const fill = document.querySelector('.sidebar-progress-fill');
    const pct  = document.querySelector('.sidebar-progress-pct');
    const done = document.querySelector('.sidebar-done-count');
    const total = document.querySelector('.sidebar-total-count');

    if (fill)  fill.style.width = `${stats.percentage}%`;
    if (pct)   pct.textContent  = `${stats.percentage}%`;
    if (done)  done.textContent = stats.done;
    if (total) total.textContent = stats.total;
  },

  // ── Reset All Progress ─────────────────────────────────
  reset() {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(NOTES_KEY);
    localStorage.setItem(WEEK_KEY, '1');
    this.init();
    this._updateSidebarProgress();
    this._dispatchEvent('progress:reset', {});
  },

  // ── Export Progress as JSON ────────────────────────────
  export() {
    return JSON.stringify({
      completed: Array.from(this._getCompleted()),
      notes: this._getNotes(),
      currentWeek: this.getCurrentWeek(),
      exportedAt: new Date().toISOString(),
    }, null, 2);
  },

  // ── Import Progress from JSON ──────────────────────────
  import(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.completed) {
        this._saveCompleted(new Set(data.completed));
      }
      if (data.notes) {
        localStorage.setItem(NOTES_KEY, JSON.stringify(data.notes));
      }
      if (data.currentWeek) {
        this.setCurrentWeek(data.currentWeek);
      }
      this._updateSidebarProgress();
      return true;
    } catch {
      return false;
    }
  },

  // ── Custom Events ──────────────────────────────────────
  _dispatchEvent(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }
};

export { Progress };
