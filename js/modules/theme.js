/**
 * theme.js — Dark/Light Mode Toggle
 * DevOps Atlas Learning Portal
 */

const THEME_KEY = 'devops-atlas-theme';

const Theme = {
  _current: 'dark',

  init() {
    const saved = localStorage.getItem(THEME_KEY);
    this._current = saved || 'dark';
    this._apply(this._current);
  },

  toggle() {
    this._current = this._current === 'dark' ? 'light' : 'dark';
    this._apply(this._current);
    localStorage.setItem(THEME_KEY, this._current);
    return this._current;
  },

  get() {
    return this._current;
  },

  isDark() {
    return this._current === 'dark';
  },

  _apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Update theme toggle button icon
    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }
};

export { Theme };
